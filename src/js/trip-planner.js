// TripPLan encapsulates the call to generate the trip plan
var TripPlan = (function($, window, document, undefined) {
  var TripPlanJSON = {};
  var MAPLOADED = false;
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
		$("#spinner").removeClass("d-none");
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
					dfd.reject("TripPlan failed - No trip found " + err);
				});

		}).promise();
	};
	const getTrip = function() {
		return TripPlanJSON;
  };
  var returnTime = function(Time,vari){
    let time = new Date(Time);
    let minutes = time.getMinutes();
    minutes = minutes<10 ? '0' + minutes.toString(): minutes.toString();
    let hour = time.getHours();
    let AMPM = hour < 12 ? 'AM' : 'PM';
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
    return hour + ':' + minutes + ' ' + AMPM;
  };
  var formatTimeMonthDay = function(dateString) {
    var d = new Date(dateString);
    var t = returnTime(dateString);
    var dayNames = ["Sunday", "Monday",
      "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday"];
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = d.getDate();  
    return t + ', ' + dayNames[d.getDay()] + ', ' + monthNames[d.getMonth()] + ' ' + day;
  }
  var returnTripTime = function(Time){
    let time = new Date(Time);
    let minutes = time.getMinutes();
    minutes = minutes>0 ? minutes.toString() + ' min' : '';
    let hour = time.getHours();
    if(hour>=1) hour = hour + ' hr';
    else hour = ' ';
    return hour + ' ' + minutes;
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
  var checkIfLate = function(Adherance){
    if(Adherance<0){
      return '<img class="icon blink" src="/img/svg/broadcast-red.svg">&nbsp;<strong>Currently ' 
        + Adherance*-1 + '<abbr title="minutes"> min</abbr> late</strong><br>';
    } else { 
      return ' ';
    }
  };
  const formatTripResults = function(plan) {
    let tripCount = plan.PlannerItin.PlannerOptions.length;
    let tripMsg = 'We found ' + tripCount.toString() + ' trip';
    tripMsg += tripCount > 1 ? 's':'';
    tripMsg += ' for you.';
    $("#trip-result-count").html(tripMsg);
    let tmsg = 'Trips shown are based on your selections and closest ';
    tmsg += plan.ArrDep === 1 ? 'departure to ' : 'arrival to ';
    tmsg += formatTimeMonthDay(plan.ItinDateTime);
    tmsg += '.';
    $("#trip-result-msg").html(tmsg);
      
    $('.tp-results').empty();
    plan.PlannerItin.PlannerOptions.forEach(function(l,i) {
      let tpSummary = [],tpDetail = [];
      l.Segments.forEach(function(li,ii){
        switch (li.SegmentType) {
          case 0:
            tpSummary.push(`<img class="icon bus-gray" src="/img/svg/bus-gray.svg">&nbsp;
            <span class="route mr-2">${li.Route}</span>`)
            break;
          case 1:
            if(li.PublicRoute==="Blue Line"){
              tpSummary.push(`<span class="d-flex align-items-center badge badge-secondary mr-1">
                <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
                <span class="caps">Blue</span>
              </span>`)
            } else if(li.PublicRoute==="Green Line"){
              tpSummary.push(`<span class="d-flex align-items-center badge badge-success mr-1">
                <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
                <span class="caps">Green</span>
              </span>`)
            }
            break;
          case 2:
            tpSummary.push(`<img class="icon" src="/img/svg/circle-gray-outline-train.svg">`)
            break;
          case 3:
            tpSummary.push(`<img class="icon pedestrian-gray" src="/img/svg/pedestrian-gray.svg">`)
            break;
          case 4:
           //tpSummary.push(`<img class="icon" src="/img/svg/pedestrian-gray.svg">`)
           break;
          default:
            console.warn('Invalid segment type: '+ li.SegmentType);
        }
      });
      l.Segments.forEach(function(li,ii){
          let timeOfDay = "";
          switch(li.SegmentType){
            case 0: // Bus
            tpDetail.push(`<div class="leg-item">
            <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)}${timeOfDay}</div>
            <div class="d-table-cell leg-mode bus">
              <div class="d-table-cell leg-mode-icon">
                <img class="icon"
                  src="/img/svg/circle-gray-outline-bus.svg">
              </div>
              <p>
                ${checkIfLate(li.Adherance)}
                <strong>Route ${li.Headsign}</strong><br>
                <a href="/home/#ServiceAlerts">
                  <small>view alerts</small>
                </a>
              </p>
              <p>
                <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}</br>
                <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
              </p>
            </div>
          </div>`)
              break;
            case 1: // Light-Rail
              tpDetail.push(`<div class="leg-item">
              <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)}${timeOfDay}</div>
              <div class="d-table-cell leg-mode metro-${li.PublicRoute.split(" ", 1)}">
                <div class="d-table-cell leg-mode-icon">
                  ${li.PublicRoute==="Green Line"?'<img class="icon" src="/img/svg/circle-green-outline-lrt.svg"/>':'<img class="icon" src="/img/svg/circle-blue-outline-lrt.svg"/>'}
                </div>
                <p>
                  <strong>${li.Headsign}</strong>
                  <br>
                  <a href="/home/#ServiceAlerts">
                    <small>view alerts</small>
                  </a>
                </p>
                <p>
                  <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}</br>
                  <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
                </p>
              </div>
            </div>`)
              break;
            case 2: // Train
            tpDetail.push(`<div class="leg-item">
            <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)}${timeOfDay}</div>
            <div class="d-table-cell leg-mode bus">
              <div class="d-table-cell leg-mode-icon">
              <img class="icon" src="/img/svg/circle-gray-outline-train.svg">
              </div>
              <p>
              ${checkIfLate(li.Adherance)}
              <strong>${li.Headsign}</strong>
                <br>
                <a href="/home/#ServiceAlerts">
                  <small>view alerts</small>
                </a>
              </p>
              <p>
                <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName}</br>
                <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName}
              </p>
            </div>
          </div>`)
              break;
            case 3: // WALK
              tpDetail.push(`<div class="leg-item">
              <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)}${timeOfDay}</div>
              <div class="d-table-cell leg-mode walk">
                <div class="d-table-cell leg-mode-icon">
                  <img class="icon pedestrian-gray"
                    src="/img/svg/circle-green-outline-pedestrian.svg">
                </div>
                <p>${li.WalkTextOverview}
                </p>
              </div>
            </div>`)
              break;
            case 4: // ALERT MESSAGE for USER
              tpDetail.push(`<div class="leg-item">
              <div class="d-table-cell leg-time"></div>
              <div class="d-table-cell leg-mode walk">
                <div class="d-table-cell leg-mode-icon">
                  <img class="icon"
                    src="/img/svg/alerts-color.svg">
                </div>
                <p>${li.WalkTextOverview}</p>
              </div>
            </div>`)
              break;
            default:
          };
	  });
	  
	  $('.tp-results').append(`
		<div id="tripPlan" class="accordion">
			<div class="card">
				<div id="" class="card-header">
					<h3 class="mb-0">
						<button type="button" class="btn d-flex align-items-center btn-block text-left collapsed" data-toggle="collapse" data-target="#collapseTrip${i}" name="thisName${i}" role="button" aria-expanded="false" aria-controls="collapseTrip${i}">
							<span class="d-flex">
								<span class="d-flex align-items-center tp-time">${returnTripTime(l.TripTime)}</span>
								<span class="align-items-center tp-route">${tpSummary.join('<img class="icon chevron-right-gray mr-2" src="/img/svg/chevron-right-gray.svg">')}
									<img class="icon chevron-down-blue ml-auto" src="/img/svg/chevron-down-blue.svg">
								</span>
							</span>
						</button>
					</h3>
				</div>
				<div id="collapseTrip${i}" class="collapse" aria-labelledby="" data-parent="#tripPlan">
				<div class="card-body">
					<div class="row flex-row">
						<div class="col-lg-5">
							<div class="d-block">
							`+ tpDetail.join(" ")+`
							</div>
							<div class="clearfix"></div>
							<hr class="d-block d-lg-none">
						</div>
						<div class="col-lg-7">
							<div class="tp-basemap esrimap${i}">
							</div>
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
        `)

	//   $('.tp-results').append(`
	// 	<div class="card mb-4">
	// 		<a class="border" data-toggle="collapse" href="#collapseTrip${i}" name="thisName${i}" role="button" aria-expanded="false" aria-controls="collapseTrip${i}">
	// 		<span class="d-flex" role="link">
	// 			<span class="d-flex align-items-center tp-time">${returnTripTime(l.TripTime)}</span>
	// 			<span class="align-items-center tp-route">${tpSummary.join('<img class="icon chevron-right-gray mr-2" src="/img/svg/chevron-right-gray.svg">')}
	// 			<img class="icon chevron-down-blue ml-auto" src="/img/svg/chevron-down-blue.svg">
	// 			</span>
	// 		</span>
	// 		</a>
	// 		<div id="collapseTrip${i}" class="collapse" data-parent="#tripPlannerResults" aria-labelledby="tripPlannerResults">
	// 		<div class="card-body">
	// 			<div class="row flex-row">
	// 				<div class="col-lg-5">
	// 					<div class="d-block">
	// 					`+ tpDetail.join(" ")+`
	// 					</div>
	// 					<div class="clearfix"></div>
	// 					<hr class="d-block d-lg-none">
	// 				</div>
	// 				<div class="col-lg-7">
	// 					<div class="tp-basemap esrimap${i}">
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 		</div>
	// 	</div>
    //     `)
    });
    var esriMapDOM = function() {
      return `
        <div class="map-container border">
          <div id="tripPlanMap" class="map" mapType="trip" role="application" aria-label="interactive map of transit trip plan">
            <div id="trimLocate"></div>
            <div class="mapLoading"></div> 
          </div>
        </div> 
      `;
    };
    $("#collapseTrip0").on('hide.bs.collapse', function(){
      if (MAPLOADED) {
        TRIM.destroy();
        $('.esrimap0').empty();
        MAPLOADED = false;
      }
    });    
    $("#collapseTrip0").on('shown.bs.collapse', function(){
      $('.esrimap0').append(esriMapDOM);
      TRIM.init("tripPlanMap").then(function () {
        MAPLOADED = true;
        TRIM.drawTrip(0, getTrip(), /*zoom*/ true);
      });
    });
    $("#collapseTrip1").on('hide.bs.collapse', function(){
      if (MAPLOADED) {
        TRIM.destroy();
        $('.esrimap1').empty();
        MAPLOADED = false;
      }
    });    
    $("#collapseTrip1").on('shown.bs.collapse', function(){
      $('.esrimap1').append(esriMapDOM);
      TRIM.init("tripPlanMap").then(function () {
        MAPLOADED = true;
        TRIM.drawTrip(1, getTrip(), /*zoom*/ true);
      });
    });
    $("#collapseTrip2").on('hide.bs.collapse', function(){
      if (MAPLOADED) {
        TRIM.destroy();
        $('.esrimap2').empty();
        MAPLOADED = false;
      }
    });    
    $("#collapseTrip2").on('shown.bs.collapse', function(){
      $('.esrimap2').append(esriMapDOM);
      TRIM.init("tripPlanMap").then(function () {
        MAPLOADED = true;
        TRIM.drawTrip(2, getTrip(), /*zoom*/ true);
      });
    });
  };
  const init = function() {
    const DestroyAllMaps = function() {
      if (MAPLOADED) {
        TRIM.destroy();
        MAPLOADED = false;
      }
    }
    $('button[name="planMyTrip"]').click(function () {
      $('#tripPlannerResults').hide();
      DestroyAllMaps();

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
        dateTime = new Date(pickDate + ' ' + pickTime);
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
                  console.dir(tripPlan);
                  if (tripPlan.PlannerItin.PlannerOptions.length > 0) {
                    formatTripResults(tripPlan)
                    $('.trips-found').show();
					$('.no-trips-found').hide();
					$('#spinner').addClass('d-none')
                    $('#planTrip').hide('slow');
                    $('#tripPlannerResults').show();
                  } else {
                    $('.trips-found').hide();
					$('.no-trips-found').show();
                    $('#tripPlannerResults').show();
                  }
              })
              .fail(function (err) {
                  console.warn('Trip Plan Failed: ' + err.Message);
                  $('.trips-found').hide();
                  $('.no-trips-found').show();
                  $('#tripPlannerResults').show();
              });
      }
    });
  };

  $("#editMyTrip").on('click', function(){
    $('#tripPlannerResults').hide('slow');
    $('#planTrip').show('slow');
  });

	return {
    init: init
	};
})(jQuery, window, document);

$(function () {
  TripPlan.init();
});
