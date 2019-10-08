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
	const newTrip = function(tripProperties) {
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
			if (tripProperties.fromLocation.attributes.ATIS_ID.indexOf(';')>0) {
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
			if (tripProperties.toLocation.attributes.ATIS_ID.indexOf(';')>0) {
			toATIS += tripProperties.toLocation.attributes.ATIS_ID.split(';')[1];
			}
			toLoc += toATIS;
			let tripData = {
			's-orig': fromLoc,
			's-dest': toLoc,
			'arrdep': tripProperties.arrdep,
			'walkdist': tripProperties.walkdist,
			'minimize': tripProperties.minimize,
			'accessible': tripProperties.accessible,
			'xmode': tripProperties.xmode,
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
	const getTrip = function() {
		return TripPlanJSON;
  };
  var listFunction = function(li,i,ii,vari,initTime){
    //console.log(li,i,ii,vari,initTime)
    if(li.Segments[ii].SegmentType===3&&ii===0)return returnTime(initTime,vari)
    else if(li.Segments[ii].SegmentType===3){
      let io = ii-1;
      return returnTime(li.Segments[io].OffTime,vari)
    }
    else if(li.length===ii) return returnTime(li.Segments[ii].OffTime,vari)
    else return returnTime(li.Segments[ii].OnTime,vari)
  };
  var returnTime = function(Time,vari){
    Time+"-05:00";
    let time = new Date(Time);
    let minutes = time.getMinutes();
    if(minutes<10)minutes=`0${minutes}`;
    let hour = time.getHours();
    if(hour<13) vari = ' p.m';
    else vari = ' a.m';
    return `${hour}:${minutes} ${vari}`;
  };
  var returnTripTime = function(Time){
    let time = new Date(Time);
    let minutes = time.getMinutes();
    //if(minutes<10) minutes=`0${minutes}`;
    let hour = time.getHours();
    if(hour>=1) hour = hour+" hr"
    else hour = ' ';
    return `${hour} ${minutes} min`;
  };
  var checkIfLate = function(Adherance){
    if(Adherance<0){
      return `<img class="icon blink"msrc="/img/svg/broadcast-red.svg">&nbsp;<strong>Currently ${Adherance}
      <abbr title="minutes">min</abbr> late</strong>
      <br>`
    } else { 
      return " "
    }
  };
  const formatTrip = function(plan) {
    let tripCount = plan.PlannerItin.PlannerOptions.length;
    let tripMsg = 'We have ' + tripCount.toString() + ' trip';
    tripMsg += tripCount > 1 ? 's':'';
    tripMsg += ' for you.';
    $("#trip-result-count").html(tripMsg);
    $("#trip-result-msg").html(tripMsg);
    //<p class="mb-0">We found 3 trips for you Trips shown are based on your selections and closest departure to 3:25 PM, Friday, August 30th.</p>
      
    $('.tp-results').empty();
    plan.PlannerItin.PlannerOptions.forEach(function(l,i) {
      let list = [],secondList = [];
      l.Segments.forEach(function(li,ii){
        switch (li.SegmentType) {
          case 0:
            list.push(`<img class="icon"src="/img/svg/bus-gray.svg">&nbsp;
            <span class="route mr-1">${li.Route}</span>`)
            break;
          case 1:
            if(li.PublicRoute==="Blue Line"){
              list.push(`<span class="d-flex align-items-center badge badge-secondary mr-1">
                <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
                <span class="caps">Blue</span>
              </span>`)
            } else if(li.PublicRoute==="Green Line"){
              list.push(`<span class="d-flex align-items-center badge badge-success mr-1">
                <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
                <span class="caps">Green</span>
              </span>`)
            }
            break;
          case 2:
            list.push(`<img class="icon" src="/img/svg/circle-gray-outline-train.svg">`)
            break;
          case 3:
            list.push(`<img class="icon" src="/img/svg/pedestrian-gray.svg">`)
            break;
          case 4:
           list.push(`<img class="icon" src="/img/svg/circle-gray-outline-train.svg">`)
           break;
          default:
            console.warn('Invalid segment type: '+ li.SegmentType);
        }
      });
      l.Segments.forEach(function(li,ii){
          let timeOfDay = "";
          switch(li.SegmentType){
            case 0:
              secondList.push(`<div class="leg-item">
              <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)} ${timeOfDay}</div>
              <div class="d-table-cell leg-mode bus">
                <div class="d-table-cell leg-mode-icon">
                <img class="icon" src="/img/svg/circle-gray-outline-train.svg">
                </div>
                <p>
                ${checkIfLate(li.Adherance)}
                  Route ${li.Route} ${li.OffStop.StopLocation.LocationName}
                  <br>
                  <a href="/home/#ServiceAlerts">
                    <small>view alerts</small>
                  </a>
                </p>
                <p>
                  <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}
                </p>
                <p>
                  <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
                </p>
              </div>
            </div>`)
              break;
            case 1:
              secondList.push(`<div class="leg-item">
              <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)} ${timeOfDay} </div>
              <div class="d-table-cell leg-mode metro-${li.PublicRoute.split(" ", 1)}">
                <div class="d-table-cell leg-mode-icon">
                  ${li.PublicRoute=== "Blue Line"?'<img class="icon" src="/img/svg/circle-green-outline-lrt.svg"/>':'<img class="icon" src="/img/svg/circle-blue-lrt.svg"/>'}
                </div>
                <p>
                  <strong>${li.Headsign}</strong>
                </p>
                <p>
                  <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}
                </p>
                <p>
                  <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
                </p>
              </div>
            </div>`)
              break;
            case 2:
              secondList.push(`<div class="leg-item">
              <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)} ${timeOfDay} </div>
              <div class="d-table-cell leg-mode bus">
                <div class="d-table-cell leg-mode-icon">
                  <img class="icon"
                    src="/img/svg/circle-gray-outline-bus.svg">
                </div>
                <p>
                  ${checkIfLate(li.Adherance)}
                  Route ${li.Route} ${li.SegmentDestination}
                  <br>
                  <a href="/home/#ServiceAlerts">
                    <small>view alerts</small>
                  </a>
                </p>
                <p>
                  <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}
                </p>
                <p>
                  <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
                </p>
              </div>
            </div>`)
              break;
            case 3:
              secondList.push(`<div class="leg-item">
              <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)} ${timeOfDay} </div>
              <div class="d-table-cell leg-mode walk">
                <div class="d-table-cell leg-mode-icon">
                  <img class="icon"
                    src="/img/svg/circle-green-outline-pedestrian.svg">
                </div>
                <p>
                  <strong>Walk</strong>${li.WalkTextOverview}
                  <br>
                  <small>(about 6 <abbr title="minutes">min</abbr>)</small>
                </p>
              </div>
            </div>`)
              break;
            case 4:
              secondList.push(`<div class="leg-item">
              <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)} ${timeOfDay} </div>
              <div class="d-table-cell leg-mode walk">
                <div class="d-table-cell leg-mode-icon">
                  <img class="icon"
                    src="/img/svg/alerts-color.svg">
                </div>
                <p>
                  <strong>Walk</strong>${li.WalkTextOverview}
                </p>
              </div>
            </div>`)
              break;
            default:
          };
      });

      $('.tp-results').append(`
        <div class="card mb-4">
        <a class="border" data-toggle="collapse" href="#collapseTrip${i}" role="button" aria-expanded="false" aria-controls="collapseTrip${i}">
          <span class="d-flex" role="link">
            <span class="d-flex align-items-center tp-time">${returnTripTime(l.TripTime)}</span>
            <span class="align-items-center tp-route">${list.join('<img class="icon chevron-right-gray mr-2" src="/img/svg/chevron-right-gray.svg">')}
              <img class="icon icon-arrow-right-blue ml-auto" src="/img/svg/arrow-right-blue.svg">
            </span>
          </span>
        </a>
        </div>

        <div id="collapseTrip${i}" class="collapse" aria-labelledby="">
          <div class="card-body">
            <div class="row flex-row">
                  <div class="col-lg-5">
                    <div class="d-block">
                      `+ secondList.join(" ")+`
                    </div>
                    <div class="clearfix"></div>
                    <hr class="d-block d-lg-none">
                  </div>
                  <div class="col-lg-7">
                    <div class="tp-basemap">
                      <div class="map-container border">
                        <div id="tripPlanMap" class="map" mapType="trip" role="application" aria-label="interactive map of transit trip plan">
                          <div id="trimLocate"></div>
                          <div class="mapLoading"></div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
        `)
    });
  };
  const init = function() {
    // This triggers planning a new trip when the
    // button on the Trip Planner page is clicked
    // TODO: Test for errors in the result
    // TODO: Test for FROM address = TO address
    // TODO: Trigger display of 'No Trips Found' message if error occurs
    //
    $('#collapseTrip0').on('shown.bs.collapse'),function() {
      console.log('Trip 0 open');
    };
    $('#collapseTrip0').on('hidden.bs.collapse'), function() {
      console.log('Trip 0 close');
    };
    $('button[name="planMyTrip"]').click(function () {
      $('#tripPlannerResults').hide();
      var tripFromLocation = AutocompleteAddress.getChoice('fromLocation');
      var userPos = AutocompleteAddress.fetchUserLoc(); // this gets the user GPS location, if you need it
      var tripToLocation = AutocompleteAddress.getChoice('toLocation');
      var dateTime = new Date();
      var selectTimeType = 'Depart';
      var selectTime = $('#selectTime').val();
      if (selectTime === 'arrive-by') {
        selectTimeType = 'Arrive'
      }
      if (selectTime !== 'leave-now') {
        var pickDate = $('#date').val();
        var pickTime = $('#time').val();
        dateTime = pickDate + ' ' + pickTime;
      }
      var walkingDistance = $("input[name='walkingDistance']:checked").val();
      var serviceType = $("input[name='serviceType']:checked").val();
      var convenience = $("input[name='convenience']:checked").val();
      var accessible = $("input[name='accessible']:checked").val();
      if (tripFromLocation && tripToLocation) {
          let tripProperties = {
              fromLocation: tripFromLocation,
              toLocation: tripToLocation,
              xmode: serviceType,
              arrdep: selectTimeType,
              walkdist: walkingDistance,
              minimize: convenience,
              accessible: accessible,
              datetime: dateTime
          };
          newTrip(tripProperties)
              .then(function () {
                  let tripPlan = getTrip();
                  console.log('Have a Plan');
                  console.dir(tripPlan);
                  if (tripPlan.PlannerItin.PlannerOptions.length > 0) {
                    formatTrip(tripPlan)
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
                  console.warn('Trip Plan Failed: ' + err.Message);
                  //console.dir(err);
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
            let tripPlan = getTrip();
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
  };

	return {
    init: init
	};
})(jQuery, window, document);

$(function () {
  TripPlan.init();
});
