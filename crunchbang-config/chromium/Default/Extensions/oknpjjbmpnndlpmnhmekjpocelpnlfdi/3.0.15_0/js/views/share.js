define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'rdb',
    'text!templates/share.html'
],
function ($, _, Backbone, Mustache, rdb, template) {
    var ShareView = Backbone.View.extend({

        className: 'share hidden',

        events: {
            'click a.share-facebook': 'share',
            'click a.share-twitter': 'share',
            'click a.share-email': 'shareByEmail'
        },

        template: template,

        viewObj: {
            article: null,
            tweetText: null,
            facebookUrl: null
        },

        render: function (callback) {
            this.$el.html(Mustache.render(this.template, this.viewObj));

            return this;
        },

        buildViewObj: function (article) {
            this.viewObj.article = article;
            this.viewObj.encodedUrl = encodeURIComponent(article.url);

            this.viewObj.tweetText = encodeURIComponent('“' + article.title + '” ');
            this.viewObj.fbTitle = encodeURIComponent(article.title);
        },

        onShow: function () {
            var self = this;

            if (this.viewObj.article === null) {

                // TODO: We'll need a cross-browser way to do this.
                chrome.tabs.getSelected(null, function (tab) {
                    rdb.createArticle(tab.url, function (article) {
                        self.buildViewObj(article);
                        self.render();
                    });
                });
            }
        },

        share: function (e) {
            e.preventDefault();

            var el = $(e.target),
                url = el.attr('href'),
                name = 'shareOnTwitter',
                size = 'width=550,height=260,toolbar=no';

            if (el.hasClass('share-facebook')) {
                name = 'shareOnFacebook';
                size = 'width=640,height=350,toolbar=no';
            }

            window.open(url, name, size);
        },

        shareByEmail: function (e) {
            e.preventDefault();
            console.log(e);
        }
    });

    return ShareView;
});