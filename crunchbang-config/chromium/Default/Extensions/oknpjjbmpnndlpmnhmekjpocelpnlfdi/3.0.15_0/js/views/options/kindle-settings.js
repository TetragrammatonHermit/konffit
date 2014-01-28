define([
    'jquery',
    'underscore',
    'backbone'
],
function ($, _, Backbone) {
    var KindleSettingsView = Backbone.View.extend({

        events: {
            'submit .kindle-form': 'submitHandler'
        },

        render: function (kindleUserDetails) {
            if (kindleUserDetails) {
                this.$el.find('input[name=username]').val(kindleUserDetails.username);
                this.$el.find('select[name=domain]').val('@' + kindleUserDetails.domain);
            }
        },

        displayError: function (errorName) {
            this.$el.find('.field-msg:not(.hidden)').addClass('hidden');
            this.$el.find('.field-msg[data-error=' + errorName + ']').removeClass('hidden');
        },

        submitHandler: function (e) {
            var self = this,
                username = this.$el.find('[name=username]').val() || null,
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

            // Allow a user to set their addr to nothing
            if (username === null) {
                settings.data.kindle_email_address = null;
            }

            chrome.runtime.getBackgroundPage(function (page) {
                page.setKindleAddr(settings);
            });
        },

        sendComplete: function (res) {
            if (!res.error) {
                this.$el.find('.field-msg:not(.hidden)').addClass('hidden');
                $('body').trigger('optionSaved');
            }
            else {
                this.displayError('general');
            }
        }
    });

    return KindleSettingsView;
});