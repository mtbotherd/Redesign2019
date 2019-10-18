var NexTrip = (function ($, window, document, undefined) {

    'use strict';
    var routeId,
        directionId,
        placeCode,
        stopId,
        timer;

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
                //let selectOption = directiondrop
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
                $('.nextrip-departures').empty();
                $('.stop-description').text('Invalid StopId');
            });
    };

    // Two methods for getting departures handle stopId vs timepoint queries.
    // The result set is the same for either method so can be handled in one place.
    function loadDepartures(result) {
        $('#nextripDepartures').show('slow');
        let list = $('.stop-departures');
        list.empty();
        let stop = result.Stop;
        stopId = stop.StopId;  // needed for the map 
        //let route = result.Route;
        let departures = result.Departures.sort(function (a, b) {
            a = new Date(a.DeartureTime);
            b = new Date(b.DepartureTime);
            return a < b ? -1 : a > b ? 1 : 0;
        });
        $('.stop-description').html('<p>' + stop.Description + '<br/>' + 'Stop ' + stop.StopId + '</p>');
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

        var threshold = 3;

        if (departures.length > threshold) {
            $('.more').show();
        } else {
            $('.more').hide();
        }

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
    };

    var init = function () {

        // Get routes when the page loads and populate the Routes dropdown
        getRoutes();

        // When route dropdown changes, get direction
        $('#ntRoute').change(function () {
            routeId = this.value;
            if (routeId != '') {
                getDirections(routeId);
                $('.select-route-stop').hide();
            } else {
                $('.select-route-direction').hide();
                $('.select-route-stop').hide();
            }
        });

        // When direction dropdown changes, get stops.
        $('#ntDirection').change(function () {
            directionId = this.value;
            if (directionId != '') {
                getStops(routeId, directionId);
            } else {
                $('.select-route-stop').hide();
            }
        });

        // When stop dropdown changes, get Timepoint departures.
        $('#ntStop').change(function () {
            $('#collapseMap').collapse('hide');
            placeCode = this.value;
            if (placeCode !== '') {
                if (timer > 0) {
                    clearInterval(timer);
                }
                timer = setInterval(function () {
                    getTimepointDepartures(routeId, directionId, placeCode);
                    $('#nextripDepartures .list-group .less').hide();
                }, 30000);

                getTimepointDepartures(routeId, directionId, placeCode);
            }
        });

        $('#searchStopsButton').click(function () {
            $('#collapseMap').collapse('hide');
            stopId = $('#stopNumber').val();
            if (timer > 0) {
                clearInterval(timer);
            }
            timer = setInterval(function () {
                getStopDepartures(stopId);
            }, 30000);

            // Call getStopDepartures with entered stopId.
            getStopDepartures(stopId);
        });

        if ($('#NexTripMap').attr('maptype') === 'BOM')
            BOM.init('NexTripMap').then(function () {
            });
        $('#collapseMap').on('shown.bs.collapse', function () {
            var mapParms = {
                stopID: stopId, // optional stop, if route too then show just the one route
                routeID: routeId, // optional route, if no stop - show all on route, if 0 - show all
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