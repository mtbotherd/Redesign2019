var NexTrip = (function ($, window, document, undefined) {

    'use strict';
    var routeId,
        directionId,
        placeCode,
        stopId,
        timer;
    var threshold = 3;

    function getRoutes() {
        $.get(window.serviceHostUrl + '/nextripv2/routes')
            .done(function (result) {
                let routes = JSON.parse(JSON.stringify(result));
                let routedrop = $('#ntRoute');
                $.each(routes, function (i, route) {
                    routedrop.append($('<option/>').val(route.RouteId).text(route.Description));
                });
            });
    };

    function getDirections(id) {
        $.get(window.serviceHostUrl + '/nextripv2/directions/' + id)
            .done(function (result) {
                let directions = JSON.parse(JSON.stringify(result));
                let directiondrop = $('#ntDirection');
                directiondrop.find("option:gt(0)").remove(); // Clear previously set value.
                $.each(directions, function (i, directions) {
                    directiondrop.append($('<option/>').val(directions.DirectionId).text(directions.DirectionName));
                });
                $('.select-route-direction').fadeIn('slow').css('display', 'flex');
            });
    };

    function getStops(route, direction) {
        $.get(window.serviceHostUrl + '/nextripv2/stops/' + route + '/' + direction)
            .done(function (result) {
                let stops = JSON.parse(JSON.stringify(result));
                let stopdrop = $('#ntStop');
                stopdrop.find("option:gt(0)").remove();
                $.each(stops, function (i, stop) {
                    stopdrop.append($('<option/>').val(stop.PlaceCode).text(stop.Description));
                });
                $('.select-route-stop').fadeIn('slow').css('display', 'flex');
            });
    };

    function getTimepointDepartures(route, direction, code) {
        $.get(window.serviceHostUrl + '/nextripv2/' + route + '/' + direction + '/' + code)
            .done(function (result) {
                loadDepartures(JSON.parse(JSON.stringify(result)));
            });
    };

    function getStopDepartures(id) {
        $.get(window.serviceHostUrl + '/nextripv2/' + id)
            .done(function (result) {
                loadDepartures(JSON.parse(JSON.stringify(result)));
            })
            .fail(function () {
                $('.stop-departures').empty();
                $('#nextripDepartures').show();
                $('.stop-description').text('Invalid StopId');
                $('.more').hide();
                clearInterval(timer);
            });
    };

    // Two methods for getting departures handle stopId vs timepoint queries.
    // The result set is the same for either method so can be handled in one place.
    function loadDepartures(result) {
        $('#nextripDepartures').show();
        var showAll = $('.less').is(':visible');
        let list = $('.stop-departures');
        list.empty();
        let stop = result.Stop;
        stopId = stop.StopId;  // needed for the map 

        $('.stop-description').html('<p>' + stop.Description + '<br/>' + 'Stop ' + stop.StopId + '</p>');

        if (result.Departures.length === 0) {
            $('<p><strong>No departures at this time</strong></p>').appendTo(list);
            $('.more').hide();
            return;
        }

        let departures = result.Departures.sort(function (a, b) {
            a = new Date(a.DeartureTime);
            b = new Date(b.DepartureTime);
            return a < b ? -1 : a > b ? 1 : 0;
        });

        $.each(departures, function (i, depart) {
            var departRow = $('<div/>', { class: 'list-group-item pr-0 pl-0' }).appendTo(list);
            departRow.append($('<span/>', { class: 'route-number mr-2' }).text(depart.RouteId + depart.Terminal));
            departRow.append($('<span/>', { class: 'route-name' }).text(depart.Description));

            var departTime = $('<span/>', { class: 'depart-time ml-auto' }).appendTo(departRow);
            if (depart.Actual === true) {
                departTime.append($('<img/>', { class: 'icon blink mr-1', src: '/img/svg/broadcast-red.svg' }));
            }
            departTime.append(depart.DepartureText);
        });

        if (!showAll && departures.length > threshold) {
            $('.more').show();
        } else if (showAll && departures.length > threshold) {
            $('.stop-departures .list-group-item').attr('style', 'display: flex !important');
            $('.more').hide();
        } else {
            $('.more').hide();
            $('.less').hide();
        }
    };

    var resetUI = function () {
        clearInterval(timer);
        $('#ntRoute').val('');
        $('#ntDirection').val('');
        $('.select-route-direction').hide();
        $('#ntStop').val('');
        $('.select-route-stop').hide();
        $('#stopNumber').val('');
        $('#collapseMap').collapse('hide');
        $('#nextripDepartures').hide();
    };

    var departuresOnEnterKey = function () {
        $(document).on('keydown', function (event) {
            if ($('#stopNumber').val() == '') return;
            if (event.which == 13) {
                event.preventDefault();
                $('#searchStopsButton').trigger('click');
            }
        });
    };

    var init = function () {
        $('#stopNumber').on('focus', departuresOnEnterKey);
        $('#stopNumber').on('blur', function () { $(document).off('keydown'); });

        // Get routes when the page loads and populate the Routes dropdown
        getRoutes();

        // When route dropdown changes, get direction
        $('#ntRoute').change(function () {
            routeId = this.value;
            if (routeId != '') {
                clearInterval(timer);
                $('#stopNumber').val('');
                $('#ntStop').val('');
                $('.select-route-stop').hide();
                $('#collapseMap').collapse('hide');
                $('#nextripDepartures').hide();
                getDirections(routeId);
            } else {
                resetUI();
            }
        });

        // When direction dropdown changes, get stops.
        $('#ntDirection').change(function () {
            directionId = this.value;
            if (directionId != '') {
                clearInterval(timer);
                $('#collapseMap').collapse('hide');
                $('#nextripDepartures').hide();
                getStops(routeId, directionId);
            } else {
                resetUI();
            }
        });

        // When stop dropdown changes, get Timepoint departures.
        $('#ntStop').change(function () {
            placeCode = this.value;
            $('#collapseMap').collapse('hide');
            clearInterval(timer);
            if (placeCode !== '') {
                timer = setInterval(function () {
                    getTimepointDepartures(routeId, directionId, placeCode);
                }, 30000);

                getTimepointDepartures(routeId, directionId, placeCode);
            } else {
                $('#nextripDepartures').hide();
            }
        });

        $('#searchStopsButton').click(function () {
            stopId = $('#stopNumber').val();
            routeId = ''; // need to clear value for the map to work properly
            resetUI();
            timer = setInterval(function () {
                getStopDepartures(stopId);
            }, 30000);

            getStopDepartures(stopId);
            $('#stopNumber').focus();
        });

        $('.more').click(function () {
            $('.stop-departures .list-group-item').slideDown().attr('style', 'display: flex !important');
            $(this).hide();
            $('.less').show();
        });

        $('.less').click(function () {
            $('.stop-departures').children(':nth-child(n+' + (threshold + 1) + ')').slideUp('slow');
            $(this).hide();
            $('.more').show();
        });

        if ($('#NexTripMap').attr('maptype') === 'BOM')
            BOM.init('NexTripMap').then(function () { });

        $('#collapseMap').on('shown.bs.collapse', function () {
            var mapParms = {
                stopID: stopId, // optional stop, if route too then show just the one route
                routeID: routeId !== '' ? routeId : null, // 
                zoomToNearestBus: true, // when drawing buses the first time, zoom out until you find a bus to show
                stopZoomLevel: 16 // Web Mercator level to intially zoom the stop extent, if stopID has a value
            };
            //console.dir(mapParms);
            BOM.startBusesOnMap(mapParms);
        });

        $('#collapseMap').on('hidden.bs.collapse', function () {
            BOM.stopBusesOnMap();
        });
    };

    return {
        init: init
    };

})(jQuery, window, document);
