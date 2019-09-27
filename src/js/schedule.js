var Schedule = (function ($, window, document, undefined) {

    'use strict';

    var scheduleSelect = function () {
        var pane = '#' + $(this).data('pane');
        $('.schedule-days>button.active').removeClass('active');
        $(this).addClass('active');
        $('.timetables>div.active').removeClass('active fade show');
        $(pane).addClass('active fade show');
        loadTimetable();
    };

    var loadTimetable = function () {
        var pane = $('.timetables>div.active');
        if (!pane.data('isLoaded')) {
            $.get('/Schedules/Timetable.aspx', { scheduleID: pane.data('scheduleId') })
                .done(function (data) {
                    $('.timetables>div.active>.timetable-container').html(data);
                    pane.data('isLoaded', true);
                });
        }
    };

    var init = function (routeAbbr) {
        loadTimetable();

        Alerts.getAlertsForRoute(routeAbbr);

        $('.schedule-days>button').on('click', scheduleSelect);
        $('#maplink').on('click', function () { window.location.href = $(this).data('link'); });
        $('#printlink').on('click', function () { window.print(); });

        if ($("#routeBOM").attr("maptype") === "BOM") {
            let parms = {
                stopID: null, // optional stop, if route too then show just the one route
                routeID: routeAbbr, // optional route, if no stop - show vehicles on route, if 0 - show all
                zoomToNearestBus: true, // when drawing buses the first time, zoom out until you find a bus to show
                stopZoomLevel: 16 // Web Mercator level to intially zoom the stop extent, if stopID has a value
            };
            BOM.init("routeBOM");
            $("#collapseMap").on("shown.bs.collapse", function () {
                BOM.startBusesOnMap(parms);
            });
            $("#collapseMap").on("hidden.bs.collapse", function () {
                BOM.stopBusesOnMap();
            });
        }
    };

    return {
        init: init
    };

})(jQuery, window, document);