// This script is used in the activity indicator that displays in the page.
// indicator.html is set as the src of an iframe and injected into the page via
// our content script.
(function () {
    var indicator = function () {
        var exports = {},
            el = $('div.indicator'),
            transitionEnd = function (e) {
                $('.loader').addClass('animate');
            };

        var init = function () {
            el.get(0).addEventListener('webkitTransitionEnd', transitionEnd, true);
            el.get(0).addEventListener('transitionend', transitionEnd, true);

            $('button.cancel').on('click', function (e) {
                e.preventDefault();
                exports.close();
            });

            $('button.confirm').on('click', function (e) {
                e.preventDefault();
                window.parent.postMessage('resumeAction', '*');
            });
        }();

        exports.defaultAction = function (action) {
            el.attr('data-action', action).removeClass('hidden');
        };

        exports.error = function (action, data) {
            var wait = 0;

            // If the indicator is already showing, we don't want it to just
            // jump around. Let it switch to the trying section so the user
            // gets the since that something is happening
            if (!el.hasClass('hidden')) {
                wait = 900;
            }
            else {
                setTimeout(function () {
                    el.removeClass('hidden');
                }, 100);
            }

            setTimeout(function () {
                el.attr({
                    'data-action': 'error',
                    'data-status': data.statusCode
                });
            }, wait);
        };

        exports.rootUrlWarning = function () {
            el.attr('data-action', 'rootUrlWarning');

            setTimeout(function () {
                el.removeClass('hidden');
            }, 100);
        };

        exports.close = function () {
            el.addClass('hidden');

            // We want to wait until the closing animation is complete
            setTimeout(function () {
                window.parent.postMessage('ready', '*');
            }, 400);
        };

        exports.ready = function () {
            el.addClass('ready').removeClass('hidden');

            setTimeout(function () {
                exports.close();
            }, 700);
        };

        return exports;
    }();

    window.indicator = indicator;

    // Because we can't rely on chrome messaging or postMessage with an iframe
    // that has a chrome-extension:// protocol we're using popstate. The
    // content script will replace the contentWindow.location of the iframe with
    // the action that needs to be taken.
    window.addEventListener('popstate', function (e) {
        var hash = window.location.hash.split('#')[1],
            action = null,
            data = null;

        if (hash) {
            if (hash.match('\\?')) {
                action = hash.split('?')[0];
                data = JSON.parse(hash.split('data=')[1]);
            }
            else {
                action = hash;
            }

            var actionToTake = indicator[action] || indicator['defaultAction'];

            actionToTake(action, data);
        }
    });
}());