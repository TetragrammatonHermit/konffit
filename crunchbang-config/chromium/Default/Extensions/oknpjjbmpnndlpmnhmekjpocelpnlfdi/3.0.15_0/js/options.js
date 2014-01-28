requirejs.config({
    paths: {
        jquery: 'libs/jquery/jquery-1.9.1',
        underscore: 'libs/underscore/underscore-1.4.2',
        backbone: 'libs/backbone/backbone-0.9.2',
        // NOTE: We're using Mustache instead of underscore templates because
        // of the CSP. Underscore to relies on 'new Function' which poses
        // security threats. The CSP can be relaxed, but it shouldn't be.
        // http://developer.chrome.com/trunk/extensions/contentSecurityPolicy.html#relaxing-eval
        mustache: 'libs/mustache/mustache-0.7.0',
        text: 'libs/require/text-2.0.3',
        rdb: 'libs/rdb/rdb',
        keanu: 'libs/keanu/keanu-0.3'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore', 'jquery'
            ],
            exports: 'Backbone'
        }
    }
});

requirejs([
    'jquery',
    'underscore',
    'backbone',
    'views/options/navigation',
    'views/options/defaults',
    'views/options/keyboard-shortcuts',
    'views/options/kindle-settings',
    'views/options/user-controls'
], function ($, _, Backbone, NavigationView, DefaultsView, KeyboardShortcutsView,
    KindleSettingsView, UserControlsView) {

    $('body').on('optionSaved', function () {
        var el = $('.update-notification'),
            timeout = null;

        if (timeout) {
            clearTimeout(timeout);
        }

        el.removeClass('hidden');

        timeout = setTimeout(function () {
            el.addClass('hidden');
        }, 2000);
    });

    $(function () {
        var navigationView = new NavigationView({
            el: $('[role=navigation]')
        });

        var defaultsView = new DefaultsView({
            el: $('#defaults')
        });

        var keyboardShortcutsView = new KeyboardShortcutsView({
            el: $('#keyboard-shortcuts')
        });

        var kindleSettingsView = new KindleSettingsView({
            el: $('#kindle-settings')
        });

        var userControlsView = new UserControlsView({
            el: $('.user-controls')
        });

        chrome.runtime.getBackgroundPage(function (page) {
            window.siteRoot = page.rdb.siteRoot;

            page.getUser(function (user) {
                userControlsView.render(user);
            });

            page.getKindleUserDetailsCookie(function (cookie) {
                kindleSettingsView.render(cookie);
            });
        });

        // A little misplaced with this, but oh well
        var manifest = chrome.runtime.getManifest();
        $('.app-version').find('img').attr('src', manifest.icons['48'])
            .end().find('span').text(manifest.version);
    });
});
