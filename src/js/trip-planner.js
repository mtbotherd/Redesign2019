// TripPLan encapsulates the call to generate the trip plan
var TripPlan = (function($, window, document, undefined) {
	var TripPlanJSON = {};
	var MAPLOADED = false;
    var convertDateTimeToDotNet = function (ticks) {
        return 621355968000000000 + ticks * 10000;
    };
    //var convertUTCDateToLocalDate = function (date) {
    //    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    //    var offset = date.getTimezoneOffset() / 60;
    //    var hours = date.getHours();

    //    newDate.setHours(hours - offset);

    //    return newDate;
    //};
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
			  //console.log("Lets go tripping from " + tripProperties.fromLocation.address + " to " +  tripProperties.toLocation.address);
            //let datetime = new Date(tripProperties.datetime);
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
			  if (tripProperties.fromLocation.attributes.ATIS_ID.indexOf(';') > -1) {
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
			  if (tripProperties.toLocation.attributes.ATIS_ID.indexOf(';') > -1) {
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
                //'datetime': convertDateTimeToDotNet(convertUTCDateToLocalDate(tripProperties.datetime))
                'datetime': convertDateTimeToDotNet(tripProperties.datetime)
			  };
            //console.dir(tripData);
			  $.ajax({
				  type: 'get',
				  url: 'https://wwwtest.metrotransit.org/Services/TripPlannerSvc.ashx',
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

    var returnTripTime = function (Time) {
        let time = new Date(Time);
        let minutes = time.getMinutes();
	  minutes = minutes>0 ? minutes.toString() + 'm' : '';
        let hour = time.getHours();
	  if(hour>=1) hour = hour + 'h';
        else hour = ' ';
        return hour + ' ' + minutes;
    };
    var returnTime = function (Time) {
        return moment(Time).format('h:mm A');
    };
	var listFunction = function(li,i,ii,vari,initTime){
	  //console.log(li,i,ii,vari,initTime)
        if (li.Segments[ii].SegmentType === 3 && ii === 0) return returnTime(initTime);
	  	else if(li.Segments[ii].SegmentType===3){
			let io = ii-1;
            return returnTime(li.Segments[io].OffTime);
		}
        else if (li.length === ii) return returnTime(li.Segments[ii].OffTime);
        else return returnTime(li.Segments[ii].OnTime);
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
	  tripMsg += ' for you';
	  $("#trip-result-count").html(tripMsg);
	  let tmsg = 'Trips shown are based on your selections and closest ';
        tmsg += plan.ArrDep === 1 ? 'departure to ' : 'arrival to ';
        tmsg += moment(plan.ItinDateTime).format('h:mm A, ddd, MMM D');
	  tmsg += '.';
        //tmsg += ' Travel time estimates do not include walking time.';
	  $("#trip-result-msg").html(tmsg);
		
	  $('.tp-results').empty();
	  plan.PlannerItin.PlannerOptions.forEach(function(l,i) {
		let tpSummary = [],tpDetail = [];
		let tpArriveTime = null; // we set this to the arrive time of the last trip segment
		let tpWalkTime = 0;
		l.Segments.forEach(function(li,ii){
		  switch (li.SegmentType) {
			case 0:
			  let displayName = li.Route;
			  if (li.Route === "921") {
				  displayName = "A Line";
			  } else if (li.Route === "923") {
				  displayName = "C Line";
			  } else if (li.Route === "903") {
				  displayName = "Red Line";
			  }
			  tpSummary.push(`<img class="icon bus-gray" src="/img/svg/bus-gray.svg">
			                            <span class="route">${displayName}</span>`);
			  break;
			case 1:
			  if(li.Route==="901"){
				tpSummary.push(`<span class="badge badge-secondary">
				  <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
				  <span class="caps">Blue</span>
				            </span>`);
			  } else if(li.Route==="902"){
				tpSummary.push(`<span class="badge badge-success">
				  <img class="icon icon-lrt-white" src="/img/svg/lrt-white.svg">
				  <span class="caps">Green</span>
				            </span>`);
			  }
			  break;
			case 2:
                        tpSummary.push(`<img class="icon" src="/img/svg/circle-gray-outline-train.svg">`);
			  break;
			case 3:
                        tpSummary.push(`<img class="icon pedestrian-gray" src="/img/svg/pedestrian-gray.svg">`);
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
					<img class="icon" src="/img/svg/circle-gray-outline-bus.svg" alt="Bus">
					</div>
					<p>
					${checkIfLate(li.Adherance)}
					<strong>Route ${li.Headsign}</strong><br>
				              <a href="/rider-alerts"><small>View alerts</small></a>
					</p>
					<p>
					<strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName} at <strong> ${returnTime(li.OnTime)} </strong></br>
					<strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName} at <strong> ${returnTime(li.OffTime)} </strong>
					</p>
				</div>
				</div>`);
				tpArriveTime = li.OffTime;
				break;
			  case 1: // Light-Rail
				tpDetail.push(`<div class="leg-item">
				<div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)}${timeOfDay}</div>
				<div class="d-table-cell leg-mode metro-${li.PublicRoute.split(" ", 1)}">
				  <div class="d-table-cell leg-mode-icon">
					${li.PublicRoute==="Green Line"?'<img class="icon" src="/img/svg/circle-green-outline-lrt.svg" alt="Green Line"/>':'<img class="icon" src="/img/svg/circle-blue-outline-lrt.svg" alt="Blue Line"/>'}
				  </div>
				  <p>
					<strong>${li.Headsign}</strong>
					<br>
					            <a href="/rider-alerts"><small>View alerts</small></a>
				  </p>
				  <p>
					<strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName} at <strong> ${returnTime(li.OnTime)} </strong></br>
					<strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName} at <strong> ${returnTime(li.OffTime)} </strong>
				  </p>
				</div>
				 </div>`);
				 tpArriveTime = li.OffTime;
				break;
			  case 2: // Train
			  tpDetail.push(`<div class="leg-item">
			  <div class="d-table-cell leg-time">${listFunction(l,i,ii,timeOfDay,plan.ItinDateTime)}${timeOfDay}</div>
			  <div class="d-table-cell leg-mode bus">
				<div class="d-table-cell leg-mode-icon">
				<img class="icon" src="/img/svg/circle-gray-outline-train.svg" alt="Train">
				</div>
				<p>
				${checkIfLate(li.Adherance)}
				<strong>${li.Headsign}</strong>
				  <br>
				              <a href="/rider-alerts"><small>View alerts</small></a>
				</p>
				<p>
				  <strong>Depart</strong> from ${li.OnStop.StopLocation.LocationName} at <strong>${returnTime(li.OnTime)}</strong></br>
				  <strong>Arrive</strong> at ${li.OffStop.StopLocation.LocationName} at <strong>${returnTime(li.OffTime)}</strong>
				</p>
			  </div>
				</div>`);
				tpArriveTime = li.OffTime;
				break;
			  case 3: // WALK
				tpDetail.push(`<div class="leg-item">
				<div class="d-table-cell leg-time"></div>
				<div class="d-table-cell leg-mode walk">
				  <div class="d-table-cell leg-mode-icon">
					<img class="icon pedestrian-gray"
					  src="/img/svg/circle-green-outline-pedestrian.svg">
				  </div>
				  <p>${li.WalkTextOverview}
				  </p>
				</div>
				</div>`);
				if (li.isLastSegment === true) {tpWalkTime = 10;}
				break;
			  case 4: // ALERT MESSAGE for USER
				tpDetail.push(`<div class="leg-item">
				<div class="d-table-cell leg-time"></div>
				<div class="d-table-cell leg-mode walk">
				  <div class="d-table-cell leg-mode-icon">
					<img class="icon"
					  src="/img/svg/alerts-color.svg" alt="Alert">
				  </div>
				  <p>${li.WalkTextOverview}</p>
				</div>
			    </div>`);
				break;
			  default:
                }
		});
		// Add a line at the bottom of the plan to show time arriving at the ultimate location
		if (tpWalkTime > 0) {
                tpArriveTime = moment(tpArriveTime).add(tpWalkTime, 'minutes');
		}
		let tpFare = l.RegularFare.toFixed(2);
		let tpRFare = l.SeniorFare.toFixed(2);
		tpDetail.push(`
			<div class="leg-item">
				<div class="d-table-cell leg-time">${returnTime(tpArriveTime)}</div>
				<div class="d-table-cell leg-mode arrive">
					<div class="d-table-cell leg-mode-icon">
						<img class="icon circle-red-outline-pin" src="/img/svg/circle-red-outline-pin.svg" alt="Marker">
					</div>
					<p>Arrive at ${plan.ToAddress.Address}</p>
				</div>
			</div>
            <div class="p-2">
               <hr>
                <div class="mr-auto d-flex trip-plan-cost align-items-center">
                  <img src="img/svg/circle-green-dollar.svg" class="icon mx-2"/>
                  <div>
                    <h4>Regular Fare $${tpFare}</h4>
                    <h4>Reduced Fare $${tpRFare}</h4> 
                  </div>
                 </div>
            </div>
		`);
		$('.tp-results').append(`
			  <div class="card mb-4" data-child="collapseTrip${i}" >
				  <div id="" class="card-header">
						<button type="button" class="btn d-flex align-items-center btn-block text-left collapsed" data-toggle="collapse" data-target="#collapseTrip${i}" name="thisName${i}" role="button" aria-expanded="false" aria-controls="collapseTrip${i}">
							<span class="d-flex w-100">
								<span class="d-flex align-items-center tp-time">${returnTripTime(l.TripTime)}</span>
								<span class="d-flex align-items-center tp-route">
									<span class="tp-route-summary">${tpSummary.join('<img class="icon chevron-right-gray" src="/img/svg/chevron-right-gray.svg">')}</span>
									<img class="icon chevron-down-blue align-items-center ml-auto" src="/img/svg/chevron-down-blue.svg">
								</span>
							</span>
						</button>
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
		  `);

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
                TRIM.drawTrip(0, plan, /*zoom*/ true);
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
                TRIM.drawTrip(1, plan, /*zoom*/ true);
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
                TRIM.drawTrip(2, plan, /*zoom*/ true);
		});
	  });
	};
	const init = function() {
	  const DestroyAllMaps = function() {
		if (MAPLOADED) {
		  TRIM.destroy();
		  MAPLOADED = false;
		}
        };
	  $('button[name="planMyTrip"]').click(function () {
		$('#tripPlannerResults').hide();
		DestroyAllMaps();
  
		var tripFromLocation = AutocompleteAddress.getChoice('fromLocation');
		var tripToLocation = AutocompleteAddress.getChoice('toLocation');

		var selectTimeType = 'Depart';
		var selectTime = $('#selectTime').val();
		if (selectTime === 'arrive-by') {
                selectTimeType = 'Arrive';
		}
            var dateTime = moment.utc(moment().format('YYYY/MM/DD HH:mm'));
            //var dateTime = moment();
		if (selectTime !== 'leave-now') {
		  var pickDate = $('#date').val();
		  var pickTime = $('#time').val();
                dateTime = moment.utc(pickDate + ' ' + pickTime);
                //dateTime = moment(pickDate + ' ' + pickTime);
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
                        let tripPlan = TripPlanJSON;
                        sessionStorage.setItem('tripJSON', JSON.stringify(TripPlanJSON));
                        if (tripPlan.PlannerItin.PlannerOptions.length > 0) {
                            formatTripResults(tripPlan);
                            $('.trips-found').show();
                            $('.no-trips-found').hide();
                            $('#spinner').addClass('d-none');
                            $('#planTrip').hide('slow');
                            $('#tripPlannerResults').show();
                        } else {
                            // clear previous results
                            $("#trip-result-count").html(''); 
                            $("#trip-result-msg").html('');
                            $('.tp-results').empty();
                            // show error message
                            $('.trips-found').show();
                            $('.no-trips-found').show();
                            // remove busy spinner
                            $('#spinner').addClass('d-none');
                            $('#planTrip').hide('slow');
					  $('#tripPlannerResults').show();
					}
				})
				.fail(function (err) {
					console.warn('Trip Plan Failed: ' + err.Message);
                        // clear previous results
                        $("#trip-result-count").html('');
                        $("#trip-result-msg").html('');
                        $('.tp-results').empty();
                        // show error message
                        $('.trips-found').show();
                        $('.no-trips-found').show();
                        // remove busy spinner
                        $('#spinner').addClass('d-none');
                        $('#planTrip').hide('slow');
					$('#tripPlannerResults').show();
				});
		}
	  });
	  
	  $(".location-toggler").click(function() {
		var inputs = $(".from-location, .to-location"),tmp,loctmp;
		  tmp = inputs[0].value;
		  inputs[0].value = inputs[1].value;
		  inputs[1].value = tmp;
		  AutocompleteAddress.exchangeValues("fromLocation", "toLocation");
	  });
  
	  $("#tpUseCurrentLoc").click(function(){
		  let userLoc = AutocompleteAddress.setUserLoc('fromLocation');
		  if (userLoc) { 
			  $("#fromLocation").val("Current Location");
		  }
	  });
  
	  $(".time-elements").hide();
	  $("#selectTime").on("change", function () { 
		  // time & date inputs
		  if (this.value === "depart-at" || this.value === "arrive-by") {
			$("#date").val(moment().format('YYYY-MM-DD'));
			$("#time").val(moment().format('HH:mm'));
			  $(".time-elements").slideDown();
		  } else {
			  $(".time-elements").slideUp();
		  }
	  });
	  $(function () { $("#planMyTrip").attr('disabled', 'disabled'); });

	  AutocompleteAddress.init("fromLocation", /*UTMout*/ true,
		  function () {
			  if (AutocompleteAddress.getChoice("toLocation")) {
				  $("#planMyTrip").removeAttr('disabled');
			  }
		  });
	  AutocompleteAddress.init("toLocation", /*UTMout*/ true,
		  function () {
			  if (AutocompleteAddress.getChoice("fromLocation")) {
				  $("#planMyTrip").removeAttr('disabled');
			  }
		  });
		$("#editMyTrip").on('click', function(){
			$('#tripPlannerResults').hide('slow');
			$('#planTrip').show('slow');
			sessionStorage.clear();
		});
		$("#startTripOver").on('click', function() {
			$('#tripPlannerResults').hide('slow');
			$('#planTrip').show('slow');
			sessionStorage.clear();
			$('#tripPlannerResults').hide();
			DestroyAllMaps();
			AutocompleteAddress.deleteChoice('fromLocation');
			$('#fromLocation').val('');
			AutocompleteAddress.deleteChoice('toLocation');
			$('#toLocation').val('');
			$(".time-elements").hide();
			$('#selectTime').val('leave-now');
            $('#tpMoreOptions').collapse('hide');
		});
    };

    const refreshTrip = function (storedTrip) {
        if (storedTrip) {
            let tripPlan = JSON.parse(storedTrip);
            if (tripPlan.PlannerItin.PlannerOptions.length > 0) {
                formatTripResults(tripPlan);
                $('.trips-found').show();
                $('.no-trips-found').hide();
                $('#spinner').addClass('d-none');
                $('#planTrip').hide('slow');
                $('#tripPlannerResults').show();
            }
        }
	};
  
	return {
		init: init,
		refreshTrip: refreshTrip
	};
  })(jQuery, window, document);

  $(function () {
	if ($('#planMyTrip').length) {
  		TripPlan.init();
        let x = sessionStorage.getItem('tripJSON');
        if (x) {
            TripPlanJSON = JSON.parse(x);
            TripPlan.refreshTrip(x);
  		}
    }
  });