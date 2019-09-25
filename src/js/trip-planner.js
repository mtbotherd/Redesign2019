$(function() {
	"use strict";

	// TripPLan encapsulates the call to generate the trip plan
	var TripPlan = (function() {
		var TripPlanJSON = {};
		//
		// newTrip generates a trip from two address locations
		// getTrip returns the JSON for the current trip or nothing if no trip created
		//
		// newTrip parameters:
		//  fromLocation: { address: "Target FIeld", location: { x:477787.99999 , y:4981236.0001 }, attributes: { ATIS_ID: "BUS;3499;MPL;A;A;N"} },
		//  toLocation: { address: "Target FIeld", location: { x:477787.99999 , y:4981236.0001 }, attributes: { ATIS_ID: "BUS;3499;MPL;A;A;N"} },
		//  arrdep: "Depart",
		//  walkdist: "1.0",
		//  minimize: "Time",
		//  accessible: "False",
		//  datetime: "10/1/2019 07:30:00 AM"
		//
		var newTrip = function(tripProperties) {
			return $.Deferred(function (dfd) { 
				TripPlanJSON = {}; // clear the old one
				console.log(
					"Lets go tripping from " +
					tripProperties.fromLocation.address +
					" to " +
					tripProperties.toLocation.address
				);
				let datetime = new Date(tripProperties.datetime);
				// ATIS_ID have format "ENT;35;MPL;AWIS;P;N" - we want the second value converted to a number (i.e. 35)
				// NOTE: the order of location.y then location.x is intentional 
				let fromLoc =
					tripProperties.fromLocation.address 
					+ "|"
					+ tripProperties.fromLocation.location.y
					+ "|"
					+ tripProperties.fromLocation.location.x
					+ "|";   
				let fromATIS = '0';
				if (tripProperties.fromLocation.attributes.ATIS_ID.includes(';')) {
				fromATIS += tripProperties.fromLocation.attributes.ATIS_ID.split(';')[1];
				}
				fromLoc += fromATIS;
				let toLoc =
				tripProperties.toLocation.address
					+ "|"
					+ tripProperties.toLocation.location.y
					+ "|"
					+ tripProperties.toLocation.location.x
					+ "|";
				let toATIS = '0';
				if (tripProperties.toLocation.attributes.ATIS_ID.includes(';')) {
				toATIS += tripProperties.toLocation.attributes.ATIS_ID.split(';')[1];
				}
				toLoc += toATIS;
				let tripData = {
				's-orig': fromLoc,
				's-dest': toLoc,
				'arrdep': 'Depart', // tripProperties.arrdep
				'walkdist': '1.0', // tripProperties.walkdist
				'minimize': 'Time', // tripProperties.minimize
				'accessible': 'False', // tripProperties.accessible
				'xmode': 'BCLTX', // tripProperties.xmode
				'datetime': TRIM.convertDateTimeToDotNet(TRIM.convertUTCDateToLocalDate(datetime))
				};
				console.dir(tripData);
				$.ajax({
					type: 'get',
					url: 'https://www.metrotransittest.org/Services/TripPlannerSvc.ashx',
					data: tripData,
					dataType: "json"
				})
					.done(function(result, status, xhr) {
					if (result.error) {
						dfd.reject({'Message': result.error});
					} else if (result.TrapEx) {
						dfd.reject(result.TrapEx);
					} else {
						TripPlanJSON = result;
						dfd.resolve();
					}
					})
					.fail(function(err) {
						dfd.reject("Fetch TripPlan - No trip found " + err);
					});

			}).promise();
		};
		var getTrip = function() {
		return TripPlanJSON;
		};

		return {
		newTrip: newTrip,
		getTrip: getTrip
		};
	})();
});