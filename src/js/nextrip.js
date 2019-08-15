//$(function () { }); The code that executes on page load should go in this kind of closure. It will then execute when the DOM is ready and not before. It's the same as using "document.ready()".

$(function () {
	var routeId,
		directionId,
		placeCode,
		stopId,
		timer;

	$('.select-route-direction, .select-route-stop').hide();
	$('#nextripDepartures').hide();

	// Get routes when the page loads and populate the Routes dropdown
	getRoutes();

	// When route dropdown changes, get direction
	$('#ntRoute').change(function () {
		routeId = this.value;
		if (routeId != '') {
			$('.select-route-direction').fadeIn('slow').css('display', 'flex');
			getDirections(routeId);
		} else {
			$('.select-route-direction', '.select-route-stop').hide();
		}
	});

	// When direction dropdown changes, get stops.
	$('#ntDirection').change(function () {
		directionId = this.value;
		if (directionId != '') {
			$('.select-route-stop').fadeIn('slow').css('display', 'flex');
			getStops(routeId, directionId);
		} else {
			$('.select-route-stop').hide();
		}
	});

	// When stop dropdown changes, get Timepoint departures.
	$('#ntStop').change(function () {
		placeCode = this.value;
		if (placeCode !== '') {
			if (timer > 0) {
				clearInterval(timer);
			}
			timer = setInterval(function () {
				getTimepointDepartures(routeId, directionId, placeCode);
			}, 30000);

			getTimepointDepartures(routeId, directionId, placeCode);
		}
	});

	$('#searchStopsButton').click(function () {
		if (timer > 0) {
			clearInterval(timer);
		}
		timer = setInerval(function () {
			getStopDepartures(stopId);
		}, 30000);

		// Call getStopDepartures with entered stopId.
		getStopDepartures(stopId);
	});
});

function getRoutes() {
	$.get('https://svc.metrotransittest.org/nextripv2/routes')
		.done(function (result) {
			let routes = JSON.parse(JSON.stringify(result));
			let routedrop = $('#ntRoute');
			$.each(routes, function (i, route) {
				routedrop.append($('<option/>').val(route.RouteId).text(route.Description));
			});
		});
};

function getDirections(id) {
	$.get('https://svc.metrotransittest.org/nextripv2/directions/' + id)
		.done(function (result) {
			let directions = JSON.parse(JSON.stringify(result));
			let directiondrop = $('#ntDirection');
			//let selectOption = directiondrop
			directiondrop.find("option:gt(0)").remove(); // Clear previously set value.
			$.each(directions, function (i, directions) {
				directiondrop.append($('<option/>>').val(directions.DirectionId).text(directions.DirectionName));
			});
		});
};

function getStops(route, direction) {
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

function getTimepointDepartures(route, direction, code) {
	$.get('https://svc.metrotransittest.org/nextripv2/' + route + '/' + direction + '/' + code)
		.done(function (result) {
			loadDepartures(JSON.parse(JSON.stringify(result)));
		});
};

function getStopDepartures(id) {
	$.get('https://svc.metrotransittest.org/nextripv2/' + id)
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
	$('#nextripDepartures').show();
	let list = $('.stop-departures');
	list.empty();
	let stop = result.Stop;
	//let route = result.Route;
	let departures = result.Departures.sort(function (a, b) {
		a = new Date(a.DeartureTime);
		b = new Date(b.DepartureTime);
		return a < b ? -1 : a > b ? 1 : 0;
	});
	$('.stop-description').html('<p>' + stop.Description + '<br/>' + 'Stop ' + stop.StopId + '</p>');
	$.each(departures, function (i, depart) {
		var departRow = $('<div/>', { class: 'd-flex list-group-item pr-0 pl-0' }).appendTo(list);
		departRow.append($('<span/>', { class: 'route-number mr-2' }).text(depart.RouteId + depart.Terminal));
		departRow.append($('<span/>', { class: 'route-name' }).text(depart.Description));

		var departTime = $('<span/>', { class: 'depart-time ml-auto' }).appendTo(departRow);
		if (depart.Actual === true) {
			departTime.append($('<img/>', { class: 'icon blink mr-1', src: '/img/svg/broadcast-red.svg' }));
		}
		departTime.append(depart.DepartureText);
	});

	var threshold = 3;

	if ($('.stop-departures').children().length > threshold) {
		$('.show.more').css('display', 'block');
		console.log(threshold);
	}

	$('.show.more').click(function () {
		$(this).parent().find('.stop-departures').children().slideDown('slow');
		$(this).parent().find('.show.less').show();
		$(this).hide();
	});

	$('.show.less').click(function () {
		$(this).parent().find('.stop-departures').children(':nth-child(n+' + (threshold + 1) + ')').slideUp('slow');
		$(this).parent().find('.show.more').show();
		$(this).hide();
	});
};