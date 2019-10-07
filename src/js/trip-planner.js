// TripPLan encapsulates the call to generate the trip plan
var TripPlan = (function($, window, document, undefined) {
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
})(jQuery, window, document);

$(function () {
    // This triggers planning a new trip when the
    // button on the Trip Planner page is clicked
    // TODO: Test for errors in the result
    // TODO: Test for FROM address = TO address
    // TODO: Trigger display of 'No Trips Found' message if error occurs
    //
    $('button[name="planMyTrip"]').click(function () {
		$('#tripPlannerResults').hide();
        var tripFromLocation = AutocompleteAddress.getChoice('fromLocation');
		var tripToLocation = AutocompleteAddress.getChoice('toLocation');
		var selectTime = $('#selectTime').val();
		var walkingDistance = $("input[name='walkingDistance']:checked").val();
		var serviceType = $("input[name='serviceType']:checked").val();
		console.log("walk: " + walkingDistance + " service: " + serviceType + " time: " + selectTime);
        if (tripFromLocation && tripToLocation) {
            // set default trip plan value here and override from inputs
            // TODO find all the input source for the parameters and format them correctly for the trip planner
            let tripProperties = {
                fromLocation: tripFromLocation,
                toLocation: tripToLocation,
                arrdep: "Depart",
                walkdist: "1.0",
                minimize: "Time",
                accessible: "False",
                datetime: "10/10/2019 03:30:00 PM"
            };
            TripPlan.newTrip(tripProperties)
                .then(function () {
                    let plan = TripPlan.getTrip();
                    console.log("Have a Plan");
					console.dir(plan);
					if (plan.PlannerItin.PlannerOptions.length > 0) {
						$('.trips-found').show();
						$('.no-trips-found').hide();
						$('#tripPlannerResults').show();
					} else {
						$('.trips-found').hide();
						$('.no-trips-found').show();
						$('#tripPlannerResults').show();
					}
                })
                .fail(function (err) {
                    console.warn("Trip Plan Failed: " + err.Message);
					console.dir(err);
					$('.trips-found').hide();
					$('.no-trips-found').show();
					$('#tripPlannerResults').show();
                });
        }
    });

    // This loads the map into the resulting Trip Plan page.
    // Once the map loads, trips can be displayed.
    //
    // TODO: this is currently in DEMO mode.
    // Need to add routines that trigger when user
    // clicks the 'trip summary' button to show on the
    // map just that trip option.
    //
    // Format for the call:
    // TRIM.drawTrip(<trip option>, <entire trip plan>, <zoom to trip>)
    if ($("#tripPlanMap").attr("maptype") === "trip") {
        TRIM.init("tripPlanMap").then(function () {
            let tripPlan = TripPlan.getTrip();
            if (tripPlan) {
                if (tripPlan.PlannerItin) {
                    if (tripPlan.PlannerItin.PlannerOptions.length > 0) {
                        console.log("Draw TripPlan 0");
                        TRIM.drawTrip(0, tripPlan, /*zoom*/ true);
                    }
                    if (tripPlan.PlannerItin.PlannerOptions.length > 1) {
                        setTimeout(function () {
                            console.log("Draw TripPlan 1");
                            TRIM.drawTrip(1, tripPlan, /*zoom*/ true);
                        }, 5000);
                    }
                    if (tripPlan.PlannerItin.PlannerOptions.length > 2) {
                        setTimeout(function () {
                            console.log("Draw TripPlan 2");
                            TRIM.drawTrip(2, tripPlan, /*zoom*/ true);
                        }, 10000);
                    }
                }
            }
        });
    }
});
