var TripPlan = function() {
    var TRIPPLANJSON = {};
    var newTrip = function (fromLocation, toLocation) {
        TRIPPLANJSON = {}; // clear the old one
        console.log("Lets go tripping from " + fromLocation.address + " to " + toLocation.address);
        let testDate = new Date("8/19/2019 07:30:00 AM");
        let atisID = '0';
        let fromLoc = fromLocation.address + '|' + fromLocation.location.y + '|' + fromLocation.location.x + '|' + atisID;
        let toLoc = toLocation.address + '|' + toLocation.location.y + '|' + toLocation.location.x + '|' + atisID;
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
};

$('button[name="planMyTrip"]').click(function(){
    TripPlan.newTrip(TRIPFROMLOCATION,TRIPTOLOCATION);
});

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