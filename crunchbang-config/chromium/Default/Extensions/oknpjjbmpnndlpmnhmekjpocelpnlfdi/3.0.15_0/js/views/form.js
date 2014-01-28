// A standard form view that specific forms can inherit from.
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache'
],
function ($, _, Backbone, Mustache) {
    var FormView = Backbone.View.extend({

        className: 'form-container hidden',

        // All Views that inherit from this view will have these
        // events as well as an events they have in their events
        // property.
        baseEvents: {
            'click input.cancel': 'cancel',
            'click a.signup': 'signup',
            'click a.login': 'login'
        },

        viewObj: {},

        // NOTE: If an inheriting view has it's own init method
        // this is going to be a problem
        initialize: function () {
            this.events = _.extend((this.events || {}), this.baseEvents);
        },

        render: function () {
            this.viewObj.siteRoot = window.rdbSiteRoot;
            this.$el.html(Mustache.render(this.template, this.viewObj));

            return this;
        },

        cancel: function (e) {
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
                $('body').trigger('show.view', {'view': 'actions'});
            }
        },

        getFieldValidationMessage: function (field) {
            var msgs = {
                    'valueMissing': 'Please fill in this field.',
                    'typeMismatch': 'Please enter a valid email address.',
                    'patternMismatch': 'Letters, numbers and underscores only please.'
                },
                validationMessage = null;

            // If the field has a title we'll use that has the error message,
            // if not look throught he validation Messages.
            if (field.title) {
                validationMessage = field.title;
            }
            else {
                var getKeyByValue = function (obj) {
                    for (var prop in obj) {
                        if (obj[prop] === true) {
                            return prop;
                        }
                    }
                };

                validationMessage = msgs[getKeyByValue(field.validity)] ||
                    'Please check this field and try again.';
            }

            return validationMessage;
        },

        validate: function (el, callback) {
            var self = this;

            if (!$.isFunction(callback)) {
                callback = $.noop;
            }

            if (!el.get(0).checkValidity()) {
                var fields = el.find('input')
                    .not('[type=hidden], [type=submit], [type=checkbox]');

                // Hide any previous errors
                el.find('b.error').addClass('hidden');

                var i = 0;
                while (i < fields.length) {
                    var field = fields[i];

                    if (!field.checkValidity()) {
                        var msg = self.getFieldValidationMessage(field),
                            error = $(field).next();

                        error.text(msg).removeClass('hidden');
                        break;
                    }

                    i += 1;
                }

                callback({error: true});
            } else {
                callback({});
            }
        },

        signup: function (e) {
            e.preventDefault();
            $('body').trigger('show.view', {'view': 'signup'});
        },

        login: function (e) {
            e.preventDefault();
            $('body').trigger('show.view', {'view': 'login'});
        }
    });

    return FormView;
});