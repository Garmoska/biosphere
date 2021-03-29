(function ($) {
    $.bstests = $.bstests || {};

    $.extend($.bstests, {
        runSimpleMapTest: function () {
            commonscripts.redirectTo("/Dev/SimpleMapTest", true);
        }
    });
})(jQuery);