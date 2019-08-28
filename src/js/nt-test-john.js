var NexTrip = (function ($, window, document, undefined) {

	'use strict';

	var getRoutes = function () {
		$.get('https://svc.metrotransittest.org/nextripv2/routes')
			.done(function (result) {
				let routes = JSON.parse(JSON.stringify(result));
				let routedrop = $('#ntRoute');
				$.each(routes, function (i, route) {
					routedrop.append($('<option/>').val(route.RouteId).text(route.Description));
				});
			});
	};

	var getDirections = function (id) {
		$.get('https://svc.metrotransittest.org/nextripv2/directions/' + id)
			.done(function (result) {
				let dirs = JSON.parse(JSON.stringify(result));
				let dirdrop = $('#ntDirection');
				//let selectOption = dirdrop
				dirdrop.find("option:gt(0)").remove(); //unload any previous set value 
				$.each(dirs, function (i, dir) {
					dirdrop.append($('<option/>').val(dir.DirectionId).text(dir.DirectionName));
				});
			});
	};

	var getStops = function (route, direction) {
		$.get('https://svc.metrotransittest.org/nextripv2/stops/' + route + '/' + direction)
			.done(function (result) {
				let stops = JSON.parse(JSON.stringify(result));
				let stopdrop = $('#ntStop');
				stopdrop.find("option:gt(0)").remove();
				$.each(stops, function (i, stop) {
					stopdrop.append($('<option/>').val(stop.PlaceCode).text(stop.Description));
				});
			});
	};

	var getTimepointDepartures = function (route, direction, code) {
		$.get('https://svc.metrotransittest.org/nextripv2/' + route + '/' + direction + '/' + code)
			.done(function (result) {
				loadDepartures(JSON.parse(JSON.stringify(result)));
			});
	};

	var getStopDepartures = function (id) {
		$.get('https://svc.metrotransittest.org/nextripv2/' + id)
			.done(function (result) {
				loadDepartures(JSON.parse(JSON.stringify(result)));
			})
			.fail(function () {
				$('.nextrip-departures').empty();
				$('.stop-description').text('Invalid StopId');
			});
	};

	// Two methods above for getting departures handle stopId vs timepoint queries.
	// The result set is the same for either method so can be handled in one place.
	var loadDepartures = function (result) {
		let list = $('.nextrip-departures');
		list.empty();
		let stop = result.Stop;
		let departures = result.Departures.sort(function (a, b) {
			a = new Date(a.DepartureTime);
			b = new Date(b.DepartureTime);
			return a < b ? -1 : a > b ? 1 : 0;
		});
		$('.stop-description').text('Stop: ' + stop.StopId + ' - ' + stop.Description);
		$.each(departures, function (i, depart) {
			list.append($('<div/>').html(depart.RouteId + depart.Terminal + ' : ' + depart.DepartureText));
		});
	};

	var init = function () {
		var routeId;
		var directionId;
		var placeCode;
		var stopId;
		var timer;

		$('.select-route-direction, .select-route-stop').hide();

		//Get routes when the page loads and populate the Routes dropdown.
		getRoutes();

		//When route dropdown changes get directions.
		$('#ntRoute').change(function () {
			routeId = this.value; //"this" in the context here refers to $('#ntRoute'), the object what called the function
			if (routeId != '') {
				$('.select-route-direction').fadeIn('slow').css('display', 'flex');
				getDirections(routeId);
			} else {
				$('.select-route-direction, .select-route-stop').hide();
			}
		});

		//When direction dropdown changes get stops.
		$('#ntDirection').change(function () {
			directionId = this.value;
			if (directionId != '') {
				$('.select-route-stop').fadeIn('slow').css('display', 'flex');
				getStops(routeId, directionId);
			} else {
				$('.select-route-stop').hide();
			}
		});

		//When stop dropdown changes get Timepoint departures.
		$('#ntStop').change(function () {
			placeCode = this.value;
			if (placeCode != '') {
				if (timer > 0) {
					clearInterval(timer);
				}
				timer = setInterval(function () {
					getTimepointDepartures(routeId, directionId, placeCode);
				}, 30000);

				getTimepointDepartures(routeId, directionId, placeCode);
			}
		});

		//For a stopId text input with button click
		$('#some-button').click(function () {
			if (timer > 0) {
				clearInterval(timer);
			}
			timer = setInterval(function () {
				getStopDepartures(stopId);
			}, 30000);

			//call getStopDepartures with entered stopId;
			getStopDepartures(stopId);
		});
	};

	return {
		init: init
	};

})(jQuery, window, document);


$(function () {
	NexTrip.init();
});
