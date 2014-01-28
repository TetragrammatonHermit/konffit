define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'views/form',
    'text!templates/login.html'
],
function ($, _, Backbone, Mustache, FormView, template) {
    var LoginView = FormView.extend({

        events: {
            'submit form': 'submitHandler'
        },

        onShow: function () {
            var self = this;
            this.$el.find('input:first').focus();

            // When this is injected into the page in an iframe the only
            // way we can talk back to it is by changing the hash.
            if ($('html').attr('data-is-iframe')) {
                window.addEventListener('popstate', function (e) {
                    var hash = window.location.hash || '',
                        param = hash.split('=')[1];

                    if (hash.match('loginRes')) {
                        self.loginComplete(JSON.parse(param));
                    }
                });
            }
        },

        submitHandler: function (e) {
            e.preventDefault();
            var self = this,
                el = $(e.target);

            this.validate(el, function (res) {
                if (!res.error) {
                    var loginSettings = {
                            'data': $(e.target).serialize(),
                            'complete': function (res) {
                                self.loginComplete(res);
                            }
                        };

                    self.$el.find('.working-cover').toggleClass('hidden');

                    if ($('html').attr('data-is-iframe')) {
                        loginSettings.login = true;
                        window.parent.postMessage(JSON.stringify(loginSettings), '*');
                    }
                    else {
                        chrome.runtime.getBackgroundPage(function (page) {
                            page.login(loginSettings);
                        });
                    }
                }
                else {
                    $('body').trigger('resize.container');
                }
            });
        },

        // We're doing a lot of direct DOM manipulation here, we should probably
        // just re-render the template.
        loginComplete: function (res) {
            if (!res.error) {
                this.$el.find('.working-cover').addClass('hidden');

                if ($('html').attr('data-is-iframe')) {
                    this.close();
                }
                else {
                    // The action is being hard-coded here so we can get things done.
                    $('body').trigger('show.view', {
                        'view': 'actions',
                        'onShowData': {
                            'action': 'readLater'
                        }
                    });
                }
            }
            else {
                this.$el.find('b.error').addClass('hidden');
                this.$el.find('.working-cover').addClass('hidden');

                var resJSON = null,
                    defaultMsg = 'We\'re having some server issues at the moment and are unable to log you in. Mind trying again?',
                    msgText = null,
                    msgs = {
                        'invalid_username': 'Sorry, we don\'t recognize that username',
                        'invalid_password': 'We recognize your username, but the given password is incorrect'
                    };

                if (res.responseText) {
                    try {
                        resJSON = JSON.parse(res.responseText);
                        msgText = resJSON.errors.__all__[0];

                        if (resJSON.error) {
                            msgText = msgs[resJSON.error];
                        }
                    }
                    catch (e) {
                        msgText = defaultMsg;
                    }
                }

                this.$el.find('.msg p').text(msgText || defaultMsg);
                this.$el.find('.msg').removeClass('hidden');
                $('body').trigger('resize.container');
            }
        },

        close: function (e) {
            if (e) {
                e.preventDefault();
            }

            if ($('html').attr('data-is-iframe')) {
                $('.container').addClass('hidden');
                window.parent.postMessage('remove', '*');
            }
            else {
                window.close();
            }
        },

        template: template
    });

    return LoginView;
});