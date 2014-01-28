define([
    'backbone'
],
function (Backbone) {
    var Tag = Backbone.Model.extend({
        urlRoot: function () {
            return window.apiRoot + '/tags/';
        },

        url: function () {
            if (typeof this.get('id') === 'undefined') {
                return this.urlRoot();
            }
            else {
                return this.urlRoot() + this.get('id') + "/";
            }
        }
    });

    return Tag;
});
