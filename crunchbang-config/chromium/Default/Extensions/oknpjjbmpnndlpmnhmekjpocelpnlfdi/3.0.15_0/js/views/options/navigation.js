define([
    'jquery',
    'underscore',
    'backbone'
],
function ($, _, Backbone) {
    var NavigationView = Backbone.View.extend({

        events: {
            'click a': 'clickHandler'
        },

        clickHandler: function (e) {
            e.preventDefault();

            var selectedClass = 'selected',
                currentView = $($(e.currentTarget).attr('href'));

            $('[role=main] > section, [role=navigation] li').removeClass(selectedClass);
            $(e.currentTarget).parent().addClass(selectedClass);
            currentView.addClass(selectedClass);
        }
    });

    return NavigationView;
});