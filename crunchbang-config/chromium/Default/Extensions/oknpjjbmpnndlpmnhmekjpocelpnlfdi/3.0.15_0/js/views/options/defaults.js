define([
    'jquery',
    'underscore',
    'backbone'
],
function ($, _, Backbone) {
    var DefaultsView = Backbone.View.extend({

        events: {
            'change input[name=icon]': 'changeIcon',
            'change input[name=prompt-tags]': 'changePromptTags'
        },

        initialize: function () {
            if (localStorage['rdb.icon']) {
                $('input[name=icon][value=' + localStorage['rdb.icon'] + ']')
                    .attr('checked', 'checked');
            }
            else {
                localStorage['rdb.icon'] = 'red';
            }

            if (!parseInt(localStorage['rdb.promptTags'], 10)) {
                $('input[name=prompt-tags]').removeAttr('checked');
            }
        },

        changeIcon: function (e) {
            var iconColor = $(e.target).val();
            localStorage['rdb.icon'] = iconColor;
            $('body').trigger('optionSaved');

            // We need to get this each time because the background page
            // is non-persistent, this will wake it up.
            chrome.runtime.getBackgroundPage(function (backgroundPage) {
                backgroundPage.setBrowserActionIcon(iconColor);
            });
        },

        changePromptTags: function (e) {
            localStorage['rdb.promptTags'] = $(e.target).is(':checked') ? 1 : 0;
            $('body').trigger('optionSaved');
        }
    });

    return DefaultsView;
});
