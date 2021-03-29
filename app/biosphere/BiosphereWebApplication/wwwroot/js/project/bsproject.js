(function ($) {
    $.bsproject = $.bsproject || {};

    $.extend($.bsproject, {
        runDevDashboard: function() {
            commonscripts.redirectTo("Dev/Index");
        }
    });
})(jQuery);