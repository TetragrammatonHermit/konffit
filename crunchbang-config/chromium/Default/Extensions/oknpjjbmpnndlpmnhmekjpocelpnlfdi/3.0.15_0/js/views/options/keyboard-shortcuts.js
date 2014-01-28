define([
    'jquery',
    'underscore',
    'backbone',
    'keanu'
],
function ($, _, Backbone, keanu) {
    var KeyboardShortcutsView = Backbone.View.extend({

        // NOTE: We might want to get these from the background page. Kinda
        // doing similar work in two places this way?
        commands: [
            'rdb.shortcut.readNow',
            'rdb.shortcut.readLater',
            'rdb.shortcut.sendToKindle'
        ],

        events: {
            'click .command-shortcut-container': 'clickHandler'
        },

        initialize: function () {
            $('.command-shortcut-container').bind('toggleCapturing', this.toggleCapturing);
            $('.command-shortcut-container').bind('setShortcut', this.setShortcut);
            $('.command-shortcut-container').bind('clearShortcut', this.clearShortcut);

            // Set all default shortcuts
            for (var i = 0; i < this.commands.length; i += 1) {
                var cmd = this.commands[i],
                    el = this.$el.find('[data-command-name="' + cmd + '"]'),
                    shortcut = localStorage[cmd];

                // Make sure we display the empty text if it's empty
                // NOTE: Checking 'null' as a string because it's coming from
                // localStorage where only strings can be stored
                if (shortcut !== 'null') {
                    var shortcutText = this.getFriendlyShortcut(shortcut);
                    el.attr('data-shortcut', shortcut)
                        .attr('data-shortcut-text', shortcutText)
                        .text(shortcutText);
                }
                else {
                    el.parent().addClass('inactive-keybinding');
                }
            }
        },

        setShortcut: function (e, data) {
            var el = $(e.target),
                shortcutEl = el.find('.command-shortcut'),
                cmd = shortcutEl.attr('data-command-name');

            el.removeClass('inactive-keybinding');

            shortcutEl.attr('data-shortcut', data.shortcut)
                .attr('data-shortcut-text', data.shortcutText)
                .text(data.shortcutText);

            localStorage[cmd] = data.shortcut;
            $('body').trigger('optionSaved');

            chrome.runtime.getBackgroundPage(function (page) {
                page.shortcuts.refresh();
            });
        },

        clearShortcut: function (e) {
            var el = $(e.target),
                shortcutEl = el.find('.command-shortcut'),
                cmd = shortcutEl.attr('data-command-name');

            el.addClass('inactive-keybinding');

            shortcutEl.attr('data-shortcut', '')
                .attr('data-shortcut-text', '')
                .text(function () {
                    return $(this).attr('data-empty-text');
                });

            localStorage[cmd] = null;
            $('body').trigger('optionSaved');

            chrome.runtime.getBackgroundPage(function (page) {
                page.shortcuts.refresh();
            });
        },

        toggleCapturing: function (e) {
            var el = $(e.target),
                shortcutEl = el.find('.command-shortcut');

            el.parents('.command-container').siblings().find('.capturing')
                .trigger('toggleCapturing');

            if (el.hasClass('capturing')) {
                el.removeClass('capturing');

                // TODO: This better, more complete
                if (shortcutEl.attr('data-shortcut-text').length > 0) {
                    shortcutEl.text(shortcutEl.attr('data-shortcut-text'));
                }
                else {
                    shortcutEl.text(shortcutEl.attr('data-empty-text'));
                }
            }
            else {
                el.addClass('capturing');
                shortcutEl.text(shortcutEl.attr('data-set-text'));
            }
        },

        shortcutIsUnique: function (el, shortcut) {
            var shortcutEl = this.$el.find('[data-shortcut=' + shortcut + ']');

            shortcutEl.parent().addClass('highlight');

            setTimeout(function () {
                shortcutEl.parent().removeClass('highlight');
            }, 700);

            return shortcutEl.length < 1;
        },

        clickHandler: function (e) {
            var self = this,
                target = $(e.target),
                el = $(e.currentTarget),
                shortcutEl = el.find('.command-shortcut');

            if (target.hasClass('command-clear')) {
                if (!el.hasClass('inactive-keybinding')) {
                    el.trigger('clearShortcut');
                }
            }
            else {
                el.trigger('toggleCapturing');

                keanu.get_shortcut({
                    max_keys: 4,
                    on_update: function (shortcut) {
                        if (shortcut) {
                            shortcutEl.text(self.getFriendlyShortcut(shortcut));
                        }
                    },
                    on_set: function (shortcut) {
                        if (shortcut && self.shortcutIsUnique(el, shortcut)) {
                            el.trigger('setShortcut', {
                                shortcut: shortcut,
                                shortcutText: self.getFriendlyShortcut(shortcut)
                            });
                        }
                    },
                    on_complete: function () {
                        el.trigger('toggleCapturing');
                    }
                });
            }
        },

        // Convert keycodes to a readable format, eg 192 to `
        getFriendlyShortcut: function (shortcut) {
            var friendlyShortcut = '',
                shortcutArr = keanu.shortcut_to_keyarray(shortcut),
                which = null;

            for (var i = 0; i < shortcutArr.length; i += 1) {
                which = shortcutArr[i];
                friendlyShortcut += keanu.transform_which(which);

                if (i < shortcutArr.length -1) {
                    friendlyShortcut += ' + ';
                }
            }

            return friendlyShortcut;
        }
    });

    return KeyboardShortcutsView;
});
