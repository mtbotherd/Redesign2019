//
// TripPLan encapsulates the call to generate the trip plan
//
var TripPlan = function() {
    var TRIPPLANJSON = {};
    //
    // newTrip generates a trip from two address locations
    // 
    // parameters:
    // 'fromLocation': the JSON object output from the address autocomplete
    // 'toLocation': the JSON object output from the address autocomplete
    // 
    var newTrip = function (fromLocation, toLocation) {
        TRIPPLANJSON = {}; // clear the old one
        console.log("Lets go tripping from " + fromLocation.address + " to " + toLocation.address);
        let testDate = new Date("8/19/2019 07:30:00 AM");
        let fromLoc = fromLocation.address + '|' + fromLocation.location.y + '|' + fromLocation.location.x + '|' + fromLocation.ATIS_ID;
        let toLoc = toLocation.address + '|' + toLocation.location.y + '|' + toLocation.location.x + '|' + toLocation.ATIS_ID;
        $.ajax({
            type: "get",
            url: "https://www.metrotransittest.org/Services/TripPlannerSvc.ashx",
            data: {
                "s-orig": fromLoc,
                "s-dest": toLoc,
                "arrdep": "Depart", 
                "walkdist": "1.0",
                "minimize": "Time",
                "accessible": "False",
                //"xmode": "BCLTX",
                //"datetime": TRIM.convertDateTimeToDotNet(TRIM.convertUTCDateToLocalDate(new Date()))
                "datetime": TRIM.convertDateTimeToDotNet(TRIM.convertUTCDateToLocalDate(testDate))
            },
            dataType: "json"
        })
            .done(function (result, status, xhr) {
                console.dir(result);
                TRIPPLANJSON = result;
                console.log("Total Plans: " + TRIPPLANJSON.PlannerItin.PlannerOptions.length);
            })
            .fail(function (err) {
                console.warn("Fetch TripPlan - No trip found " + err);
            });
    };
    var getTrip = function () {
        return TRIPPLANJSON;
    };

    return {
        newTrip: newTrip,
        getTrip: getTrip
    };
}();

// This triggers planning a new trip when the 
// button on the Trip Planner page is clicked
//
$('button[name="planMyTrip"]').click(function(){
    TripPlan.newTrip(TRIPFROMLOCATION,TRIPTOLOCATION);
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
if ($('#tripPlanMap').attr('maptype') === 'trip') {
    TRIM.init('tripPlanMap').then(function() {
        let tripPlan = TripPlan.getTrip();
        if (tripPlan) {
            if (tripPlan.PlannerItin) {
                if (tripPlan.PlannerItin.PlannerOptions.length > 0) {
                    console.log("Draw TripPlan 0");
                    TRIM.drawTrip(0, tripPlan,/*zoom*/true);
                }
                if (tripPlan.PlannerItin.PlannerOptions.length > 1) {
                    setTimeout(function () {
                        console.log("Draw TripPlan 1");
                        TRIM.drawTrip(1, tripPlan,/*zoom*/true);
                    }, 5000);
                }
                if (tripPlan.PlannerItin.PlannerOptions.length > 2) {
                    setTimeout(function () {
                        console.log("Draw TripPlan 2");
                        TRIM.drawTrip(2, tripPlan,/*zoom*/true);
                    }, 10000);
                }
            }
        }
    });
}