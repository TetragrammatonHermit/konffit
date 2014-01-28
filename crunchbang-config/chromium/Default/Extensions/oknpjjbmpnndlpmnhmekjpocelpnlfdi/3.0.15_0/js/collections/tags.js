define([
    'backbone',
    'models/tag'
],
function (Backbone, Tag) {
    var Tags = Backbone.Collection.extend({
        model: Tag,
        url: function () {
            return window.apiRoot + '/tags/?limit=500';
        },
        parse: function (res) {
            return res.objects;
        }
    });

    return Tags;
});
