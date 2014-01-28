define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/form',
    'text!templates/signup.html'
],
function ($, _, Backbone, Mustache, FormView, template) {
    var SignupView = FormView.extend({

        events: {
            'click .signup-btn': 'close'
        },

        close: function (e) {
            if ($('html').attr('data-is-iframe')) {
                $('.container').addClass('hidden');

                // Wait just a short time for the outro animation
                setTimeout(function () {
                    window.parent.postMessage('remove', '*');
                }, 500);
            }
            else {
                window.close();
            }
        },

        template: template
    });

    return SignupView;
});