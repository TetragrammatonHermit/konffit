define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/actions.html'
],
function ($, _, Backbone, Mustache, template) {
    var ActionsView = Backbone.View.extend({

        className: 'actions hidden',

        events: {
            'click ul.actions-main li': 'actionsHandler',
            'click li.sharing a': 'shareHandler'
        },

        template: template,

        viewObj: {},

        render: function (callback) {
            this.viewObj.siteRoot = window.rdbSiteRoot;
            this.$el.html(Mustache.render(this.template, this.viewObj));
            this.$el.data('view', this);
            return this;
        },

        actionComplete: function (action, res) {
            var self = this,
                actionEl = this.$('[data-action=' + action + ']'),
                actions = {
                'readNow': function () {
                    if (window) {
                        window.close();
                    }
                },
                'readLater': function () {
                    if (!res.error) {
                        if (parseInt(localStorage['rdb.promptTags'], 10)) {
                            $('body').trigger('show.view', {
                                'view': 'tagging',
                                'onShowData': {
                                    'bookmark': res
                                }
                            });
                        }
                        else {
                            window.close();
                        }
                    }
                    else {
                        if (res.unauthenticated) {
                            // If the user has ever logged in using the extension
                            // we don't want to send them to signup
                            if (parseInt(localStorage['rdb.hasLoggedIn'], 10)) {
                                $('body').trigger('show.view', {'view': 'login'});
                            }
                            else {
                                $('body').trigger('show.view', {'view': 'signup'});
                            }
                        }
                        else {
                            window.close();
                        }
                    }
                },
                'sendToKindle': function () {
                    try {
                        window.close();
                    }
                    catch (e) {}
                }
            };

            actionEl.removeClass('working');
            actions[action]();
        },

        actionsHandler: function (e) {
            e.preventDefault();

            var self = this,
                el = $(e.currentTarget);

            // This working class check gaurds against double clicks on an action
            if (!el.hasClass('working')) {
                var action = el.attr('data-action');

                var takeAction = function () {
                    el.addClass('working');

                    chrome.runtime.getBackgroundPage(function (page) {
                        page.takeAction({
                            'action': action,
                            'origin': 'popup',
                            'callback': function (res) {
                                self.actionComplete(action, res);
                            }
                        });
                    });
                };

                var promptSendKindle = function () {
                    $('body').trigger('show.view', {'view': 'sendToKindle'});
                };

                if (action === 'sendToKindle') {
                    chrome.runtime.getBackgroundPage(function (page) {
                        page.getKindleUserDetailsCookie(function (cookie) {
                            if (!cookie) {
                                promptSendKindle();
                            }
                            else {
                                takeAction();
                            }
                        });
                    });
                }
                else {
                    takeAction();
                }
            }
        },

        onShow: function (data) {
            if (data) {
                if (data.action) {
                    var el = this.$el.find('[data-action=' + data.action + ']');
                    el.addClass('working');
                }
            }
        },

        shareHandler: function (e) {
            e.preventDefault();
            $('body').trigger('share.toggle');
        },

        show: function () {
            var self = this;
            setTimeout(function () {
                self.$el.removeClass('hidden');
                $('body').trigger('resize.container');
            }, 100);
        }
    });

    return ActionsView;
});