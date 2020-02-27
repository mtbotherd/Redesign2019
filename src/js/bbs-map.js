var bbsMap = (function($, window, document, undefined) {
	'use strict';
	var MAP = null; // this is the main MAP object
	var GEOLOCATE = null; // this is the locate button object
	const TRIM_MapServer =
		'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer';

	var _bubbleSort = function(inputArr) {
		var swapped;
		do {
			swapped = false;
			for (let i = 0, l = inputArr.length; i < l; i++) {
				if (inputArr[i] > inputArr[i + 1]) {
					let tmp = inputArr[i];
					inputArr[i] = inputArr[i + 1];
					inputArr[i + 1] = tmp;
					swapped = true;
				}
			}
		} while (swapped);
		return inputArr;
	};
	var _isValue = function(x) {
		// tests if value is NOT empty AND NOT blank and NOT NULL
		var str = x.toString(); // this allows zero to test as a valid value
		//console.write("test value is " + x)
		if (str) {
			return /\S/.test(str);
		}
		return false;
	};
	var _isNumber = function(x) {
		// tests if value is any sort of number with +/- or decimals
		if (_isValue(x)) {
			return !isNaN(x - 0);
		}
		return false;
	};
	var zoomToBBox = function(/*string*/ parm) {
		require(['esri/geometry/Extent'], function(Extent) {
			//console.log("zoomToBBox says: " + setBBoxURL_value);
			if (parm) {
				var newE;
				var e = parm.split(',');
				if (e.length === 4) {
					if (
						_isNumber(e[0]) &&
						_isNumber(e[1]) &&
						_isNumber(e[2]) &&
						_isNumber(e[3])
					) {
						newE = new Extent({
							xmin: parseFloat(e[1]),
							ymin: parseFloat(e[0]),
							xmax: parseFloat(e[3]),
							ymax: parseFloat(e[2]),
							spatialReference: MAP.spatialReference,
						});
						MAP.setExtent(newE, /*fit?*/ true);
					}
				} else if (e.length === 2) {
					if (_isNumber(e[0]) && _isNumber(e[1])) {
						newE = new Extent({
							xmin: parseFloat(e[1]),
							ymin: parseFloat(e[0]),
							xmax: parseFloat(e[1]) + 2,
							ymax: parseFloat(e[0]) + 2,
							spatialReference: MAP.spatialReference,
						});
						MAP.setExtent(newE, /*fit?*/ true);
					}
				}
			}
		});
	};
	/* ==============================================================================
	 * External Called Functions
	 *
	 * These all need to be available from the outside
	 * ==============================================================================
	 */
	// this is the external call to have the map zoom to the user's location
	var geoLocate = function() {
		GEOLOCATE.locate();
	};
	var centerMarkerAtPoint = function(
		/*float*/ x,
		/*float*/ y,
		/*int*/ zoomLevel
	) {
		// x = longitude, y = latitude
		var level = typeof zoomLevel !== 'undefined' ? zoomLevel : null;
		MAP.graphics.clear();
		require([
			'esri/graphic',
			'esri/geometry/Point',
			'esri/symbols/PictureMarkerSymbol',
		], function(Graphic, Point, PictureMarkerSymbol) {
			var p = new Point(x, y);
			var g = new Graphic();
			g.setGeometry(p);
			//var stopSymbol = new PictureMarkerSymbol('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjBBNTJGNjgyMTgxMUUzOUU5OUI1RjJEQjVCRkE0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjk3MjdFNDgyMTgxMUUzOUU5OUI1RjJEQjVCRkE0QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCMEE1MkY0ODIxODExRTM5RTk5QjVGMkRCNUJGQTRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVCMEE1MkY1ODIxODExRTM5RTk5QjVGMkRCNUJGQTRDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Mp+ygwAAA2VJREFUeNqsVs9PU0EQ3vejVLEoUhAQUOMFCIn1YVJ6MHLzRk3gbEpMkIjGu/8Fh1ZN0JrGM2n0wMGjF8REbKuJ8WJEQ4vFKAGFltI+Z5rZZljfg4JO8uX1bd/ut7M7881owt00lyf/bbMxm73bboua+xBJ6Oy3SqiiomxiT0K+qM5gKO98wQqhTE+Nno7emg5kGiMxFRjMW8HIdhSU2QZ2kZoOZAbBA2hQwEltRlYCbDOUmCO7SNUjlZ7h4l7AEcBRenojkUjP2NjYYHt7ewd+nM/nc8lk8k08Hv8CrwUFwo1UHqFJCx8HnAKcAwwAgtPT03ez2exioVCwEa8//6hCvudyucVoNHobvrUAvYBugB/go40b8hrUO2sg0kZAE2J+fn7Ssqzxl0sbIvpqRTz/+HPX1sO9J8WdUIe4crZJZDKZeDAYvA/Dvwhb5G2J7tTWWOSZCtkJILuFZBPPPomn6e9iL7seaBUz186LdDodHxoaisHQOpFu0r1Wg8lggWKS+3hnPjjGyyMjI/fqIUPLfNsUS2tFMTHcb3V2dmbm5uayLFplxNqcDI/zGN1hM9zZw/cbHutq4oM4iL2I9IsB33aqq6vrJryukac1L3WWFrXcw2hsaWmx8M4OajjH7/dfHB8f7yEnPCxoNF1JiSophj4OqAFSj8k5o6Ojl5S81YWLRuqYZ5mVTXFYw7ltbW2nneRQd/jeFv/fbE6oKn0FFeRCR+OhV8e5q6urWaa1tdKlO6j+DsqVTOqDmpwzOzu7yIS8wmXNYCojk74Z5Grm3br5L2kxqaRFUaaFdLdMO8J8KcAOH6NcoYLUa/gtzoETekSSVlS9NJTyVIsqUIp8OBz2TAz3WaggqCT1SFsqlXoCKZGEod/Ms5K8MrUOekjeGknpfQsLC1OBQOBGPeKNZKFQ6AEMbzAdLTLxrvBqbxCZj0pLN5WawVgsNrW8vPzWrTzhf1SeMNn7AGcArRQPXt4paA5Hyj2VBbhahFGuUEEoqauhj9GYSCS+0p1tsZIkPdvhqaE59DS6Q4vhVdoMnVVy2WIUCbLF4MdYcWoxbKUdUBc0mRBzwjJrnkpKI2WryqW59KWqtzrLV11RKN4mltlvx8ZYq6Pr1h2ewqERrrg0xmI/D/frwt3E2XZo/f+yPwIMACLRpTLsc+73AAAAAElFTkSuQmCC', 30, 30);
			// MyGPS_location.png the blue dot
			var stopSymbol = new PictureMarkerSymbol(
				'/img/svg/map-icons/pin-red.svg',
				20,
				24
			);
			stopSymbol.setOffset(0, 15);
			g.setSymbol(stopSymbol);
			MAP.graphics.add(g);
			MAP.centerAt(p).then(function() {
				if (level) {
					MAP.setLevel(level);
				}
			});
		});
	};
	var toggleLayer = function(/*string*/ layer, /*integer*/ zoomLevel) {
		var l = MAP.getLayer(layer);
		if (l) {
			if (l.visible) {
				l.hide();
			} else {
				l.show();
				if (zoomLevel) {
					//MAP.setExtent(l.fullExtent, true);
					MAP.setZoom(zoomLevel);
				}
			}
		} else {
			console.warn('ToggleLayer: ' + layer + ' not found.');
		}
	};

	//
	// Pass a route parameter to show the route(s) stops
	// Pass nothing to clear them
	//
	var drawRouteStops = function(/*[string]*/ routes) {
		var routeStopLayer = MAP.getLayer('routeStops');
		if (!routeStopLayer) return;
		// queries are defined as an array for layers in a service
		var query = [];
		var x = '';
		if (routes) {
			//console.dir(routes);
			//routes = routes.filter(function (value, idx, arr) {
			//    return value !== "906"; // remove 906 from list
			//});
			for (let i = 0, rl = routes.length; i < rl; i++) {
				if (i > 0) {
					x += ' or ';
				}
				// Example: ROUTES LIKE '% 3 %' or ROUTES LIKE '3 %' or
				//          ROUTES LIKE '% 3' or ROUTES = '3'
				x += "ROUTES LIKE '% " + routes[i] + " %' or ";
				x += "ROUTES LIKE '" + routes[i] + " %' or ";
				x += "ROUTES LIKE '% " + routes[i] + "' or ";
				x += "ROUTES = '" + routes[i] + "'";
			}
		} else {
			x = '1=0'; // show NO STOPS
		}
		query[0] = x; // zero is the layer id for routeStops in the service
		routeStopLayer.setLayerDefinitions(query);
	};

	//
	// pass routes array to highlight those routes in color
	// pass nothing to clear them off
	//
	var drawRoutes = function(/*[string]*/ routes, zoom) {
		zoom = typeof zoom !== 'undefined' ? zoom : false;
		var routeLayer = MAP.getLayer('routes');
		if (!routeLayer) return;

		var routesQuery = [];
		routesQuery[4] = '1=0';
		if (routes) {
			routes = routes.filter(function(value, idx, arr) {
				return value !== '906'; // remove 906 from list
			});
			var queryWhere = 'ROUTENUMBER in (';
			for (let i = 0, l = routes.length; i < l; i++) {
				if (i > 0) {
					queryWhere += ',';
				}
				queryWhere += routes[i];
			}
			queryWhere += ')';
			routesQuery[4] = queryWhere; // query for sublayer 4
		}
		routeLayer.setLayerDefinitions(routesQuery);
		// route(s) should now be displaying
		if (routes && zoom) {
			// This routine does nothing more than extract the line features for the
			// requested routes and determine the extent of the features
			// by unioning their extents and then it zooms to the extent
			$.ajax({
				type: 'get',
				url: routeLayer.url + '/4/query',
				data: {
					where: queryWhere,
					returnGeometry: true,
					outFields: 'ROUTENUMBER',
					f: 'json',
				},
				dataType: 'json',
			})
				.done(function(result, status, xhr) {
					if (result.features.length > 0) {
						require(['esri/geometry/Polyline'], function(Polyline) {
							var extent;
							for (
								let i = 0, l = result.features.length;
								i < l;
								i++
							) {
								var g = new Polyline({
									paths: result.features[i].geometry.paths,
									spatialReference: result.spatialReference,
								});
								if (i === 0) {
									extent = g.getExtent();
								} else {
									extent = extent.union(g.getExtent());
								}
							}
							MAP.setExtent(extent, true);
						});
					}
				})
				.fail(function(err) {
					console.warn(
						'Routes fatal error fetching polylines: ' + err.Message
					);
				});
		}
	};
	var drawTrip = function(
		/*int*/ tripToDraw,
		/*object*/ tripPlan,
		/*boolean*/ zoomToTripExtent
	) {
		require([
			'esri/graphic',
			'esri/InfoTemplate',
			'esri/Color',
			'esri/geometry/Extent',
			'esri/geometry/Point',
			'esri/geometry/Polyline',
			'esri/geometry/webMercatorUtils',
			'esri/symbols/PictureMarkerSymbol',
			'esri/symbols/CartographicLineSymbol',
		], function(
			Graphic,
			InfoTemplate,
			Color,
			Extent,
			Point,
			Polyline,
			webMercatorUtils,
			PictureMarkerSymbol,
			CartographicLineSymbol
		) {
			/*
			 * drawTripStop
			 * StopObj = StopID and StopLocation(LocationName, UTMx, UTMy)
			 * stopGraphicType = "Transfer,Board,Exit"
			 */
			var drawTripStop = function(StopObj, /*string*/ stopGraphicType) {
				//console.log('Draw ' + stopGraphicType + ' ' + JSON.stringify(StopObj));
				//var originMarker = new PictureMarkerSymbol('images/SVG/map-location-ring-green.svg', 24, 24);
				var originMarker = new PictureMarkerSymbol(
					'/img/svg/map-icons/circle-gray-outline-green.svg',
					24,
					24
				);
				//var destinationMarker = new PictureMarkerSymbol('images/SVG/map-location-ring-red.svg', 24, 24);
				var destinationMarker = new PictureMarkerSymbol(
					'/img/svg/map-icons/circle-gray-outline-red.svg',
					24,
					24
				);
				//var transferMarker = new PictureMarkerSymbol('images/SVG/map-location-ring-gray.svg', 14, 14);
				var transferMarker = new PictureMarkerSymbol(
					'/img/svg/map-icons/circle-gray-outline-white.svg',
					20,
					20
				);
				var ptlatlon = new Array(2);
				CoordinateConversion.UTMXYToLatLon(
					parseFloat(StopObj.StopLocation.Y),
					parseFloat(StopObj.StopLocation.X),
					15,
					false,
					ptlatlon
				);
				var longitude = CoordinateConversion.RadToDeg(ptlatlon[1]);
				var latitude = CoordinateConversion.RadToDeg(ptlatlon[0]);
				var thePoint = new Point(longitude, latitude);
				var attr = {
					StopID: StopObj.StopID,
					LocationName: StopObj.StopLocation.LocationName,
				};
				var stopGraphic;
				if (stopGraphicType === 'Board') {
					stopGraphic = new Graphic(thePoint, originMarker, attr);
				} else if (stopGraphicType === 'Exit') {
					stopGraphic = new Graphic(
						thePoint,
						destinationMarker,
						attr
					);
				} else if (stopGraphicType === 'Transfer') {
					stopGraphic = new Graphic(thePoint, transferMarker, attr);
				}
				MAP.getLayer('tripStop').add(stopGraphic);
			};

			if (MAP.infoWindow.isShowing) {
				MAP.infoWindow.hide();
			}
			//console.dir(tripPlan);
			MAP.getLayer('trip').clear();
			MAP.getLayer('tripStop').clear();
			//
			// Test if there's a plan available to show
			//
			var tripsAvailable = tripPlan.PlannerItin.PlannerOptions.length;
			if (tripToDraw >= tripsAvailable) {
				console.warn(
					'Requested trip not available in current trip plan'
				);
				return;
			}
			var segs = tripPlan.PlannerItin.PlannerOptions[tripToDraw].Segments;
			var segExt;
			var tripExt;
			//The first non-walking segment should have a board symbol.
			//The last non-walking segment should have an exit symbol
			//Interior non-walking segments should have transfer symbols
			var firstSeg = 0;
			var lastSeg = segs.length - 1;
			var routesInSegments = [];
			for (let i = 0, sl = segs.length; i < sl; i++) {
				var seg = segs[i];
				//console.log("Doing Segment " + seg.SegmentNumber + " index " + i + " Type " + seg.SegmentType);
				if (seg.Geometry) {
					var cls1, attr;
					try {
						if (seg.SegmentNumber !== firstSeg) {
							drawTripStop(seg.OnStop, 'Transfer');
						}
						if (seg.SegmentNumber !== lastSeg) {
							drawTripStop(seg.OffStop, 'Transfer');
						}
					} catch (err) {
						console.debug(
							'Error identifying trip end stops ;Probably a walk segment'
						);
					}
					var rtColor;
					switch (seg.SegmentType) {
						case 0: //Bus
							var lnWidth;
							if (seg.Route === '903') {
								//is Red Line
								rtColor = new Color([237, 27, 46]);
								lnWidth = 10;
							} else if (seg.Route === '904') {
								// is orange line
								rtColor = new Color([255, 153, 0]);
							} else {
								rtColor = new Color([0, 173, 239, 0.72]); // default CYAN
								lnWidth = 8;
							}
							cls1 = new CartographicLineSymbol(
								CartographicLineSymbol.STYLE_SOLID,
								rtColor,
								lnWidth,
								CartographicLineSymbol.CAP_ROUND,
								CartographicLineSymbol.JOIN_ROUND
							);
							infoTemplate = new InfoTemplate('Title', 'Content');
							attr = {};
							break;
						case 1: //Light Rail
							if (seg.Route === '901') {
								//is Blue Line
								rtColor = new Color([0, 83, 160]);
							} else if (seg.Route === '902') {
								//is Green Line
								rtColor = new Color([0, 129, 68]);
							} else {
								rtColor = new Color([0, 173, 239, 0.72]); // default CYAN
								lnWidth = 8;
							}
							cls1 = new CartographicLineSymbol(
								CartographicLineSymbol.STYLE_SOLID,
								rtColor,
								10,
								CartographicLineSymbol.CAP_ROUND,
								CartographicLineSymbol.JOIN_ROUND
							);
							infoTemplate = new InfoTemplate('Title', 'Content');
							attr = {};
							break;
						case 2: // NorthStar Train  BROWN LINE
							cls1 = new CartographicLineSymbol(
								CartographicLineSymbol.STYLE_SOLID,
								new Color([119, 29, 29]),
								8,
								CartographicLineSymbol.CAP_ROUND,
								CartographicLineSymbol.JOIN_ROUND
							);
							infoTemplate = new InfoTemplate('Title', 'Content');
							attr = {};
							break;
						case 3: //Walk  DASHED LINE
							cls1 = new CartographicLineSymbol(
								CartographicLineSymbol.STYLE_SHORTDOT,
								new Color([0, 180, 210, 0.77]),
								8,
								CartographicLineSymbol.CAP_ROUND,
								CartographicLineSymbol.JOIN_ROUND
							);
							infoTemplate = new InfoTemplate('Title', 'Content');
							attr = {};
							break;
						default:
							cls1 = new CartographicLineSymbol(
								CartographicLineSymbol.STYLE_SHORTDOT,
								new Color([255, 34, 204]),
								8,
								CartographicLineSymbol.CAP_ROUND,
								CartographicLineSymbol.JOIN_ROUND
							);
							infoTemplate = new InfoTemplate('Title', 'Content');
							attr = {};
							break;
					}
					if (seg.Route) {
						routesInSegments.push(seg.Route);
					}
					var theTripLine = new Polyline(MAP.spatialReference);
					var newPoints = [];
					for (let j = 0, jl = seg.Geometry.length; j < jl; j++) {
						var point = seg.Geometry[j];
						var newp = point.split(',');
						newp.reverse();
						var ptlatlon = [];
						CoordinateConversion.UTMXYToLatLon(
							parseFloat(newp[0]),
							parseFloat(newp[1]),
							15,
							false,
							ptlatlon
						);
						var longitude = CoordinateConversion.RadToDeg(
							ptlatlon[1]
						);
						var latitude = CoordinateConversion.RadToDeg(
							ptlatlon[0]
						);
						var WebMercXY = webMercatorUtils.lngLatToXY(
							longitude,
							latitude
						);
						newPoints.push(WebMercXY);
					}
					theTripLine.addPath(newPoints);
					graphic = new Graphic(theTripLine, cls1, attr, null);
					MAP.getLayer('trip').add(graphic);
					segExt = new Extent({
						xmin: graphic.geometry.getExtent().xmin,
						ymin: graphic.geometry.getExtent().ymin,
						xmax: graphic.geometry.getExtent().xmax,
						ymax: graphic.geometry.getExtent().ymax,
						spatialReference: { wkid: 3857 },
					});
					if (tripExt) {
						if (segExt.xmin < tripExt.xmin) {
							tripExt.xmin = segExt.xmin;
						}
						if (segExt.ymin < tripExt.ymin) {
							tripExt.ymin = segExt.ymin;
						}
						if (segExt.xmax > tripExt.xmax) {
							tripExt.xmax = segExt.xmax;
						}
						if (segExt.ymax > tripExt.ymax) {
							tripExt.ymax = segExt.ymax;
						}
					} else {
						tripExt = segExt;
					}
				}
			}

			// This is either draw the routes and stops for the segments OR if no segment routes, it will clear the layer
			// drawRoutes(routesInSegments);
			// drawRouteStops(routesInSegments);

			var tripOrigin = {
				StopID: 'Origin',
				StopLocation: {
					LocationName: tripPlan.FromAddress.Location.LocationName,
					X: tripPlan.FromAddress.Location.X,
					Y: tripPlan.FromAddress.Location.Y,
				},
			};
			drawTripStop(tripOrigin, 'Board');
			var tripDest = {
				StopID: 'Destination',
				StopLocation: {
					LocationName: tripPlan.ToAddress.Location.LocationName,
					X: tripPlan.ToAddress.Location.X,
					Y: tripPlan.ToAddress.Location.Y,
				},
			};
			drawTripStop(tripDest, 'Exit');

			if (zoomToTripExtent) {
				MAP.setExtent(tripExt, true);
			} else {
				geoLocate();
			}
		});
	};

	function formatPopupDepartures(/*string*/ stop) {
		$('#mapPopUpDepartures').html('');
		$.get(window.serviceHostUrl + '/nextripv2/' + stop)
			.done(function(result) {
				if (result.Departures.length > 0) {
					let departures = result.Departures.sort(function(a, b) {
						a = new Date(a.DepartureTime);
						b = new Date(b.DepartureTime);
						return a < b ? -1 : a > b ? 1 : 0;
					});

					for (let i = 0, l = departures.length; i < l; i++) {
						let depart = departures[i];
						var departRow = $('<div/>', {
							class: 'list-group-item',
						});
						departRow.append(
							$('<span/>', { class: 'route-number mr-2' }).text(
								depart.RouteId + depart.Terminal
							)
						);
						departRow.append(
							$('<span/>', { class: 'route-name' }).text(
								depart.Description
							)
						);

						var departTime = $('<span/>', {
							class: 'depart-time ml-auto',
						});
						if (depart.Actual === true) {
							departTime.append(
								$('<img/>', {
									class: 'icon blink mr-1',
									src: '/img/svg/broadcast-blue.svg',
								})
							);
						}
						departTime.append(depart.DepartureText);
						departTime.appendTo(departRow);
						departRow.appendTo($('#mapPopUpDepartures'));
					}
				} else {
					$('#mapPopUpDepartures').html(
						'<span style="font-size:larger">No departures available at this time</span>'
					);
				}
			})
			.fail(function() {
				console.warn('Nextrip failed for stop ' + stop);
			});
	}

	//@@@@@@@@@@@@@@@@@@@@
	//@@@  I N I T @@@@@@@
	//@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@
	var init = function(mapElementID) {
		var nexTrip_INTERVAL = null;

		return $.Deferred(function(dfd) {
			// mapType property on the <div>
			var pType = document
				.getElementById(mapElementID)
				.getAttribute('maptype');
			var mapType = pType !== null ? pType : 'full';
			//console.log(mapElementID + " functionality is " + mapType);

			require([
				'esri/map',
				'esri/basemaps',
				'esri/config',
				'esri/graphic',
				'esri/Color',
				'esri/SpatialReference',
				'esri/geometry/Extent',
				'esri/geometry/Point',
				'esri/layers/ArcGISDynamicMapServiceLayer',
				'esri/layers/GraphicsLayer',
				'esri/tasks/query',
				'esri/tasks/QueryTask',
				'esri/symbols/PictureMarkerSymbol',
				'esri/symbols/SimpleMarkerSymbol',
				'esri/dijit/Scalebar',
				'esri/dijit/Popup',
				'esri/dijit/LocateButton',
				'dojo/on',
				'dojo/domReady!',
			], function(Map, esriBasemaps, esriConfig, Graphic, Color, SpatialReference, Extent, Point, ArcGISDynamicMapServiceLayer, GraphicsLayer, Query, QueryTask, PictureMarkerSymbol, SimpleMarkerSymbol, Scalebar, Popup, LocateButton, on) {
				var ROUTENAMES = null;
				var createRouteList = function() {
					var query = new Query();
					var queryTask = new QueryTask(
						'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/4'
					);
					query.returnGeometry = false;
					query.where = '1=1'; // extract them all
					query.outFields = ['ROUTENUM', 'ROUTEDESCRIPTION'];
					queryTask.execute(query);
					queryTask.on('error', function(err) {
						console.warn('createRouteList error');
						console.dir(err);
					});
					queryTask.on('complete', function(fSet) {
						if (fSet.featureSet.features.length > 0) {
							ROUTENAMES = {};
							// Outformat { "901": "METRO Blue Line" }
							for (
								let i = 0, l = fSet.featureSet.features.length;
								i < l;
								i++
							) {
								var route =
									fSet.featureSet.features[i].attributes;
								if (route.ROUTENUM > 887) {
									ROUTENAMES[route.ROUTENUM] =
										route.ROUTEDESCRIPTION;
								} else {
									ROUTENAMES[route.ROUTENUM] =
										route.ROUTENUM.toString() +
										' ' +
										route.ROUTEDESCRIPTION;
								}
							}
						}
					});
				};
				var drawNiceRides = function() {
					$.ajax({
						type: 'get',
						url:
							'https://gbfs.niceridemn.com/gbfs/en/station_information.json',
						dataType: 'json',
					})
						.done(function(result, status, xhr) {
							var stations = result.data.stations;
							if (stations) {
								var layer = MAP.getLayer('niceRides');
								for (
									let i = 0, sl = stations.length;
									i < sl;
									i++
								) {
									var station = stations[i];
									var thePoint = new Point(
										station.lon,
										station.lat
									);
									var theMarker = new PictureMarkerSymbol(
										'/img/svg/map-icons/NiceRideGreen.svg',
										30,
										23
									);
									var attr = {
										id: station.station_id,
										name: station.name,
										capacity: station.capacity,
									};
									var g = new Graphic(
										thePoint,
										theMarker,
										attr
									);
									layer.add(g);
								}
							}
						})
						.fail(function(err) {
							console.warn('NiceRide Station fetch failed' + err);
						});
				};
				var formatRouteList = function(/*string*/ routeList) {
					var routestring = '';
					var workArray = routeList.split(' ');
					if (workArray.length > 0) {
						for (let i = 0, l = workArray.length; i < l; i++) {
							workArray[i] = parseInt(workArray[i]); // convert string to integers to sort them correctly
						}
						var rtList = _bubbleSort(workArray);
						for (let i = 0, len = rtList.length; i < len; i++) {
							if (i > 0) {
								routestring += '<br/>';
							}
							var rt = rtList[i];
							var rtName = '';
							if (ROUTENAMES) rtName = ROUTENAMES[rt];
							var html = '<input id="cb' + rt + '"';
							html += 'dojotype="dijit.form.RadioButton"';
							html +=
								'onclick="javascript:TRIM.drawRoutes([' +
								rt +
								']);TRIM.drawRouteStops([' +
								rt +
								']);return true;"';
							html += 'name="optRoute" type="radio" />';
							html +=
								'<label for="cb' +
								rt +
								'">' +
								rtName +
								'</label>';
							routestring += html;
						}
					} else {
						routestring =
							'<span style="font-size:larger">No routes service this stop.</span>';
					}
					//console.log(routestring);
					return routestring;
				};
				var idMap = function(evt) {
					var showLocation = function(results2) {
						var title =
							'Map Click<hr/>' +
							'Location found: <br/>' +
							results2.address.address.Street +
							'<br/>';

						//$(".esriPopupMobile .sizer").css("height", "90px");
						//$(".esriPopupMobile .titlePane").css("height", "90px");
						MAP.infoWindow.setTitle(title);

						var rsltScrPnt = MAP.toScreen(
							results2.address.location
						);
						var num = MAP.height / 2;
						var infoWindowOrigin;
						var toppx = 0;
						if (MAP.height / 2 < rsltScrPnt.y) {
							//if click in the bottom half of the screen, change the click point by 50 pixels.
							var curPoint = MAP.toScreen(
								results2.address.location
							);

							curPoint.y = curPoint.y - 50;
							infoWindowOrigin = curPoint;
							//console.log("Click Y after adjustment1: " + curPoint.y);
							if (
								curPoint.y + 50 > MAP.height / 2 &&
								MAP.height / 2 > curPoint.y
							) {
								//console.log("clicked in bottom half of map window, but adjustment moves it to top half");
								//css top is supposed to be 104 pixels above (negative actually so less than, numerically) the map click, we're making the popup 50 pixels wider
								toppx = curPoint.y - 54;
								curPoint.y = curPoint.y + 50;
								infoWindowOrigin = curPoint;
							}
						} else {
							infoWindowOrigin = MAP.toScreen(
								results2.address.location
							);
						}
						MAP.infoWindow.show(MAP.toMap(infoWindowOrigin));
						//if (toppx > 0) {
						//    $(".esriPopupMobile").css("top", toppx + "px");
						///}
					};
					var query = new Query();
					var queryTask = new QueryTask(
						'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/1'
					);
					var pixelWidth = MAP.extent.getWidth() / MAP.width;
					var toleraceInMapCoords = 20 * pixelWidth;
					query.returnGeometry = true;
					query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
					query.where = 'NROUTES <> 0';
					query.outFields = [
						'SITEID',
						'SITE_ON',
						'SITE_AT',
						'ROUTES',
						'SYMBOL',
						'NROUTES',
					];
					query.geometry = new Extent(
						evt.mapPoint.x - toleraceInMapCoords,
						evt.mapPoint.y - toleraceInMapCoords,
						evt.mapPoint.x + toleraceInMapCoords,
						evt.mapPoint.y + toleraceInMapCoords,
						MAP.spatialReference
					);

					MAP.infoWindow.hide();
					MAP.getLayer('stops').clear();
					queryTask.execute(query);
					queryTask.on('error', function(err) {
						console.warn('Bus Stop Query Error: ' + err);
					});
					queryTask.on('complete', function(fSet) {
						if (fSet.featureSet.features.length === 0) {
							//if there are no features, do a generic reverse geocode.
							//locateAddress();
						} else {
							//console.log("Bus Stop Query Complete. There are " + fSet.featureSet.features.length + " features");
							var feature = fSet.featureSet.features[0];

							var atts = feature.attributes;
							MAP.infoWindow.setTitle(
								'Stop Number: ' + atts.siteid
							);

							MAP.infoWindow.show(
								evt.screenPoint,
								MAP.getInfoWindowAnchor(evt.screenPoint)
							);

							var stopGraphic = new Graphic();
							var stopSymbol;
							stopGraphic.setGeometry(feature.geometry);
							if (atts.Symbol === 0) {
								stopSymbol = new PictureMarkerSymbol(
									'/img/svg/map-icons/badge-blue-bus.svg',
									25,
									25
								);
							} else if (atts.Symbol === 1) {
								stopSymbol = new PictureMarkerSymbol(
									'/img/svg/map-icons/badge-blue-lrt.svg',
									24,
									24
								);
							} else if (atts.Symbol === 2) {
								stopSymbol = new PictureMarkerSymbol(
									'/img/svg/map-icons/badge-blue-train.svg',
									24,
									24
								);
							}
							stopGraphic.setSymbol(stopSymbol);
							MAP.getLayer('stops').add(stopGraphic);
							let stopName = atts.site_on.trim();
							stopName +=
								atts.site_at.trim() !== 'null'
									? ' & ' + atts.site_at.trim()
									: '';
							$('#mapPopUpStopDescription').html(stopName);
							$('#mapPopUpRoutes').html(
								formatRouteList(atts.ROUTES)
							);

							formatPopupDepartures(atts.siteid);
							clearInterval(nexTrip_INTERVAL);
							nexTrip_INTERVAL = setInterval(function() {
								formatPopupDepartures(atts.siteid);
							}, 30000);
							if (evt.screenX > 760) {
								MAP.centerAt(evt.mapPoint);
							}
						}
					});
				};
				//===================================================================================
				//  START OF MAP INITIALIZATION =====================================================
				//===================================================================================
				createRouteList();
				//esriConfig.defaults.map.panRate = 1;
				//esriConfig.defaults.map.panDuration = 1;
				const spatialRefWM = new SpatialReference({ wkid: 3857 });
				const initExtent = new Extent({
					xmin: -10385405,
					ymin: 5615111,
					xmax: -10379460,
					ymax: 5619877,
					spatialReference: spatialRefWM,
				});
				//try {
				//console.log("Cookie: " + cookie("map.Extent"));
				//var extObj = dojo.fromJson(cookie("map.Extent"));
				//var cookieExtent = new Extent(extObj);
				//}
				//catch (e) {
				//    console.warn(e);
				//}
				var popUpDiv = document.createElement('div');
				var mapPopup = new Popup(
					{
						zoomFactor: 4,
						marginLeft: 20, //if maxed
						marginRight: 20, //if maxed
						anchor: 'auto',
						pagingControls: false,
						pagingInfo: false,
						markerSymbol: new SimpleMarkerSymbol(
							'circle',
							32,
							null,
							new Color([0, 0, 0, 0.25])
						),
						highlight: true,
					},
					popUpDiv
				);
				mapPopup.startup();

				esriBasemaps.metCouncilWebMercator = {
					baseMapLayers: [
						{
							url:
								'https://arcgis.metc.state.mn.us/arcgis/rest/services/BaseLayer/BasemapWM/MapServer',
						},
					],
					title: 'MetCouncil',
				};
				esriBasemaps.transitVector = {
					title: 'TransitVector',
					// First version of the basemap with some extra parking lots and labels
					//baseMapLayers: [{ url: "https://metrocouncil.maps.arcgis.com/sharing/rest/content/items/8cbdf505cd3f4dc39c4e5da6f5b49d95/resources/styles/root.json", type: "VectorTile" }]
					//baseMapLayers: [{url:"/js/basemapStylev1.json", type: "VectorTile"}]                    };
					// 2nd version of the basemap
					//baseMapLayers: [{ url: "https://metrocouncil.maps.arcgis.com/sharing/rest/content/items/5c2ea8c24d7a46ed8c61cd058219504f/resources/styles/root.json", type: "VectorTile" }]
					baseMapLayers: [
						{ url: '/js/basemapStylev3.json', type: 'VectorTile' },
					],
				};

				MAP = new Map(mapElementID, {
					autoResize: true,
					logo: false,
					showAttribution: true,
					//infoWindow: popup,
					infoWindow: mapPopup,
					sliderPosition: 'bottom-right',
					basemap: 'transitVector',
					maxZoom: 18,
					minZoom: 9,
					center: [-93.27, 44.975],
					//fadeOnZoom: true,
					zoom: 14,
				});

				MAP.on('load', function() {
					GEOLOCATE = new LocateButton(
						{
							map: MAP,
							scale: 10000,
						},
						'betterStopsMapLocate'
					);
					GEOLOCATE.startup();
					GEOLOCATE.on('locate', function(result) {
						on.once(MAP, 'click', function() {
							GEOLOCATE.clear();
						});
					});
					var scalebar = new Scalebar({
						map: MAP,
						attachTo: 'bottom-left',
						scalebarUnit: 'english',
					});

					MAP.disableScrollWheel();
					$('#trimPopUp').show();
					MAP.infoWindow.setContent($('#trimPopUp')[0]);
				});

				MAP.on('click', function(evt) {
						if (MAP.infoWindow.isShowing) {
							MAP.infoWindow.hide();
						}
						idMap(evt);
				});

				MAP.on('resize', function(extent, width, height) {});

				MAP.on('update-start', function() {
					$('.mapLoading').show();
				});
				MAP.on('update-end', function(err) {
					$('.mapLoading').hide();
				});

				MAP.on('layers-add-result', function(result) {
					//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
					dfd.resolve();
					//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
				});
				MAP.on('layer-add-result', function(result) {
					if (result.error) {
						console.error(
							'Layer add ' +
								result.error +
								' for ' +
								result.layer.url
						);
					}
				});

				var allStopLayer = new ArcGISDynamicMapServiceLayer(
					TRIM_MapServer,
					{
						id: 'allStops',
						opacity: 0.6,
					}
				);
				allStopLayer.setImageFormat('svg');
				allStopLayer.setVisibleLayers([1]);

				var parkAndRidesLayer = new ArcGISDynamicMapServiceLayer(
					TRIM_MapServer,
					{
						id: 'parkAndRides',
						opacity: 1,
						visible: true,
					}
				);
				parkAndRidesLayer.setImageFormat('svg');
				parkAndRidesLayer.setVisibleLayers([8]);

				//var allRoutesLayer = new ArcGISDynamicMapServiceLayer(TRIM_MapServer,
				//    {
				//        id: "allRoutes",
				//        opacity: 0.35
				//    });
				//allRoutesLayer.setImageFormat("svg");
				//allRoutesLayer.setVisibleLayers([5]);

				var routestopLayer = new ArcGISDynamicMapServiceLayer(
					TRIM_MapServer,
					{
						id: 'routeStops',
						opacity: 1,
					}
				);
				routestopLayer.setImageFormat('svg');
				routestopLayer.setVisibleLayers([0]);
				routestopLayer.setLayerDefinitions(['1=0']);

				var routesLayer = new ArcGISDynamicMapServiceLayer(
					TRIM_MapServer,
					{
						id: 'routes',
						opacity: 0.7,
					}
				);
				routesLayer.setImageFormat('svg');
				routesLayer.setVisibleLayers([4]);
				var layerQuerySettings = [];
				layerQuerySettings[4] = '1=0'; // query for sublayer 4 - show nothing
				routesLayer.setLayerDefinitions(layerQuerySettings);

				var goToLayer = new ArcGISDynamicMapServiceLayer(
					TRIM_MapServer,
					{
						id: 'goTo',
						opacity: 1,
						visible: false,
					}
				);
				goToLayer.setImageFormat('svg');
				goToLayer.setVisibleLayers([2]);
				var tripLayer = new GraphicsLayer({
					id: 'trip',
					opacity: 0.75,
				});

				// this holds the trip stops for the trip map
				var tripStopLayer = new GraphicsLayer({
					id: 'tripStop',
				});

				// this holds the bus stop highlight graphic for the full map
				var stopsLayer = new GraphicsLayer({
					id: 'stops',
				});

				// this holds the NiceRide station locations
				var niceRidesLayer = new GraphicsLayer({
					id: 'niceRides',
					opacity: 0.75,
					visible: false,
					maxScale: 1200,
					minScale: 25000,
				});

				var mapLayers = [];

					mapLayers = [
						//allRoutesLayer,
						//allStopLayer,
						//parkAndRidesLayer,
						//goToLayer,
						routesLayer,
						//routestopLayer,
						stopsLayer
						//niceRidesLayer,
					];
				MAP.addLayers(mapLayers);
			});
		}).promise();
	};
	var findStop = function(stopID) {
		var queryWhere = 'siteid = ' + stopID;
		return $.Deferred(function(dfd) {
			$.ajax({
				type: 'get',
				url:
					'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/1/query',
				data: {
					where: queryWhere,
					returnGeometry: true,
					outFields: 'site_on, site_at, ROUTES, ROUTEDIRS',
					outSR: 4326,
					f: 'json',
				},
				dataType: 'json',
			})
				.done(function(r) {
					if (r.error) {
						console.warn('Stop lookup failed');
						dfd.reject();
					} else {
						// convert the WM X, Y to Lat/Lng
						if (r.features.length > 0) {
							var feature = r.features[0];
							let x = feature.geometry.x;
							let y = feature.geometry.y;
							let name = feature.attributes.site_on.trim();
							name +=
								feature.attributes.site_at.trim() !== 'null'
									? ' & ' + feature.attributes.site_at.trim()
									: '';
							dfd.resolve(x, y, name);
						} else {
							console.warn(
								'stops query returned no results: ' + stopID
							);
							dfd.reject();
						}
					}
				})
				.fail(function() {
					console.warn('Stop service failed');
					dfd.reject();
				});
		}).promise();
	};
	// ---------------------------------------------------------------
	// This runs from iMap/InteractiveMap.aspx
	// and uses this routing: "/imap/<route>/<stop>"
	// where <route> is required and a valid transit route number or zero
	// and <stop> is optional and is a valid stop number
	// Page will open and show the interactive map. If route provided,
	// the route line will draw and route stops will be highlighted.
	// If the stop provided, the map will mark the stop and zoom there.
	//
	// This page also directly as iMap/InteractiveMap.aspx?x=<longitude>&y=<latitude>
	// to open the map as a particular point.
	// ----------------------------------------------------------------
	var fullPageSetup = function(mapDiv, route, stop, x, y, myType) {
		var t = typeof myType !== 'undefined' ? myType : null;
		var h = $(window).height();
		if (h > 1000) {
			$('.map').css({ height: h - 500 });
		} else if (h > 500) {
			$('.map').css({ height: h - 220 });
		}
		init(mapDiv).then(function() {
			if (route) {
				if (stop) {
					drawRoutes([route], /*zoomToRoute*/ false);
					drawRouteStops([route]);
					findStop(stop)
						.then(function(x, y, name) {
							let title = 'Stop ' + stop + ' / ' + name;
							$('#page-title-text').html(title);
							centerMarkerAtPoint(x, y, /*zoomLevel*/ 17);
						})
						.fail(function() {
							console.warn(
								'Requested stop ' + stop + ' not found.'
							);
						});
				} else {
					drawRoutes([route], /*zoomToRoute*/ true);
					drawRouteStops([route]);
				}
				toggleLayer('parkAndRides'); // Turn the P&R Layer off for the route link page
			} else {
				if (stop) {
					findStop(stop)
						.then(function(x, y, name) {
							let title = 'Stop ' + stop + ' / ' + name;
							$('#page-title-text').html(title);
							centerMarkerAtPoint(x, y, /*zoomLevel*/ 17);
						})
						.fail(function() {
							console.warn(
								'Requested stop ' + stop + ' not found.'
							);
						});
					toggleLayer('parkAndRides'); // Turn the P&R Layer off for the route link page
				} else {
					if (x && y) {
						if (t === 'gt') {
							toggleLayer('goTo');
							centerMarkerAtPoint(
								parseFloat(x),
								parseFloat(y),
								17
							);
						} else if (t === 'pr') {
							centerMarkerAtPoint(
								parseFloat(x),
								parseFloat(y),
								16
							);
						} else {
							centerMarkerAtPoint(
								parseFloat(x),
								parseFloat(y),
								16
							);
						}
					}
				}
			}
		});
	};
	var mapDestroy = function() {
		GEOLOCATE.destroy();
		GEOLOCATE = null;
		MAP.destroy();
		MAP = null;
	};
	return {
		fullPageSetup: fullPageSetup,
		centerMarkerAtPoint: centerMarkerAtPoint,
		drawTrip: drawTrip,
		drawRouteStops: drawRouteStops,
		drawRoutes: drawRoutes,
		geoLocate: geoLocate,
		toggleLayer: toggleLayer,
		destroy: mapDestroy,
		init: init,
	};
})(jQuery, window, document);

$(function() {
	// ----------------------------------------------------
	// schedules-maps
	// ----------------------------------------------------
	if ($('#betterStopsMap').length) {
		// This one loads the Search field in the schedules-maps page -- the search result
		// automatically sets the map to zoom to the requested location
		AutocompleteAddress.init(
			'interactiveMapSearch',
			/*UTMout*/ false,
			function() {
				var choice = AutocompleteAddress.getChoice(
					'interactiveMapSearch'
				);
				bbsMap.centerMarkerAtPoint(
					choice.location.x,
					choice.location.y,
					15
				);
			}
		);
		bbsMap.init('betterStopsMap').then(function() {
			console.log("Map loaded");
		});
		$('#betterStopsMapLayer1').click(function() {
			bbsMap.toggleLayer('routes', /*zoomLevel*/ 14);
		});
		$('#betterStopsMapLayer2').click(function() {
			bbsMap.toggleLayer('stops', /*zoomLevel*/ 10);
		});
	}
});
