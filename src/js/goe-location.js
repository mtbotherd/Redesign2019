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
});