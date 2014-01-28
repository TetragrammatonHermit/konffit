requirejs.config({
    paths: {
        jquery: 'libs/jquery/jquery-1.9.1',
        jqueryui: 'libs/jqueryui/jquery-ui-1.10.0',
        underscore: 'libs/underscore/underscore-1.4.2',
        backbone: 'libs/backbone/backbone-0.9.2',
        // NOTE: We're using Mustache instead of underscore templates because
        // of the CSP. Underscore to relies on 'new Function' which poses
        // security threats. The CSP can be relaxed, but it shouldn't be.
        // http://developer.chrome.com/trunk/extensions/contentSecurityPolicy.html#relaxing-eval
        mustache: 'libs/mustache/mustache-0.7.0',
        text: 'libs/require/text-2.0.3'
    },
    shim: {
        'jqueryui': {
            exports: '$',
            deps: [
                'jquery'
            ]
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore', 'jquery', 'jqueryui'
            ],
            exports: 'Backbone'
        }
    }
});

requirejs([
    'jquery',
    'underscore',
    'backbone',
    'views/actions',
    'views/tagging',
    'views/send-to-kindle',
    'views/login',
    'views/signup'
], function ($, _, Backbone, ActionsView, TaggingView, SendToKindleView, LoginView,
    SignupView) {

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
        window.rdbSiteRoot = 'http://' + sitePath;

        if (localStorage['SSLDisabled']) {
            window.secureSiteRoot = window.rdbSiteRoot;
        }
        else {
            window.secureSiteRoot = 'https://' + sitePath;
        }

        window.secureSiteRoot = 'https://' + sitePath;
    }
    else {
        window.rdbSiteRoot = 'http://' + sitePath;
        window.secureSiteRoot = 'https://' + sitePath;
    }

    var apiPath = '/api/session/v1';
    window.apiRoot = window.rdbSiteRoot + apiPath;
    window.secureApiRoot = window.secureSiteRoot + apiPath;

    var goToView = 'actions';

    // If we need to navigate directly to a view other than the actions view,
    // we'll append a query string to the src url of the iframe.
    // This only needs to happen when an action is triggered from something other
    // than the popup; shortcut or context menu.
    if (window.location.hash) {
        $('html').attr('data-is-iframe', 'true');

        goToView = window.location.hash.split('#')[1];

        if (goToView.match('\\?')) {
            goToView = goToView.split('?')[0];
        }

        // If the user has logged in through the extension before, we don't
        // want to send them to signup
        if (goToView === 'auth') {
            if (parseInt(localStorage['rdb.hasLoggedIn'], 10)) {
                goToView = 'login';
            }
            else {
                goToView = 'signup';
            }
        }
    }

    $('html').attr('data-view', goToView);

    var views = {};

    // This is how all switching between views is accomplished.
    // The function is called from an event, 'show.view', bound to the body.
    var showView = function (e, data) {
        var container = $('div.container'),
            view = views[data.view],
            onShowData = data.onShowData || null;

        $('html').attr('data-view', data.view);

        container.find('> *').addClass('hidden');
        view.$el.removeClass('hidden');

        container.css('height', view.$el.outerHeight());

        if ($.isFunction(view.onShow)) {
            view.onShow(onShowData);
        }
    };

    // Since we need to explicitly set a height for each view, we need a way to
    // change it based on the height of the contents. This can be called by
    // triggering the 'resize.container' event bound to the body.
    var resizeContainer = function () {
        var container = $('div.container');
            newHeight = container.find('> div:not(.hidden)').outerHeight();

        container.css('height', newHeight);
    };

    $('body').on({
        'resize.container': resizeContainer,
        'show.view': showView
    });

    $(function () {
        var init = function () {
            views.actions = new ActionsView();

            // Doubling up on this condition, but if we're just showing the
            // actions we want it to happen as fast as possible.
            if (goToView === 'actions') {
                $('.container').removeClass('loading').html(views.actions.render().el);
                views.actions.show();
            }

            views.tagging = new TaggingView();
            views.sendToKindle = new SendToKindleView();
            views.login = new LoginView();
            views.signup = new SignupView();

            _.each(views, function (view, key) {
                if (key !== 'actions') {
                    $('.container').append(view.render().el);
                }
            });

            if (goToView !== 'actions') {
                var showViewSettings = {
                    view: goToView
                };

                $('.container').removeClass('loading')
                    .find('> .loading-indicator').remove();

                $('body').trigger('show.view', showViewSettings);
            }
        };

        if ($('html').attr('data-is-iframe')) {
            init();
        }
        else {
            // A safegaurd against having both the iframe and the popup opened
            chrome.runtime.getBackgroundPage(function (page) {
                page.closeIframe();
                init();
            });

            // Edge case, but we don't want folks to get tripped up if they try
            // to use the extension on a page without a URL like the Chrome
            // new tab page, options page, etc.
            chrome.tabs.getSelected(null, function (tab) {
                if (tab.url.indexOf('http') === -1) {
                    $('.actions-main').addClass('disabled');
                    $('.no-url-error').removeClass('hidden');
                }
            });
        }
    });
});