// The tagging view contains the form to add tags and the list of tags applied
// to the given bookmark.
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/send-to-kindle.html'
],
function ($, _, Backbone, Mustache, template) {
    var SendToKindleView = Backbone.View.extend({

        className: 'kindle hidden',

        events: {
            'click input.cancel': 'close',
            'submit form': 'submitHandler',
            'keyup': 'keyup'
        },

        template: template,

        onShow: function () {
            var self = this;
            this.$el.find('input[name=username]').focus();

            // When tagging is injected into the page in an iframe the only
            // way we can talk back to it is by changing the hash.
            if ($('html').attr('data-is-iframe')) {
                window.addEventListener('popstate', function (e) {
                    var hash = window.location.hash || '',
                        param = hash.split('=')[1];

                    if (hash.match('kindleRes')) {
                        // During testing, some of the responses from 500 errors
                        // would contain all type of oddness that were causing
                        // JSON.parse to blow up. Make sure we catch those and
                        // just display a general error.
                        try {
                            self.sendComplete(JSON.parse(param));
                        }
                        catch (e) {
                            self.sendComplete({error: true});
                        }
                    }
                });
            }
        },

        render: function () {
            this.$el.html(Mustache.render(this.template));

            return this;
        },

        displayError: function (errorName) {
            this.$el.find('.field-msg:not(.hidden)').addClass('hidden');
            this.$el.find('.field-msg[data-error=' + errorName + ']').removeClass('hidden');
            $('body').trigger('resize.container');
        },

        submitHandler: function (e) {
            var self = this,
                username = this.$el.find('[name=username]').val(),
                domain = this.$el.find('[name=domain]').val(),
                settings = {
                    'data': {
                        'kindle_email_address': username + domain
                    },
                    'complete': function (res) {
                        self.sendComplete(res);
                    }
                };

            e.preventDefault();

            if (username.length) {
                this.$el.find('.working-cover').removeClass('hidden');

                if ($('html').attr('data-is-iframe')) {
                    settings.setAndSendKindle = true;
                    window.parent.postMessage(JSON.stringify(settings), '*');
                }
                else {
                    chrome.runtime.getBackgroundPage(function (page) {
                        page.setAndSendKindle(settings);
                    });
                }
            }
            else {
                this.displayError('required');
            }
        },

        sendComplete: function (res) {
            this.$el.find('.working-cover').addClass('hidden');

            if (!res.error) {
                this.close();
            }
            else {
                this.displayError('general');
            }
        },

        // This is for when the tagging interface is embedded in an iframe
        keyup: function (e) {
            if ($('html').attr('data-is-iframe') && e.keyCode == 27) {
                this.close();
            }
        },

        close: function (e) {
            if (e) {
                e.preventDefault();
            }

            if ($('html').attr('data-is-iframe')) {
                $('.container').addClass('hidden');

                // Wait just a short time for the outro animation
                setTimeout(function () {
                    window.parent.postMessage('remove', '*');
                }, 500);
            }
            else {
                try {
                    window.close();
                }
                catch (e) {}
            }
        }
    });

    return SendToKindleView;
});