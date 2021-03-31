(function ($) {
    $.bstests = $.bstests || {};

    $.extend($.bstests, {
        runSimpleMap: function () {
            commonscripts.redirectTo("/Dev/SimpleMapTest", true);
        },

        runSheepAnimation: function () {
            commonscripts.redirectTo("/Dev/SheepAnimation", true);
        }
    });
})(jQuery);