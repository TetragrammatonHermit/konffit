define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/tag.html'
],
function ($, _, Backbone, Mustache, template) {
    var TagView = Backbone.View.extend({

        tagName: 'li',
        viewObj: {},
        template: template,

        render: function () {
            this.viewObj = $.extend(this.viewObj, this.model);
            this.viewObj.tagUrl = window.rdbSiteRoot + '/me/all?tags=' + this.viewObj['text'];

            this.$el.attr('data-tag-id', this.viewObj.id)
                .html(Mustache.render(this.template, this.viewObj));

            return this;
        }
    });

    return TagView;
});