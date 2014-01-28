define([
    'jquery',
    'underscore',
    'backbone'
],
function ($, _, Backbone) {
    var UserControlsView = Backbone.View.extend({

        events: {
            'click a.logout': 'logout'
        },

        render: function (user) {
            this.$el.find('.login').attr('href', window.siteRoot + '/login');
            this.$el.find('.signup').attr('href', window.siteRoot + '/signup');

            if (user.error) {
                this.$el.find('.authed').addClass('hidden');
                this.$el.find('.unauthed').removeClass('hidden');
            }
            else {
                this.$el.find('.authed').removeClass('hidden');
                this.$el.find('.user').text(user.username)
                    .attr('href', window.siteRoot + '/' + user.username);
            }
        },

        logout: function (e) {
            var self = this;
            e.preventDefault();

            chrome.runtime.getBackgroundPage(function (page) {
                page.logout(function () {
                    document.location.reload();
                });
            });
        }
    });

    return UserControlsView;
});