// This script is injected into every page that the user loads.
// We're not using jquery or any other third party JS to keep this as small
// and fast as possible.
(function () {
    var extensionUrl = chrome.extension.getURL('');

    var shortcuts = function () {
        var exports = {},
            shortcutLock = false,
            shortcutLockTimeout;

        exports.unlock = function () {
            shortcutLock = false;
        };

        exports.init = function () {
            // TODO: Gonna want to clean some of this up.
            window.onfocus = function () {
                // Lock the shortcuts from triggering when the window has just been
                // entered. This is to prevent erroneous keyboard shortcut triggers
                // when tabbing between windows and tabs.
                clearTimeout(shortcutLockTimeout);
                shortcutLock = true;
                shortcutLockTimeout = setTimeout(function () {
                    shortcutLock = false;
                }, 800);
            };

            keanu.listen(function (shortcut) {
                if (!shortcutLock) {
                    chrome.extension.sendMessage({shortcut: shortcut}, function (res) {
                        if (res.shortcutLock) {
                            shortcutLock = true;
                        }
                    });
                }
            });
        };

        return exports;
    }();

    // In Chrome versions less than 25 iframe.contentWindow is undefined.
    // We use contentWindow to preserve the history, see:
    // https://github.com/arc90/readability-addons/issues/54
    var updateIframeUrl = function (iframe, url) {
        if (iframe.contentWindow) {
            iframe.contentWindow.location.replace(url);
        }
        else {
            iframe.setAttribute('src',  url);
        }
    };

    var rdbIndicator = function () {
        var exports = {},
            urlBase = extensionUrl + 'indicator.html',
            el = null;

        exports.init = function () {
            el = document.createElement('iframe');
            el.setAttribute('id', 'rdbIndicator');
            el.setAttribute('width', '100%');
            el.setAttribute('height', '270');
            el.setAttribute('border', '0');
            el.setAttribute('src', urlBase);
            el.setAttribute('style', 'display: none; border: 0; position: fixed; left: 0; top: 0; z-index: 2147483647');
            document.getElementsByTagName('body')[0].appendChild(el);
        };

        exports.show = function (rdbAction) {
            el.style.display = 'block';
            exports.navigate(rdbAction);
        };

        exports.hide = function () {
            el.style.display = 'none';
            updateIframeUrl(el, urlBase);

            setTimeout(function () {
                shortcuts.unlock();
            }, 100);
        };

        exports.navigate = function (hash) {
            updateIframeUrl(el, urlBase + '#' + hash);
        };

        exports.ready = function () {
            el.style.display = 'block';
            exports.navigate('ready');
        };

        return exports;
    }();

    // If a user takes an action using shortcut keys or the context menu we'll
    // sometimes need the popup content displayed. There is no way to
    // programmatically open the popup. So we'll inject it into the page in an iframe
    var iframedPopup = function () {
        var exports = {},
            urlBase = extensionUrl + 'popup.html',
            el = null;

        exports.inject = function (hash) {
            var h = hash || '';

            if (el === null) {
                el = document.createElement('iframe');
                el.setAttribute('width', '285');
                el.setAttribute('height', '350');
                el.setAttribute('border', '0');
                el.setAttribute('src', urlBase + h);
                el.setAttribute('style', 'overflow: hidden; border: 0; position: fixed; right: 2px; top: 8px; z-index: 2147483646');
                document.getElementsByTagName('body')[0].appendChild(el);

                // This can happen if the user removes focus from the iframe
                window.onkeyup = function (e) {
                    if (e.keyCode == 27) {
                        exports.remove();
                    }
                };
            }
            else {
                exports.updateSrc(h);
            }
        };

        exports.remove = function () {
            if (el) {
                document.getElementsByTagName('body')[0].removeChild(el);
                el = null;
            }
        };

        exports.updateSrc = function (hash) {
            updateIframeUrl(el, urlBase + hash);
        };

        exports.setAttr = function (attr, val) {
            el.setAttribute(attr, val);
        };

        return exports;
    }();

    var tagging = function () {
        var exports = {};

        exports.init = function (bookmark) {
            var hash = '#tagging?bookmark=' + bookmark;
            iframedPopup.inject(hash);
        };

        exports.complete = function (res) {
            var hash = '#tagging?addTagsRes=' + res;
            iframedPopup.updateSrc(hash);
        };

        exports.tagRemovedSuccess = function (tagId) {
            var hash = '#tagging?tagRemoved=' + tagId;
            iframedPopup.updateSrc(hash);
        };

        return exports;
    }();

    var kindle = function () {
        var exports = {};

        exports.init = function () {
            iframedPopup.inject('#sendToKindle');
            iframedPopup.setAttr('width', '375');
        };

        exports.complete = function (res) {
            var hash = '#kindle?kindleRes=' + res;
            iframedPopup.updateSrc(hash);
        };

        return exports;
    }();

    var auth = function () {
        var exports = {};

        exports.init = function () {
            iframedPopup.inject('#auth');
            iframedPopup.setAttr('width', '345');
            iframedPopup.setAttr('height', '480');
        };

        return exports;
    }();

    var login = function () {
        var exports = {};

        exports.complete = function (res) {
            var hash = '#login?loginRes=' + res;
            iframedPopup.updateSrc(hash);
        };

        return exports;
    }();

    // postMessage(s) that will be sent from chrome:// iframes
    var onPostMessage = function (e) {
        if (e.origin + '/' !== extensionUrl) {
            return;
        }

        // TODO: Find a consistent way to handle these scenarios so we don't
        // have to check the data every time.

        if (e.data === 'ready') {
            rdbIndicator.hide();
        }

        if (e.data === 'remove') {
            iframedPopup.remove();
        }

        if (e.data === 'resumeAction') {
            chrome.extension.sendMessage({resumeAction: true});
        }

        if (e.data.match('tagBookmark|removeTag|login|setAndSendKindle')) {
            chrome.extension.sendMessage(JSON.parse(e.data));
        }
    };

    // Any actions that the browser is going to need to take.
    // These actions will be taken on chrome.extension.onMessage
    var actions = {
        showWorkingIndicator: function (msg) {
            rdbIndicator.show(msg.rdbAction);
        },

        readNow: function (msg) {
            rdbIndicator.navigate('ready');
            window.location.href = msg.siteRoot + '/articles/' + msg.id;
        },

        readLater: function (msg) {
            rdbIndicator.navigate('ready');

            // We need to check the user's preference if they want the tagging
            // interface displayed
            if (msg.actionOrigin !== 'popup') {
                chrome.extension.sendMessage({promptTagsCheck: true}, function (res) {
                    if (parseInt(res.promptTags, 10)) {
                        // Just a brief pause to make sure we don't trip ourself up
                        // with closing the iframedPopup from other views.
                        setTimeout(function () {
                            tagging.init(JSON.stringify(msg));
                        }, 200);
                    }
                });
            }
        },

        sendToKindle: function (msg) {
            rdbIndicator.navigate('ready');
        },

        // If the user doesn't have a Kindle set up
        sendToKindlePrompt: function (msg) {
            // Just to smooth out transitions
            setTimeout(function () {
                rdbIndicator.hide();
            }, 300);

            if (msg.actionOrigin !== 'popup') {
                kindle.init();
            }
        },

        // If the user attempts to take an action that requires authentication.
        promptForAuth: function (msg) {
            rdbIndicator.hide();

            if (msg.actionOrigin !== 'popup') {
                auth.init();
            }
        },

        closeIframe: function (msg) {
            iframedPopup.remove();
        },

        error: function (msg) {
            var data = {
                statusCode: msg.statusCode
            };

            rdbIndicator.navigate('error?data=' + JSON.stringify(data));
        }
    };

    var completeOnMessage = function (action, res, hashBust) {
        if (hashBust) {
            res.hashBuster = new Date().getTime();
        }

        action.complete(JSON.stringify(res));
    };

    // Messages will be sent from the background script, event.js
    chrome.extension.onMessage.addListener(function (msg, sender, response) {
        if (msg.action) {
            actions[msg.action](msg);
        }

        if (msg.addedTags) {
            tagging.complete(JSON.stringify(msg.addedTags));
        }

        if (msg.tagRemoved) {
            tagging.tagRemovedSuccess(msg.tagRemoved);
        }

        if (msg.setAndSendKindle) {
            completeOnMessage(kindle, msg.setAndSendKindle, true);
        }

        if (msg.login) {
            // We need this to make sure the hashchange event fires on every
            // unsuccessful or succesful login attempt.
            // TODO: We're problably going to need this everywhere, abstract
            // and handle in the onhashchange
            msg.login.hashBuster = new Date().getTime();
            login.complete(JSON.stringify(msg.login));
        }

        // For domains that need their content POSTed.
        if (msg.contentNeeded) {
            // If a URL was requested and we're not currently on that page, we
            // need to let the background page know so it can request the correct
            // page and get the contents that way.
            if (document.location != msg.urlToParse) {
                response({
                    error: true
                });
            }
            else {
                var htmlContent = document.getElementsByTagName('html')[0].innerHTML;
                response({
                    doc: '<html>' + htmlContent + '</html>'
                });
            }
        }
    });

    var init = function () {
        shortcuts.init();
        rdbIndicator.init();

        // On sites like the nytimes we see them removing iframes. Wait a couple
        // seconds and see if the iframe is still there.
        setTimeout(function () {
            var i = document.getElementById('rdbIndicator');

            if (!i) {
                rdbIndicator.init();
            }
        }, 2000);

        window.addEventListener('message', onPostMessage, false);

        chrome.extension.sendMessage({
            contentScriptInit: true,
            currentPageLoc: document.location
        }, function (res) {
            // res should be a boolean
            if (res) {
                document.getElementsByTagName('body')[0].classList.add('rdb-addon-installed');
            }
        });
    };

    init();
}());