(function ($) {
    $.bstests = $.bstests || {};

    $.extend($.bstests, {
        runSimpleMap: function () {
            commonscripts.redirectTo("/Dev/SimpleMap", true);
        },

        runAnimalAnimation: function () {
            commonscripts.redirectTo("/Dev/AnimalAnimation", true);
        },

        runBushGrowing: function () {
            commonscripts.redirectTo("/Dev/BushGrowing", true);
        }
    });
})(jQuery);