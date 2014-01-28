// Common Readability functionality across extensions.
// Depends on jQuery vJUSTGETTHENEWONE
var rdb;

(function (exports) {
    // CommonJS
    if (typeof module !== "undefined" && module.exports) {
        module.exports = exports;
    }
    // AMD
    else if (typeof define === "function") {
        define(exports);
    }
    // <script>
    else {
        rdb = exports;
    }
}((function () {
    var exports = {};

    // To test in an environment other than production you'll need to set
    // a "rdbSiteRoot" item in localStorage with the url of the Readability instance.
    // How?
    // 1. Go to the Chrome extensions page.
    // 2. Open the Readability background page.
    // 3. In the Console: localStorage['rdbSiteRoot'] = '{localReadability}:{port}'
    // The value of #3 should not include the protocol
    // If you're working locally you'll probably want to disable SSL. Do so
    // by setting localStorage['SSLDisabled'] = 1
    var sitePath = 'www.readability.com';

    if (localStorage['rdbSiteRoot']) {
        sitePath = localStorage['rdbSiteRoot'];
        exports.siteRoot = 'http://' + sitePath;

        if (localStorage['SSLDisabled']) {
            exports.secureSiteRoot = exports.siteRoot;
        }
        else {
            exports.secureSiteRoot = 'https://' + sitePath;
        }
    }
    else {
        exports.siteRoot = 'http://www.readability.com';
        exports.secureSiteRoot = 'https://www.readability.com';
    }

    $.ajaxSetup({
        timeout: parseInt(localStorage['rdbRequestTimeout'], 10) || 10000
    });

    var apiPath = '/api/session/v1';
    exports.apiRoot = exports.siteRoot + apiPath;
    exports.secureApiRoot = exports.secureSiteRoot + apiPath;

    var errorHandler = function (jqxhr, callback) {
        var errorMsg = null,
            timeout = null;

        if (jqxhr.statusText == 'timeout') {
            timeout = true;
        }

        if (jqxhr.responseText) {
            try {
                errorMsg = JSON.parse(jqxhr.responseText).error_message;
            }
            catch (e) {
                errorMsg = null;
            }
        }

        callback({
            error: true,
            timeout: timeout,
            errorMsg: errorMsg,
            statusCode: jqxhr.status,
            responseText: jqxhr.responseText
        });
    };

    exports.getUsers = function (callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'GET',
            url: exports.apiRoot + '/users/',
            success: function (res) {
                callback(res);
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    exports.getAuthedUser = function (callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'GET',
            url: exports.apiRoot + '/users/me/',
            success: function (res) {
                callback(res);
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    exports.updateAuthedUser = function (data, callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'PATCH',
            url: exports.apiRoot + '/users/me/',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (res) {
                callback(res);
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    // dataProperties - username (string), password (string)
    // A successful login will pass a user object to the callback
    exports.login = function (data, callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'POST',
            url: exports.secureApiRoot + '/login/',
            data: data,
            success: function (res) {
                exports.getAuthedUser(function (userRes) {
                    callback(userRes);
                });
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    exports.logout = function (callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'GET',
            url: exports.siteRoot + '/logout/',
            success: callback,
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    // Read now should take the given url and post it to the /article resource
    // of the API.
    exports.readNow = function (url, callback, opts) {
        exports.createArticle(url, callback, opts);
    };

    exports.readLater = function (url, callback, opts) {
        exports.createBookmark(url, callback, opts);
    };

    exports.sendToKindle = function (url, callback, opts) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'POST',
            url: exports.apiRoot + '/kindle/send/',
            data: {
                url: url
            },
            success: function (responseText) {
                var res = {
                    text: responseText
                };

                callback(res);
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    // Takes a non-rdb url if successfull the callback will be passed an
    // article object.
    // The article object is retreived by getArticleByResourceURI
    exports.createArticle = function (url, callback, opts) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        var settings = opts || {},
            data = {
                url: url
            };

        if (settings.doc) {
            data.doc = settings.doc;
        }

        $.ajax({
            type: 'POST',
            url: exports.apiRoot + '/articles/',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res, status, jqxhr) {
                exports.getArticleByResourceURI(jqxhr.getResponseHeader('location'), function (article) {
                    callback(article);
                });
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    exports.getArticleByResourceURI = function (resourceUri, callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'GET',
            url: resourceUri,
            success: function (res) {
                callback(res);
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    exports.createBookmark = function (url, callback, opts) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        var settings = opts || {},
            data = {
                url: url
            };

        if (settings.doc) {
            data.doc = settings.doc;
        }

        $.ajax({
            type: 'POST',
            url: exports.apiRoot + '/bookmarks/',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                callback(res);
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    exports.tagBookmark = function (bookmarkId, tags, callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'POST',
            url: exports.apiRoot + '/bookmarks/' + bookmarkId + '/tags/',
            contentType: 'application/json',
            data: '{"tags": "' + tags + '"}',
            success: function (res) {
                callback(res);
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    exports.removeTagFromBookmark = function (bookmarkId, tagId, callback) {
        if (!$.isFunction(callback)) {
            callback = $.noop;
        }

        $.ajax({
            type: 'DELETE',
            url: exports.apiRoot + '/bookmarks/' + bookmarkId + '/tags/' + tagId + '/',
            success: function () {
                callback({success: true});
            },
            error: function (jqxhr) {
                errorHandler(jqxhr, callback);
            }
        });
    };

    return exports;
}())));