var Alerts = (function ($, window, document, undefined) {

	'use strict';

	//build the array list of alerts ordered by route
	var buildAlerts = function (result) {
		//array to hold route list and references to alerts
		var alertsByRoute = [];

		//first sort all the alerts from newest to oldest
		result.sort(function (a, b) {
			a = parseInt(a.active_period.start);
			b = parseInt(b.active_period.start);
			return a > b ? -1 : a < b ? 1 : 0;
		});

		//loop through each alert from the Ajax result to build the alertsByRoute array
		result.forEach(function (alert, index) {
			//an array of "informed_entity" lists all the routes for this alert
			alert.informed_entity.forEach(function (entity, idx) {
				//the jQuery grep method will find the route of this informed_entity if it has
				//already been added to the alertsByRoute array
				let current = $.grep(alertsByRoute, function (alert) { return alert.route_id === entity.route_id })[0];

				//if the route_id of the current informed_entity hasn't already been added to the
				//alertsByRoute array, then we need to add it.
				if (current === undefined) {
				//next we need to assign a sort order for this route so we display them in the correct order
				//the METRO and rail lines need to be picked out and put where they belong
					var sort = 0;
					switch (entity.route_id) {
						case '901': sort = 0;
							break;
						case '902': sort = 1;
							break;
						case '903': sort = 2;
							break;
						case '921': sort = 3;
							break;
						case '923': sort = 4;
							break;
						case '992': sort = 5;
							break;
						case '888': sort = 6;
							break;
						//add 10 to the rest so routes 2,3,4,etc will follow the METRO and rail
						default: sort = parseInt(entity.route_id) + 10;
					}

					//each item in alertsByRoute is an object, added here when the route doesn't already
					//exist in the array. The index of the current alert of the alert array (Json result)
					//is added to the alert_index property which is an array that will be added to each
					//time we find an alert for this route
					alertsByRoute.push({ sort_order: sort, route_id: entity.route_id, route_label: entity.route_label, alert_index: [index] });
				} else {
					//here we already had the route of the current informed_entity in the alertsByRoute array, so all we
					//need to do is add its index to the alert_index array property
					current.alert_index.push(index);
				}
			});
		});

		//now that the alertsByRoute array is fully populated, build the HTML output
		outputAlerts(alertsByRoute, result);
	};

	var outputAlerts = function (list, alerts) {
		//first sort the alertsByRoute array by the sort_order assigned in the previous function
		list = list.sort(function (a, b) {
			a = a.sort_order;
			b = b.sort_order;
			return a < b ? -1 : a > b ? 1 : 0;
		});

		//loop through the array and output the route label, then loop through the alert_index array
		//and get the alert information for each alert for each route
		list.forEach(function (route, index) {
			var alertDiv = $('<div/>', { style: 'margin-top:10px;' }).appendTo($('.alerts'));
			alertDiv.append($('<span/>', { style: 'font-size:1.3em;font-weight:700;' }).text(route.route_label));
			route.alert_index.forEach(function (alertIndex, idx) {
				alertDiv.append($('<div/>', { style: 'margin-left:15px;' }).text(alerts[alertIndex].header_text.translation[0].text));
			});
		});
	};

	var getAlerts = function () {
		//get all the alerts, convert to Json object and pass to buildAlerts method
		$.get('https://wwwtest.metrotransit.org/alerts/all')
			.done(function (result) {
				buildAlerts(JSON.parse(JSON.stringify(result)));
			});
	};

	var init = function () {
		//call getAlerts to initiate Ajax call
		getAlerts();
	};

	return {
		init: init
	};

})(jQuery, window, document);


$(function () {
	//When the document is ready, call the init method of Alerts
	Alerts.init();
});