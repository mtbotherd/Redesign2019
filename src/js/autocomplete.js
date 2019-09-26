// These are two globals used by functions here and 
// in the TRIM.js file
var TRIPFROMLOCATION = null;
var TRIPTOLOCATION = null;
$(function() {
	"use strict";

	function getUserLocation() {
		var location = null;
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
			location = {
				x: position.coords.longitude,
				y: position.coords.latitude,
				spatialReference: { wkid: 4326 }
			};
			},
			function(error) {
			console.warn("getLocation failed: " + error);
			},
			{
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
			}
		);
		}
		return location;
	}

	/***********************************************
				Begin Autocomplete
		***********************************************/
	//
	//  Get current location
	//
  
	/* ===========================================================================
		   addressAutoComplete
		   Parms:
			   inputDiv is a string with ID name of the input element 
			   UTMout is a boolean - if true, coordinates for the address are
				   returned in UTM projection (needed for Trip Planner), otherwise
				   coordinates are geographic WGS84 Lat/Long
	   ============================================================================*/
	   var addressAutoComplete = function(/*string*/ inputDiv, /*boolean*/ UTMout) {
		const LOCATOR =
		  "https://arcgistest.metctest.state.mn.us/transit/rest/services/metro_transit/GeocodeServer/";
		let myLocation = getUserLocation();
		$("#" + inputDiv).devbridgeAutocomplete({
		  noCache: true,
		  autoSelectFirst: true,
		  minChars: 1,
		  width: "flex",
		  lookup: function(query, returnSuggestions) {
			$.ajax({
			  type: "get",
			  url: LOCATOR + "suggest",
			  data: {
				Text: query.replace(/[.,\/#!$%\^\*;:{}=\_`~()]/g, ""),
				maxSuggestions: 10,
				location: myLocation ? JSON.stringify(myLocation) : null,
				distance: myLocation ? 4000 : null, // meters ~ 2.5 miles
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
					console.log(inputDiv + ": " + JSON.stringify(choice));
					if (inputDiv === "fromLocation") {
					  TRIPFROMLOCATION = choice;
					}
					if (inputDiv === "toLocation") {
					  TRIPTOLOCATION = choice;
					}
					if (inputDiv === "schedulesMaps") {
					  TRIM.centerMarkerAtPoint(
						choice.location.x,
						choice.location.y
					  );
					}
				  }
				}
			  })
			  .fail(function(e) {
				console.warn("Call to FindCandidate failed for: " + suggest.value);
			  });
		  }
		});
	  };
	  // =========================================================
	  // Here are the routines that set the INPUT field to use the
	  // ADDRESS AUTOCOMPLETE function defined above.
	  //
	  // Each routine passes the result of the autocomplete
	  // to a global variable (UPPERCASE).
	  //
	  // For the trip planner, both TO and FROM need be set
	  // for validation.
	  //
	  // This one handles the 'fromLocation' for the Trip Planner

	  addressAutoComplete("fromLocation", /*UTMout*/ true);
	  // This one handles the 'toLocation' for the Trip Planner
	  addressAutoComplete("toLocation", /*UTMout*/ true);
	  // This one loads the Search field in the schedules-maps page -- the search result
	  // automatically sets the map to zoom to the requested location
	  addressAutoComplete("schedulesMaps", /*UTMout*/ false);
	});
	