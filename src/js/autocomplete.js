// *******************************************
// autocomplete.js
//
// module to handle using geocoder suggestions
// as results of an autocomplete field input
//
// dependencies: jquery.autocomplete.js
// GIS service on arcgis.metc.state.mn.us
// ____________________________________________
"use strict";
var AutocompleteAddress = (function($, window, document, undefined) {
  var inputResults = {};
  var USERLOC = null;
  //format USERLOC = { 'LatLon': { 'x': -93, 'y': 45, 'spatialReference': { 'wkid': 4326 }}, 
  //                    'UTM': { 'x': 49999, 'y': '4979999', 'spatialReference': { 'wkid': 26915}} }

  // fetchUserLoc returns the location we already loaded 
  // using 'getUserLocation' when the application started
  var fetchUserLoc = function() {
    return USERLOC;
    };
  // getUserLocation returns a PROMISE while determining the user's location 
  // If the user does not run the app with 'HTTPS' or the user chooses not
  // to reveal their location, the routine returns 'fail'.
  // User location is stored in USERLOC having both Lat/Lon and UTM coordinates.
  var getUserLocation = function() {
    return $.Deferred(function(dfd){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            var UTMxy=[];
            CoordinateConversion.LatLonToUTMXY(
              CoordinateConversion.DegToRad(position.coords.latitude), 
              CoordinateConversion.DegToRad(position.coords.longitude), 
              15, UTMxy);
            USERLOC = {
              LatLon:  {
                x: position.coords.longitude,
                y: position.coords.latitude,
                spatialReference: { wkid: 4326 }
              },
              UTM: {
                x: UTMxy[0],
                y: UTMxy[1],
                spatialReference: { wkid: 26915 }
              }
          };
            dfd.resolve(USERLOC);
          },
          function(error) {
            console.warn("getLocation failed: " + error);
            dfd.reject('Geolocation unavailable');
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        dfd.reject('Geolocation unavailable');
      }
    }).promise();
  };
    var deleteChoice = function (/*string*/ inputDiv) {
        delete inputResults[inputDiv];
        $("#planMyTrip").attr('disabled', 'disabled');
    };
  /* ===========================================================================
		addressAutoComplete
		Parms:
			inputDiv is a string with ID name of the input element 
			UTMout is a boolean - if true, coordinates for the address are
				returned in UTM projection (needed for Trip Planner), otherwise
				coordinates are geographic WGS84 Lat/Long
	============================================================================*/
  var init = function(
    /*string*/ inputDiv,
    /*boolean*/ UTMout,
    /*object*/ userPosition,
    /*function*/ callback
  ) {
    const LOCATOR = // trailing slash on URL is IMPORTANT
      "https://arcgis.metc.state.mn.us/transit/rest/services/mt_suggest/GeocodeServer/";
    $("#" + inputDiv).devbridgeAutocomplete({
      noCache: true,
      autoSelectFirst: true,
      minChars: 1,
      showNoSuggestionNotice: true,
      noSuggestionNotice: 'No results',
      width: "flex",
            onInvalidateSelection: function(params) {
                deleteChoice(inputDiv);
                $("#" + inputDiv).val('');
             },
      lookup: function(query, returnSuggestions) {
        $.ajax({
          type: "get",
          url: LOCATOR + "suggest",
          data: {
            Text: query.replace(/[.,\/#!$%\^\*;:{}=\_`~()]/g, ""),
            maxSuggestions: 10,
            location: userPosition ? JSON.stringify(userPosition.LatLon) : null,
            distance: userPosition ? 4000 : null, // meters ~ 2.5 miles
            f: "json"
          },
          dataType: "json"
        })
          .done(function(r) {
            returnSuggestions({
              suggestions: $.map(r.suggestions, function(c) {
                return { value: c.text, data: c.magicKey };
              })
            });
          })
          .fail(function(e) {
            console.warn("Address locator failed for: " + query);
          });
      },
      onSelect: function(suggest) {
        $.ajax({
          type: "get",
          url: LOCATOR + "findAddressCandidates",
          data: {
            SingleLine: suggest.value,
            outFields: "Addr_type, LongLabel, PlaceName, Place_addr, ATIS_ID",
            maxLocations: 6,
            magicKey: suggest.data,
            outSR: UTMout ? 26915 : 4326,
            f: "json"
          },
          dataType: "json"
        })
          .done(function(r) {
            if (r.error) {
              console.warn(
                "Call to FindCandidate failed for: " + suggest.value
              );
            } else {
              if (r.candidates.length > 0) {
                var choice = r.candidates[0];
                //console.log(inputDiv + ": " + JSON.stringify(choice));
                inputResults[inputDiv] = choice;
                if (callback) callback();
              }
            }
          })
          .fail(function(e) {
            console.warn("Call to FindCandidate failed for: " + suggest.value);
          });

      }
    });

  };
  // Autocomplete results (user's last choice) are stored with a 
  // key field equal to the id of the input div.
  var getChoice = function(/*string*/ inputDiv) {
    return inputResults[inputDiv];
  };
  // This is a special function to support swapping the 
  // from/to location choices for the trip planner entry
  var exchangeValues = function(inputDiv1, inputDiv2) {
    let t = inputResults[inputDiv1];
    inputResults[inputDiv1] = inputResults[inputDiv2];
    inputResults[inputDiv2] = t;
    };

  return {
    init: init,
    getChoice: getChoice,
    deleteChoice: deleteChoice,
    fetchUserLoc: fetchUserLoc,
    getUserLocation: getUserLocation,
    exchangeValues: exchangeValues
  };
})(jQuery, window, document);

// ==========================================================================
// Here are the routines that set the INPUT fields to use the
// ADDRESS AUTOCOMPLETE function defined above.
//
// First it tries to establish the user location using the 
// device or web browser location. If successful, this position
// is used to obtain geocoder results in geospatial order relative
// to the user's position.
// If no position is passed because it could not be gotten,
// the geocoder returns results in alphabetic order.
//
// For the trip planner, both TO and FROM need be set
// for validation.
// ===========================================================================

AutocompleteAddress.getUserLocation()
.then(function(userPos){
  // TripPlanner input fields
        AutocompleteAddress.init("fromLocation", /*UTMout*/ true, userPos,
            function () {
                if (AutocompleteAddress.getChoice("toLocation")) {
                    $("#planMyTrip").removeAttr('disabled');
                }
  });
        AutocompleteAddress.init("toLocation", /*UTMout*/ true, userPos,
            function () {
                if (AutocompleteAddress.getChoice("fromLocation")) {
                    $("#planMyTrip").removeAttr('disabled');
                }
  });
  // This one loads the Search field in the schedules-maps page -- the search result
  // automatically sets the map to zoom to the requested location
  AutocompleteAddress.init("interactiveMapSearch",/*UTMout*/ false,userPos,
    function() {
      var choice = AutocompleteAddress.getChoice("interactiveMapSearch");
      TRIM.centerMarkerAtPoint(choice.location.x, choice.location.y);
    }
  );
  AutocompleteAddress.init("stopsStationsSearch",/*UTMout*/ true, userPos,
    function() {
      var choice = AutocompleteAddress.getChoice("stopsStationsSearch");
      StopServices.formatPage(choice);
    }
  );
  AutocompleteAddress.init("parkRidesSearch",/*UTMout*/ true, userPos,
    function() {
      var choice = AutocompleteAddress.getChoice("parkRidesSearch");
      ParkRideServices.formatPage(choice);
    }
  );
})
// we can't find the user's position so we'll return results 
// in alphabetic order
.fail(function(err) {
  // TripPlanner input fields
        AutocompleteAddress.init("fromLocation", /*UTMout*/ true, /*userPos*/null,
            function () {
                if (AutocompleteAddress.getChoice("toLocation")) {
                    $("#planMyTrip").removeAttr('disabled');
                }
            });
        AutocompleteAddress.init("toLocation", /*UTMout*/ true, /*userPos*/null,
            function () {
                if (AutocompleteAddress.getChoice("fromLocation")) {
                    $("#planMyTrip").removeAttr('disabled');
                }
            });
  // This one loads the Search field in the schedules-maps page -- the search result
  // automatically sets the map to zoom to the requested location
  AutocompleteAddress.init("interactiveMapSearch",/*UTMout*/ false,/*userPos*/ null,
    function() {
      var choice = AutocompleteAddress.getChoice("interactiveMapSearch");
      TRIM.centerMarkerAtPoint(choice.location.x, choice.location.y);
    }
  );
  AutocompleteAddress.init("stopsStationsSearch",/*UTMout*/ true, /*userPos*/ null,
    function() {
      var choice = AutocompleteAddress.getChoice("stopsStationsSearch");
      StopServices.formatPage(choice);
    }
  );
  AutocompleteAddress.init("parkRidesSearch",/*UTMout*/ true, /*userPos*/null,
    function() {
      var choice = AutocompleteAddress.getChoice("parkRidesSearch");
      ParkRideServices.formatPage(choice);
    }
  );
});
