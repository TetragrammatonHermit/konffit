// The tagging view contains the form to add tags and the list of tags applied
// to the given bookmark.
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/tagging.html',
    'views/tag',
    'collections/tags'
],
function ($, _, Backbone, Mustache, template, TagView, TagsCollection) {
    var TaggingView = Backbone.View.extend({

        className: 'tagging hidden',

        events: {
            'click input.cancel': 'close',
            'submit form.tags-add-form': 'submitHandler',
            'input input[type=text]': 'abortHide',
            'click': 'abortHide',
            'keyup': 'keyup',
            'click a.tag-delete': 'removeTag'
        },

        bookmarkId: null,
        template: template,

        // This is a backbone collection
        tags: null,

        // If the user has already bookmarked and tagged this article, this view
        // will receive those tags onShow. We need to populate the interface
        // with them once the tags collection is ready.
        existingTags: null,

        // How long to keep the popup open without user interaction
        openDuration: 6000,
        closingTimeInterval: null,

        hideTaggingTimeout: null,

        render: function () {
            this.$el.html(Mustache.render(this.template, {}));

            return this;
        },

        onShow: function (onShowData) {
            var self = this,
                data = {};

            if (onShowData) {
                data = onShowData.bookmark;
            }
            else {
                data = JSON.parse(window.location.hash.split('bookmark=')[1]);
            }

            this.bookmarkId = data.id;

            // If the user already has this article bookmarked, and they've
            // applied tags we want to display those.
            if (data.tags) {
                if (data.tags.length > 0) {
                    this.existingTags = data.tags;
                }
            }

            // TODO: This localStorage item is set after an async call so it's
            // possible that it won't exist at this time.
            if (localStorage['rdb.user']) {
                this.populateTags();
            }

            this.$el.find('input[type=text]').focus();

            // If tagging was shown automatically on a Read Later, we want to
            // hide it after a few sections, if the user hasn't interacted with it.
            this.$el.find('.closing-msg').removeClass('hidden');

            this.updateClosingTime(true);

            this.closingTimeInterval = setInterval(function () {
                self.updateClosingTime();
            }, 1000);

            this.hideTaggingTimeout = setTimeout(function () {
                self.close();
            }, this.openDuration);

            // When tagging is injected into the page in an iframe the only
            // way we can talk back to it is by changing the hash.
            if ($('html').attr('data-is-iframe')) {
                window.addEventListener('popstate', function (e) {
                    var hash = window.location.hash || '',
                        param = hash.split('=')[1];

                    if (hash.match('addTagsRes')) {
                        self.addTagsComplete(JSON.parse(param));
                    }

                    if (hash.match('tagRemoved')) {
                        self.removeTagSuccess(param);
                    }
                });
            }
        },

        // Update the displayed time-til-close
        updateClosingTime: function (setInitial) {
            var self = this;

            this.$el.find('.closing-msg b').text(function (i, text) {
                var txt = '';

                if (setInitial) {
                    txt = self.openDuration / 1000;
                }
                else {
                    txt = parseInt(text, 10) - 1;
                }

                return txt;
            });
        },

        abortHide: function (e) {
            if (this.hideTaggingTimeout !== null) {
                clearTimeout(this.hideTaggingTimeout);
                clearInterval(this.closingTimeInterval);
                this.hideTaggingTimeout = null;
                this.closingTimeInterval = null;
                this.$el.find('.closing-msg').addClass('stopped');
            }
        },

        // Populate the tags collection. First by checking localStorage, then
        // by making a call to the server.
        populateTags: function () {
            var self = this,
                cacheHasExpired = function () {
                    var now = Math.floor(new Date().getTime() / 1000);
                        expiration = localStorage['rdb.tags.expire'] || 0;

                    return now > expiration;
                },
                getExpirationDate = function () {
                    var now = new Date().getTime() / 1000;

                    now += 3600 * 2;
                    return Math.floor(now);
                };

            this.tags = new TagsCollection();

            if (cacheHasExpired()) {
                this.tags.fetch({
                    success: function (tags) {
                        localStorage['rdb.tags.expire'] = getExpirationDate();
                        localStorage['rdb.tags'] = JSON.stringify(tags.toJSON());
                        self.initAutocomplete();

                        if (self.existingTags) {
                            self.addTagsSuccess(self.existingTags);
                        }
                    }
                });
            }
            else {
                this.tags.add(JSON.parse(localStorage['rdb.tags']));
                this.initAutocomplete();

                if (this.existingTags) {
                    this.addTagsSuccess(this.existingTags);
                }
            }

            // This is how we maintain new tags added through the extension without
            // needed to make requests to the server all the time.
            // This will only fire when a NEW (to the cache) tag is created.
            this.tags.on('add', function (tag) {
                localStorage['rdb.tags'] = JSON.stringify(self.tags.toJSON());
            });
        },

        initAutocomplete: function () {
            var self = this,
                el = $('input[name=tags]');

            // Pulled pretty much all of this from the jqueryui example:
            // http://jqueryui.com/autocomplete/#multiple
            var split = function (val) {
                return val.split(/,\s*/);
            };

            var extractLast = function (term) {
                return split(term).pop();
            };

            el.bind('autocompleteopen', function (e, ui) {
                el.data('menu-active', true);
            });

            el.bind('autocompleteclose', function (e, ui) {
                el.data('menu-active', false);
            });

            el.bind('keydown', function (e) {
                // don't navigate away from the field on tab when selecting an item
                if (e.keyCode === $.ui.keyCode.TAB && el.data('menu-active')) {
                    e.preventDefault();
                }
            }).autocomplete({
                minLength: 0,
                source: function (request, response) {
                    var tags = _.map(self.tags.pluck('text'), function (tag) {
                        // We need to decode any html entities
                        // http://stackoverflow.com/questions/5796718/html-entity-decode
                        return $('<div/>').html(tag).text();
                    });

                    // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(tags, extractLast(request.term)));
                },
                focus: function () {
                    // prevent value inserted on focus
                    return false;
                },
                select: function(e, ui) {
                    var terms = split(this.value);
                    terms.pop();
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    terms.push('');
                    this.value = terms.join(', ');
                    return false;
                }
            });

            // We kept seeing the autocomplete list pop up in the upper left of the
            // screen after it had been closed. I think it was because it still had
            // keyboard controls bound to it. Maybe? We disable the autocomplete
            // on success of adding tags.
            el.bind('focus', function (e) {
                $(this).autocomplete('enable');
            });
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
                window.close();
            }
        },

        displayError: function (errorName) {
            this.$el.find('.field-msg:not(.hidden)').addClass('hidden');
            this.$el.find('.field-msg[data-error=' + errorName + ']').removeClass('hidden');
            $('body').trigger('resize.container');
        },

        submitHandler: function (e) {
            e.preventDefault();

            var self = this,
                target = this.$el,
                input = target.find('input[type=text]'),
                tags = $.trim(input.val().replace(/,+$/, ''));

            if (tags.length > 0) {
                var settings = {
                    bookmarkId: self.bookmarkId,
                    tags: tags,
                    complete: function (res) {
                        self.addTagsComplete(res);
                    }
                };

                // Get the autocomplete out of the way.
                try {
                    this.$el.find('input[name=tags]').autocomplete('close');
                }
                catch (e) {};

                if ($('html').attr('data-is-iframe')) {
                    settings.tagBookmark = true;
                    window.parent.postMessage(JSON.stringify(settings), '*');
                }
                else {
                    chrome.runtime.getBackgroundPage(function (page) {
                        page.tagBookmark(settings);
                    });
                }
            }
            else {
                this.displayError('required');
            }
        },

        addTagsComplete: function (res) {
            var errorName = null,
                errors = {
                400: function (res) {
                    var error = 'general',
                        txt = null;

                    try {
                        txt = JSON.parse(res.responseText).error;

                        if (txt) {
                            error = txt;
                        }
                    } catch (e) {}

                    return error;
                },
                401: 'general',
                403: 'general',
                500: 'general'
            };

            if (!res.error) {
                this.addTagsSuccess(res);
            }
            else {
                if (errors[res.statusCode]) {
                    if ($.isFunction(errors[res.statusCode])) {
                        errorName = errors[res.statusCode](res);
                    }
                    else {
                        errorName = errors[res.statusCode];
                    }
                }
                else {
                    errorName = 'general';
                }

                this.displayError(errorName);
            }
        },

        // Expecting addedTags to be an array of tag objects
        addTagsSuccess: function (addedTags) {
            var self = this,
                target = this.$el,
                input = target.find('input[type=text]'),
                tagsEl = target.find('ul.tags-list');

            if (addedTags.length) {
                _.each(addedTags, function (tag) {
                    var tagView = new TagView({
                        model: tag
                    });

                    tagsEl.append(tagView.render().el);
                    self.tags.add(tagView.model);
                });

                tagsEl.removeClass('hidden');

                // "Cancel" seems wrong after you've adding tags
                target.find('.cancel').val('Done');

                $('body').trigger('resize.container');
                this.$el.find('.field-msg:not(.hidden)').addClass('hidden');
                this.$el.find('.field-msg.info').removeClass('hidden');
            }

            input.val('');
        },

        removeTag: function (e) {
            e.preventDefault();

            var self = this,

                settings = {
                    bookmarkId: self.bookmarkId,
                    tagId: $(e.target).attr('data-tag-id'),
                    success: function (tagId) {
                        self.removeTagSuccess(tagId);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                };

            if ($('html').attr('data-is-iframe')) {
                settings.removeTag = true;
                window.parent.postMessage(JSON.stringify(settings), '*');
            }
            else {
                chrome.runtime.getBackgroundPage(function (page) {
                    page.removeTagFromBookmark(settings);
                });
            }
        },

        removeTagSuccess: function (tagId) {
            var listEl = this.$el.find('ul.tags-list');

            this.$el.find('li[data-tag-id=' + tagId + ']').remove();

            if (listEl.find('li').length === 0) {
                listEl.addClass('hidden');
            }

            $('body').trigger('resize.container');
        }
    });

    return TaggingView;
});