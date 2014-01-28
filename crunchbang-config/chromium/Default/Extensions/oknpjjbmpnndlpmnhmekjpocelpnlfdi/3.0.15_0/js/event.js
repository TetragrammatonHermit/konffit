/*global rdb, $, chrome*/
/*jslint browser:true*/
(function () {
    "use strict";

    function getCSRFToken(callback) {
        // Retrieve the csrf token from the user's cookies.
        chrome.cookies.get({
            url: rdb.siteRoot,
            name: 'csrftoken'
        }, function (cookie) {
            callback(cookie ? cookie.value : undefined);
        });
    }

    window.getUser = function (callback) {
        rdb.getAuthedUser(function (user) {
            if (!user.error) {
                // Only going to store the username, because that's all we need
                // at the moment and I'm a bit concerned about storing things
                // like email address in localstorage
                localStorage['rdb.user'] = user.username;
            }

            if ($.isFunction(callback)) {
                callback(user);
            }
        });
    };

    // This will be called before each request to the API
    function csrfProtect(options) {
        function patchAjaxSend(csrftoken) {
            if (typeof csrftoken === 'undefined' && options.retry) {
                // If we don't have a csrf token, make a get request to
                // Readability to a page that will set the csrf token via
                // middleware. Then try again, or fail.
                if (options.retry) {
                    options.retry = false;
                    $.get(rdb.siteRoot + "/account/").success(function (event) {
                        return csrfProtect(options);
                    }).error(function (event) {
                        options.callback(true);
                    });
                } else {
                    // If we've already retried, or dont want to retry, fail
                    options.callback(true);
                }
            } else {
                // If we get a cookie or dont want to retry, just go ahead and
                // sign the request.
                $(document).ajaxSend(function (event, xhr, settings) {
                    function safeMethod(method) {
                        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
                    }

                    if (!safeMethod(settings.type)) {
                        xhr.setRequestHeader('X-CSRFToken', csrftoken);
                    }
                });
                options.callback();
            }
        }

        getCSRFToken(patchAjaxSend);
    }

    var setCustomRequestHeaders = function () {
        var userAgent = 'ReadabilityChrome/' + chrome.runtime.getManifest().version;

        var requestFilter = {
            urls: [rdb.apiRoot + '/*', rdb.secureApiRoot + '/*'],
            types: ['xmlhttprequest']
        };

        chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
            var headers = details.requestHeaders,
                blockingResponse = {};

            for (var i = 0; i < headers.length; i += 1) {
                if (headers[i].name == 'User-Agent') {

                    headers[i].value = userAgent + ' ' + headers[i].value;
                    break;
                }
            }

            blockingResponse.requestHeaders = headers;
            return blockingResponse;

        }, requestFilter, ['requestHeaders', 'blocking']);
    }();

    window.getKindleUserDetailsCookie = function (callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        chrome.cookies.get({
            url: rdb.siteRoot,
            name: 'kindleUserDetails'
        }, function (cookie) {
            if (cookie) {
                callback(JSON.parse(decodeURIComponent(cookie.value)));
            }
            else {
                callback(null);
            }
        });
    };

    var applyBaseSettings = function () {
        var baseSettings = {
            "blacklist": [
                "^https?:\/\/localhost",
                "^https?:\/\/127.0.0.1",
                "^https?:\/\/mail.google.com"
            ],
            "always_post_domains": [
                "^https?:\/\/(.*\\.)?nytimes.com",
                "^https?:\/\/(.*\\.)?nybooks.com"
            ]
        };

        var getHoursFromNow = function (hrs) {
            var now = new Date().getTime();
            return now += (hrs * 60 * 60) * 1000;
        };

        localStorage['rdb.settings'] = JSON.stringify(baseSettings);
        localStorage['rdb.settings.expire'] = getHoursFromNow(24);
    };

    var checkSettingsBeforeRequest = function (requestedUrl, callback) {
        var settingsCheckData = {};

        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        var cacheHasExpired = function () {
            var now = new Date().getTime(),
                expiration = localStorage['rdb.settings.expire'] || 0;

            return now > expiration;
        };

        // Yep, I repeated this function from applyBaseSettings. I don't like it
        // but I really don't care either.
        var getHoursFromNow = function (hrs) {
            var now = new Date().getTime();
            return now += (hrs * 60 * 60) * 1000;
        };

        var requestSettings = function () {
            var settingsUrl = 'https://s3.amazonaws.com/readability-options/options.json';

            if (localStorage['rdbSettingsUrl']) {
                settingsUrl = localStorage['rdbSettingsUrl'];
            }

            $.ajax({
                type: 'GET',
                url: settingsUrl,
                success: function (res) {
                    localStorage['rdb.settings'] = JSON.stringify(res);
                    localStorage['rdb.settings.expire'] = getHoursFromNow(24);
                },
                error: function (jqxhr) {
                    applyBaseSettings();
                }
            });
        };

        var doChecks = function () {
            var settings;

            try {
                // If for some reason the settings get hosed, we still want to
                // complete the RDB request.
                settings = JSON.parse(localStorage['rdb.settings']);
            }
            catch (e) {
                callback(settingsCheckData);
            }

            // Should loop over everything in the settings JSON to determine
            // if the domain given matches anything in there. If so add that
            // key to the settingsCheckData
            for (var key in settings) {
                var exp = new RegExp(settings[key].join('|'));

                if (exp.test(requestedUrl)) {
                    settingsCheckData[key] = true;
                }
            }

            callback(settingsCheckData);

            // We always want the checks to run and unblock, before making a
            // request to get new settings.
            if (cacheHasExpired()) {
                requestSettings();
            }
        };

        doChecks();
    };

    // There are times that we need to get in the way of an action to prompt the
    // user for input. When we do that we need a way to resume the action if the
    // user asks us to. The question/answer can happen in the content script so
    // we need a way to hold onto the action here to we can get a general message
    // to resume any paused action.
    var pausedAction = null;
    var resumeAction = function () {
        if (pausedAction) {
            takeAction(pausedAction);
            pausedAction = null;
        }
    };

    // On the window scope so we can use it outside of this script.
    // Parameters:
    // - data (object)
    //   - action string: The action to take.
    //   - origin string: Gives some info on where the action is being taken from
    //                    'contextMenu', 'shortcut', 'popup'
    //   - url string: The url of the page to take action on. If not provided
    //                 the current URL will be used.
    //   - callback: Gonna go down after the request is made.
    window.takeAction = function (data) {
        var urlToParse = data.url || null,
            selectedTab = null;

        if (!$.isFunction(data.callback)) {
            data.callback = $.noop;
        }

        var urlIsRoot = function (url) {
            var isRoot = false,
                parser = document.createElement('a');

            parser.href = url;

            var path = parser.pathname;

            if (path === '/' || path === '') {
                // Allow urls with query strings
                if (!parser.search) {
                    isRoot = true;
                }
            }

            return isRoot;
        };

        var handledUnauthedRequest = function (actionData, tabId) {
            pausedAction = $.extend({url: urlToParse}, data);

            // Clear the cached user object
            localStorage.removeItem('rdb.user');

            actionData.callback({
                error: true,
                unauthenticated: true
            });

            chrome.tabs.sendMessage(tabId, {
                'action': 'promptForAuth',
                'rdbAction': null,
                'actionOrigin': actionData.origin
            });
        };

        // This is the meat of how actions are taken. We've abstracted it to this
        // function so we can easily pause and resume the action
        var takeAction = function () {
            var action = data.action,

                // We'll use this to determine if we want to read in a new tab
                // or new window. Default is the current tab.
                readNowLocation = 'current';

            var makeReadabilityRequest = function (requestOpts) {
                var rdbRequestComplete = function (res) {

                    var completeAction = function () {
                        res.actionOrigin = data.origin;
                        res.siteRoot = rdb.siteRoot;
                        res.apiRoot = rdb.apiRoot;

                        if (readNowLocation === 'current') {
                            if (res.action === 'error') {
                                pausedAction = $.extend({
                                    url: urlToParse,
                                    callback: data.callback
                                }, data);

                                // 'timeout' isn't a status code, but it's a bit
                                // easier to pass it to the indicator like this.
                                if (res.timeout) {
                                    res.statusCode = 'timeout';
                                }
                            }

                            chrome.tabs.sendMessage(selectedTab.id, res);
                        }
                        else {
                            var rdbUrl = rdb.siteRoot + '/articles/' + res.id;

                            // Handling of new window is real ugly right now.
                            if (readNowLocation === 'window') {
                                var checkInterval = null;

                                // You can't just update the new window's url.
                                // So we get the first, and only, tab of the new
                                // window and update its URL.
                                var updateNewWindow = function () {
                                    chrome.tabs.query({
                                        windowId: newWindowId,
                                        index: 0
                                    }, function (tabs) {
                                        chrome.tabs.update(tabs[0].id, {
                                            url: rdbUrl
                                        });
                                    });
                                };

                                var checkForNewWindowId = function () {
                                    clearInterval(checkInterval);

                                    if (newWindowId) {
                                        updateNewWindow();
                                    }
                                    else {
                                        checkInterval = setTimeout(function () {
                                            checkForNewWindowId();
                                        }, 100);
                                    }
                                };

                                if (newWindowId) {
                                    updateNewWindow();
                                }
                                else {
                                    checkForNewWindowId();
                                }

                            }
                            else {
                                if (res.error) {
                                    chrome.tabs.sendMessage(newTabId, res);
                                }
                                else {
                                    chrome.tabs.update(newTabId, {
                                        url: rdbUrl
                                    });
                                }
                            }
                        }

                        data.callback(res);
                    };

                    if (res.error) {
                        if (res.statusCode == 401) {
                            handledUnauthedRequest(data, selectedTab.id);
                            return null;
                        }

                        res.action = 'error';
                    }
                    else {
                        res.action = action;

                        // Read Later is our only action that requires auth.
                        // If we completed that successfully we want to grab
                        // the user's info and cache it.
                        if (action === 'readLater') {
                            if (!localStorage['rdb.user']) {
                                getUser();
                            }
                        }
                    }

                    completeAction();
                };

                var protectAndRequest = function () {
                    csrfProtect({
                        retry: true,
                        callback: function (error) {
                            if (error) {
                                rdbRequestComplete({error: true});
                            }
                            else {
                                rdb[action](urlToParse, rdbRequestComplete, requestOpts);
                            }
                        }
                    });
                };

                if (requestOpts.blacklist) {
                    rdbRequestComplete({
                        error: true,
                        // this is a bit of a hack. I'm not sure that being
                        // blacklisted means there should or would be a 403,
                        // but it's easier to pass this to the indicator to
                        // display a custom message
                        statusCode: 'blacklisted'
                    });
                }
                else {
                    if (requestOpts.always_post_domains) {
                        chrome.tabs.sendMessage(selectedTab.id, {
                            contentNeeded: true,
                            urlToParse: urlToParse
                        }, function (response) {
                            // If we've requested a url for a page other than
                            // the one we're on we'll need to make a request
                            // to that page to retreive the content.
                            if (response.error) {
                                $.ajax({
                                    url: urlToParse,
                                    type: 'GET',
                                    success: function (requestedHtml) {
                                        requestOpts.doc = requestedHtml;
                                        protectAndRequest();
                                    },
                                    error: function (jqxhr) {
                                        // If we get an error here we just want
                                        // to continue the rdb request because
                                        // there's a good chance we'll be OK.
                                        requestOpts.doc = null;
                                        protectAndRequest();
                                    }
                                });
                            }
                            else {
                                requestOpts.doc = response.doc;
                                protectAndRequest();
                            }
                        });
                    }
                    else {
                        protectAndRequest();
                    }
                }
            };

            // We use the '-' to denote an action that has something more;
            // Could be to open in a new tab or window, or that it's a link.
            if (action.toLowerCase().match('-')) {
                var actionParts = action.split('-'),
                    newTabId = null,
                    newWindowId = null;

                action = actionParts[0];

                if (actionParts[1].toLowerCase().match('new')) {
                    readNowLocation = actionParts[1].toLowerCase().split('new')[1];
                }
            }

            // Show the working indicator has soon as possible
            if (readNowLocation === 'current') {
                chrome.tabs.sendMessage(selectedTab.id, {
                    'action': 'showWorkingIndicator',
                    'rdbAction': action
                });
            }
            else {
                if (readNowLocation === 'window') {
                    chrome.windows.create({
                        focused: true,
                        url: urlToParse,
                        type: 'normal'
                    }, function (newWindow) {
                        newWindowId = newWindow.id;
                    });
                }
                else {
                    chrome.tabs.create({
                        index: selectedTab.index + 1,
                        active: false,
                        url: urlToParse
                    }, function (newTab) {
                        var msgSent = false,
                            exp = new RegExp(rdb.siteRoot + '|' + rdb.secureSiteRoot);

                        newTabId = newTab.id;

                        // We want to display the rdb indicator in the new tab
                        // as soon as that page has finished loading if the page
                        // is still on the original URL, not the rdb url
                        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                            if (tabId === newTabId && changeInfo.status === 'complete') {

                                // Is the tab already updated with the
                                // Readability url?
                                if (!exp.test(tab.url)) {
                                    // I'm not sure why, but this condition happens
                                    // multiple times, causing some weirdness with
                                    // the indicator displaying in the content script.
                                    // To get around it set msgSent to make sure it
                                    // only gets sent once.
                                    if (!msgSent) {
                                        msgSent = true;

                                        chrome.tabs.sendMessage(newTabId, {
                                            'action': 'showWorkingIndicator',
                                            'rdbAction': action
                                        });
                                    }
                                }
                            }
                        });
                    });
                }
            }

            checkSettingsBeforeRequest(urlToParse, makeReadabilityRequest);
        };

        // If we pause then resume an action we end up doing this twice.
        // TODO: Hold on to the selected tab info so we only need to do this once.
        var prepareForAction = function () {
            chrome.tabs.getSelected(null, function (tab) {
                selectedTab = tab;

                if (urlToParse === null) {
                    urlToParse = tab.url;
                }

                if (!data.bypassRootUrlCheck) {
                    // As soon as we have info about the selected tab and url we want
                    // to check the url to make sure it isn't a home page
                    if (urlIsRoot(urlToParse)) {
                        pausedAction = $.extend({
                            url: urlToParse,
                            callback: data.callback,
                            bypassRootUrlCheck: true
                        }, data);

                        chrome.tabs.sendMessage(tab.id, {
                            'action': 'showWorkingIndicator',
                            'rdbAction': 'rootUrlWarning'
                        });
                    }
                    else {
                        takeAction();
                    }
                }
                else {
                    takeAction();
                }
            });
        };

        if (data.action.match('sendToKindle')) {
            getKindleUserDetailsCookie(function (cookie) {
                var kindleUsername = null;

                if (cookie) {
                    kindleUsername = cookie.username || null;
                }

                if (kindleUsername === null) {
                    chrome.tabs.getSelected(null, function (tab) {
                        chrome.tabs.sendMessage(tab.id, {
                            action: 'sendToKindlePrompt',
                            actionOrigin: data.origin
                        });
                    });
                }
                else {
                    prepareForAction();
                }
            });
        }
        else {
            prepareForAction();
        }
    };

    window.tagBookmark = function (settings) {
        rdb.tagBookmark(settings.bookmarkId, settings.tags, function (res) {

            if ($.isFunction(settings.complete)) {
                settings.complete(res);
            }
            else {
                chrome.tabs.getSelected(null, function (tab) {
                    chrome.tabs.sendMessage(tab.id, {
                        addedTags: res
                    });
                });
            }
        });
    };

    window.login = function (settings) {
        rdb.login(settings.data, function (res) {
            if (!res.error) {
                localStorage['rdb.hasLoggedIn'] = 1;
                localStorage['rdb.user'] = res.username;
                resumeAction();
            }

            if ($.isFunction(settings.complete)) {
                settings.complete(res);
            }
            else {
                chrome.tabs.getSelected(null, function (tab) {
                    chrome.tabs.sendMessage(tab.id, {
                        login: res
                    });
                });
            }
        });
    };

    window.logout = function (callback) {
        rdb.logout(callback);
        localStorage.removeItem('rdb.user');
    };

    window.removeTagFromBookmark = function (settings) {
        rdb.removeTagFromBookmark(settings.bookmarkId, settings.tagId, function (res) {

            if ($.isFunction(settings.success)) {
                settings.success(settings.tagId);
            }
            else {
                chrome.tabs.getSelected(null, function (tab) {
                    chrome.tabs.sendMessage(tab.id, {
                        tagRemoved: settings.tagId
                    });
                });
            }
        });
    };

    // We use this from the options page when we just want to update the addr
    window.setKindleAddr = function (settings) {
        settings.suppressSend = true;
        window.setAndSendKindle(settings);
    };

    window.setAndSendKindle = function (settings) {

        // Get that indicator out there ASAP
        if (!settings.suppressSend) {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.tabs.sendMessage(tab.id, {
                    'action': 'showWorkingIndicator',
                    'rdbAction': 'sendToKindle'
                });
            });
        }

        var sendComplete = function (res) {
            if ($.isFunction(settings.complete)) {
                settings.complete(res);
            }
            else {
                chrome.tabs.getSelected(null, function (tab) {
                    chrome.tabs.sendMessage(tab.id, {
                        setAndSendKindle: res
                    });
                });
            }

            chrome.tabs.getSelected(null, function (tab) {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'sendToKindle'
                });
            });
        };

        var setAddressComplete = function (res) {
            if (!res.error) {
                if (!settings.suppressSend) {
                    chrome.tabs.getSelected(null, function (tab) {
                        csrfProtect({
                            retry: true,
                            callback: function (error) {
                                if (error) {
                                    sendComplete({error: true});
                                }
                                else {
                                    // Once the Kindle address is set we can finally send the article
                                    rdb.sendToKindle(tab.url, function (sendToKindleRes) {
                                        sendComplete(sendToKindleRes);
                                    });
                                }
                            }
                        });
                    });
                }
                else {
                    sendComplete(res);
                }
            }
            else {
                if (res.statusCode === 401) {
                    localStorage.removeItem('rdb.user');
                    setAnonCookie();
                }
                else {
                    sendComplete(res);
                }
            }
        };

        // The user's Kindle email is set in a cookie
        // "kindleUserDetails" on www.readability.com (or set dev domain)
        var setAnonCookie = function () {
            var addrParts = null,
                cookieVal = null,
                getExpirationDate = function () {
                    var now = new Date().getTime();

                    now += 3600 * 1000 * 24 * 365 * 10;
                    return Math.floor(now / 1000);
                };

            // We allow the email address to be set to null
            if (settings.data.kindle_email_address !== null) {
                addrParts = settings.data.kindle_email_address.split('@');
                cookieVal = {
                    'username': addrParts[0],
                    'domain': addrParts[1]
                };
            }

            chrome.cookies.set({
                url: rdb.siteRoot,
                name: 'kindleUserDetails',
                value: encodeURIComponent(JSON.stringify(cookieVal)),
                expirationDate: getExpirationDate()
            }, function (cookie) {
                var res = {};

                if (!cookie) {
                    res.error = true;
                    res.kindleUserDetails = JSON.parse(decodeURIComponent(cookie.value));
                }

                setAddressComplete(res);
            });
        };

        if (!localStorage['rdb.user']) {
            setAnonCookie();
        }
        else {
            csrfProtect({
                retry: false,
                callback: function (error) {
                    // TODO: Handle the error state
                    rdb.updateAuthedUser(settings.data, setAddressComplete);
                }
            });
        }
    };

    // This function is used both here and from options
    // that's why we place it on the window scope
    window.setBrowserActionIcon = function (iconColor) {
        var current = chrome.runtime.getManifest().browser_action.default_icon,
            icons = {
                'red': function () {
                    var iconObj = {};

                    for (var key in current) {
                        iconObj[key] = current[key].replace('-grey', '');
                    }

                    return iconObj;
                },
                'grey': function () {
                    var iconObj = {};

                    for (var key in current) {
                        var parts = current[key].split('.');
                        iconObj[key] = parts[0] + '-grey.' + parts[1];
                    }

                    return iconObj;
                }
            };

        chrome.browserAction.setIcon({
            path: icons[iconColor]()
        });
    };

    window.closeIframe = function () {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendMessage(tab.id, {
                'action': 'closeIframe'
            });
        });
    };

    window.shortcuts = function () {
        var exports = {};

        exports.store = {};

        exports.get = function (key) {
            return exports.store[key] || null;
        };

        exports.refresh = function () {
            exports.store = {};

            for (var item in localStorage) {
                if (item.indexOf('rdb.shortcut') > -1) {
                    exports.store[localStorage[item]] = item;
                }
            }
        };

        return exports;
    }();

    shortcuts.refresh();

    // Use this from the background page console to clear things out for a fresh
    // start or when you change environments
    window.tearDown = function () {
        localStorage['rdb.hasLoggedIn'] = 0;
        localStorage.removeItem('rdb.tags');
        localStorage.removeItem('rdb.tags.expire');
        localStorage.removeItem('rdbSiteRoot');
        localStorage.removeItem('rdbRequestTimeout');
        localStorage.removeItem('rdbSettingsUrl');
        localStorage.removeItem('SSLDisabled');
        localStorage.removeItem('rdb.user');
    };

    var onInstalled = function (details) {
        var setOptions = function () {
            var
                // In previous versions of the extension the keys
                // were named a bit inconsistent.
                legacyKeys = {
                    'rdb.shortcut.sendToKindle': 'kindle_shortcut',
                    'rdb.shortcut.readLater':'read_later_shortcut',
                    'rdb.shortcut.readNow':'read_now_shortcut'
                },

                defaults = {
                    'rdb.shortcut.readNow': '192',
                    'rdb.shortcut.readLater': '16_192',
                    'rdb.shortcut.sendToKindle': '16_17_75',
                    'rdb.promptTags': 1,
                    'rdb.icon': 'red',
                    'rdb.hasLoggedIn': 0
                };

            for (var k in defaults) {
                var currentVal = localStorage[k] || null,
                    legacyVal = localStorage[legacyKeys[k]] || null;

                if (currentVal === null) {
                    if (legacyVal && legacyVal !== defaults[k]) {
                        localStorage[k] = legacyVal;
                    }
                    else {
                        localStorage[k] = defaults[k];
                    }
                }
                else {
                    // Special consideration for the icon. If the icon is set
                    // and is something other than the default, we'll assume
                    // it's the non-default icon option.
                    if (k === 'rdb.icon') {
                        if (localStorage[k] !== defaults[k]) {
                            setBrowserActionIcon('grey');
                        }
                    }
                }

                // Clean out old items
                if (legacyKeys[k]) {
                    localStorage.removeItem(legacyKeys[k]);
                }
            }

            localStorage.removeItem('rdb.first_run_complete');
            localStorage['rdb.version'] = chrome.runtime.getManifest().version;
            applyBaseSettings();

            shortcuts.refresh();
        };

        if (details.reason === 'install' || details.reason === 'update') {
            setOptions();
        }
    };

    // This is probably bad. Was seeing errors because these were being created
    // each time the event page was reactivated. I'm thinking this should maybe
    // just be a persistent bg page?
    try {
        var contextMenuClickHandler = function (info, tab) {
            var action = info.menuItemId,
                url = info.pageUrl;

            if (action === 'goToReadingList') {
                chrome.tabs.update({url: rdb.siteRoot + '/reading-list'});
                return;
            }

            // Context menu from a link
            if (info.linkUrl) {
                url = info.linkUrl;
            }

            takeAction({
                'action': action,
                'origin': 'contextMenu',
                'url': url
            });
        };

        var pageContexts = [
            'page',
            'image',
            'video',
            'audio'
        ];

        var linkContexts = [
            'link'
        ];

        // Clear all of them so we don't cause errors if they already exist
        chrome.contextMenus.removeAll();

        chrome.contextMenus.create({
            'id': 'readNow',
            'title': 'Read Page Now',
            'contexts': pageContexts
        });

        chrome.contextMenus.create({
            'id': 'readNow-newTab',
            'title': 'Read Page Now in New Tab',
            'contexts': pageContexts
        });

        chrome.contextMenus.create({
            'id': 'readNow-newWindow',
            'title': 'Read Page Now in New Window',
            'contexts': pageContexts
        });

        chrome.contextMenus.create({
            'id': 'nowLaterSeparator',
            'type': 'separator',
            'contexts': pageContexts
        });

        chrome.contextMenus.create({
            'id': 'readLater',
            'title': 'Read Page Later',
            'contexts': pageContexts
        });

        chrome.contextMenus.create({
            'id': 'sendToKindle',
            'title': 'Send Page to Kindle',
            'contexts': pageContexts
        });

        chrome.contextMenus.create({
            'id': 'readNow-link',
            'title': 'Read Link Now',
            'contexts': linkContexts
        });

        chrome.contextMenus.create({
            'id': 'readNow-linkNewTab',
            'title': 'Read Link Now in New Tab',
            'contexts': linkContexts
        });

        chrome.contextMenus.create({
            'id': 'readNow-linkNewWindow',
            'title': 'Read Link Now in New Window',
            'contexts': linkContexts
        });

        chrome.contextMenus.create({
            'id': 'nowLaterLinkSeparator',
            'type': 'separator',
            'contexts': linkContexts
        });

        chrome.contextMenus.create({
            'id': 'readLater-link',
            'title': 'Read Link Later',
            'contexts': linkContexts
        });

        chrome.contextMenus.create({
            'id': 'sendToKindle-link',
            'title': 'Send Link to Kindle',
            'contexts': linkContexts
        });

        chrome.contextMenus.create({
            'id': 'listSeparator',
            'type': 'separator',
            'contexts': pageContexts
        });

        chrome.contextMenus.create({
            'id': 'goToReadingList',
            'title': 'Go to your Reading List',
            'contexts': pageContexts
        });

        chrome.contextMenus.onClicked.addListener(contextMenuClickHandler);
    }
    catch (e) {}

    // The content script will send messages here.
    chrome.extension.onMessage.addListener(function (req, sender, sendResponse) {
        if (req.contentScriptInit) {
            // We want the content script to know if we're on a readability.com page
            sendResponse(req.currentPageLoc.origin == rdb.siteRoot);
        }

        if (req.shortcut) {
            var command = shortcuts.get(req.shortcut);

            if (command !== null) {
                var action = command.replace('rdb.shortcut.', '');

                // Send word back to the content script to lock da keys
                sendResponse({shortcutLock: true});

                takeAction({
                    'action': action,
                    'origin': 'shortcut'
                });
            }
        }

        if (req.promptTagsCheck) {
            sendResponse({promptTags: localStorage['rdb.promptTags']});
        }

        // TODO: Maybe find a consistent way to handle these so we don't have
        // to repeat the same condition every time.
        // These seem like the default action, we can check for the two above.

        if (req.tagBookmark) {
            tagBookmark(req);
        }

        if (req.removeTag) {
            removeTagFromBookmark(req);
        }

        if (req.resumeAction) {
            resumeAction();
        }

        if (req.login) {
            login(req);
        }

        if (req.setAndSendKindle) {
            setAndSendKindle(req);
        }
    });

    // Each time the extension is installed or updated we should check for options
    // set in local storage
    chrome.runtime.onInstalled.addListener(onInstalled);
}());
