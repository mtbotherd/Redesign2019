var NetworkNextMap = (function ($, window, document) {
	'use strict';
	const ROUTE_MAPSERVICE =
		'https://arcgis.metc.state.mn.us/arcgis/rest/services/transit/NetworkNext/MapServer';

	var MAP = null; // this is the main MAP object
	var GEOLOCATE = null; // this is the locate button object
	var ROUTENAMES = null; // an object with the route number as the key and route name as the data
	var ROUTESTOSHOW = [];
	var SELECTEDTYPE = 2;
	var SELECTEDTIME = 1;

	var _isEmpty = function _isEmpty(str) {
		return !str || 0 === str.length;
	};
	var _isValue = function (x) {
		// tests if value is NOT empty AND NOT blank and NOT NULL
		var str = x.toString(); // this allows zero to test as a valid value
		//console.write('test value is ' + x)
		if (str) {
			return /\S/.test(str);
		}
		return false;
	};
	var _isNumber = function (x) {
		// tests if value is any sort of number with +/- or decimals
		if (_isValue(x)) {
			return !isNaN(x - 0);
		}
		return false;
	};
	/* ==============================================================================
	 * External Called Functions
	 *
	 * These all need to be available from the outside
	 * ==============================================================================
	 */
	// this is the external call to have the map zoom to the user's location
	var geoLocate = function () {
		GEOLOCATE.locate();
	};
	var centerMarkerAtPoint = function (
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
			'esri/symbols/PictureMarkerSymbol'
		], function (Graphic, Point, PictureMarkerSymbol) {
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
			MAP.centerAt(p).then(function () {
				if (level) {
					MAP.setLevel(level);
				}
			});
		});
	};
	//
	// pass routes array to highlight those routes in color
	// pass nothing to clear them off
	//
	const COLORS = [
		'black',
		'orangered',
		'gold',
		'royalblue',
		'green',
		'darkslategray',
		'deeppink',
		'rebeccapurple',
		'teal',
		'slateblue',
		'indigo',
		'darkblue',
		'darkcyan',
		'darkgrey',
		'crimson',
		'darkgreen',
		'blueviolet',
		'darkkhaki',
		'darkmagenta',
		'darkolivegreen',
		'darkorange',
		'darkorchid',
		'aqua',
		'azure',
		'seagreen',
		'blue',
		'brown',
		'cyan',
		'sienna',
		'darkred',
		'darksalmon',
		'darkviolet',
		'firebrick',
		'fuchsia',
		'darkslateblue',
		'midnightblue'
	];

	var aliasRouteName = function (/*any*/route) {
		route = parseInt(route);
		var routeName = '';
		switch (route) {
			case 901:
				routeName = 'Blue Line';
				break;
			case 902:
				routeName = 'Green Line';
				break;
			case 903:
				routeName = 'Red Line';
				break;
			case 904:
				routeName = 'Gold Line';
				break;
			case 905:
				routeName = 'Orange Line';
				break;
			case 906:
				routeName = 'Airport Shuttle';
				break;
			case 921:
				routeName = 'A Line';
				break;
			case 922:
				routeName = 'B Line';
				break;
			case 923:
				routeName = 'C Line';
				break;
			default:
				routeName = route.toString();
				break;
		}
		return routeName;
	}
	var drawRoute = function (/*string*/ route, /*bool*/zoom) {
		zoom = typeof zoom !== 'undefined' ? zoom : false;

		MAP.graphics.clear();

		// ******************
		// Here we set a query on a feature layer defined in the map
		// rather than a direct query of any service to get a line geometry
		// *****************
		// routeLayer.setLayerDefinitions(routesQuery);
		// let routeService = routeLayer.url;
		// var routeLayer = MAP.getLayer('allRoutes');
		// if (!routeLayer) return;
		// 	routesQuery[4] = queryWhere; // query for sublayer 4

		let routeService = 'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/'
		$.ajax({
			type: 'get',
			url: routeService + '/4/query',
			data: {
				where: 'ROUTENUMBER = ' + route,
				returnGeometry: true,
				outFields: 'ROUTENUMBER',
				f: 'json',
			},
			dataType: 'json',
		})
			.done(function (result, status, xhr) {
				if (result.error) {
					console.warn('drawRoute fatal error on lookup for route: ' + route);
				}
				if (result.features) {
					require([
						'esri/geometry/Polyline',
						'esri/symbols/SimpleMarkerSymbol',
						'esri/symbols/SimpleLineSymbol',
						'esri/symbols/SimpleFillSymbol',
						'esri/symbols/TextSymbol',
						'esri/symbols/Font',
						'esri/Color',
						'esri/graphic'
					], function (Polyline, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, TextSymbol, Font, Color, Graphic) {
						var extent;
						for (let i = 0, l = result.features.length; i < l; i++) {
							// draw a line for the route
							let geom = new Polyline({
								paths: result.features[i].geometry.paths,
								spatialReference: result.spatialReference,
							});
							let line = new SimpleLineSymbol();
							//line.setColor(new Color(COLORS[i]));
							line.setColor(new Color('darkcyan'));
							line.setWidth(3);
							let g = new Graphic();
							g.setGeometry(geom);
							g.setSymbol(line);
							MAP.graphics.add(g);

							// add label for the route
							let font = new Font("30px",
								Font.STYLE_NORMAL,
								Font.VARIANT_NORMAL,
								Font.WEIGHT_BOLD);
							let text = aliasRouteName(result.features[i].attributes.ROUTENUMBER);
							var textSymbol = new TextSymbol(
								text,
								font,
								new Color([64, 128, 255]) // a light-blue
								//new Color('darkcyan')
							);
							let labelPoint = geom.getExtent().getCenter();
							//let offsetPoint = labelPoint.offset(0, -300);
							var marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 60,
								new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
									new Color([0, 0, 0]), 1),
								new Color([255, 255, 255, 1]));
							//let m = new Graphic(labelPoint, marker);
							let label = new Graphic(labelPoint, textSymbol);
							//MAP.graphics.add(m);
							MAP.graphics.add(label);
							if (i === 0) {
								extent = geom.getExtent();
							} else {
								extent = extent.union(geom.getExtent());
							}
						}
						MAP.setExtent(extent, true);
					});
				}
			});
	};
	var toggleLayer = function (/*string*/ layer, /*int*/ zoomLevel) {
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
	var updateLayersByTime = function (/*int*/phase) {
		if (phase) SELECTEDTIME = phase;
		// first hide all visible layers in the MAP
		$.each(MAP.layerIds, function (idx, layerId) {
			if (MAP.getLayer(layerId).visible && layerId !== 'layer0') {
				MAP.getLayer(layerId).hide();
			}
		});
		// then based on which Time period we're showing, turn on the layers
		// as selected in the route set switches
		switch (phase) {
			case 1: // current
				if ($('#networkNextMapLayer1').is(':checked')) {
					MAP.getLayer('metroRoutes').show();
				}
				if ($('#networkNextMapLayer2').is(':checked')) {
					MAP.getLayer('localRoutes').show();
				}
				if ($('#networkNextMapLayer3').is(':checked')) {
					MAP.getLayer('expressRoutes').show();
				}
				if ($('#networkNextMapLayer4').is(':checked')) {
					MAP.getLayer('subRoutes').show();
				}
				break;
			case 2: //
				break;
			case 3: //
				break;
			case 4: //
				break;
			default:
				break;
		}
	};
	var updateLayersByType = function (/*int*/type) {
		SELECTEDTYPE = type;
		switch (type) {
			case 1: // metro
				if ($('#networkNextTimeSelect1').is(':checked')) {
					toggleLayer('metroRoutes');
				}
				break;
			case 2: // local
				if ($('#networkNextTimeSelect1').is(':checked')) {
					toggleLayer('localRoutes');
				}
				break;
			case 3: // express
				if ($('#networkNextTimeSelect1').is(':checked')) {
					toggleLayer('expressRoutes');
				}
				break;
			case 4: // express
				if ($('#networkNextTimeSelect1').is(':checked')) {
					toggleLayer('subRoutes');
				}
				break;
			default: // turn all off
				if ($('#networkNextMapLayer1').is(':checked')) {
					toggleLayer('metroRoutes');
					$('#networkNextMapLayer1').prop('checked', false);
				}
				if ($('#networkNextMapLayer2').is(':checked')) {
					toggleLayer('localRoutes');
					$('#networkNextMapLayer2').prop('checked', false);
				}
				if ($('#networkNextMapLayer3').is(':checked')) {
					toggleLayer('expressRoutes');
					$('#networkNextMapLayer3').prop('checked', false);
				}
				if ($('#networkNextMapLayer4').is(':checked')) {
					toggleLayer('subRoutes');
					$('#networkNextMapLayer4').prop('checked', false);
				}
				break;
		}
	};
	var commentFormReset = function () {
		$('#networkNextCommentForm').val('');
		$('#nnCommentFormSubmitStatus').html('');
	};
	var setCommentText = function (route) {
		let m = 'For';
		switch (SELECTEDTIME) {
			case 1:
				m += ' current';
				break;
			case 2:
				m += ' proposed 2030';
				break;
			case 3:
				m += ' proposed 2040';
				break;
			case 4:
				m += ' proposed 2040';
				break;
			default:
				break;
		}
		if (route) {
			let r = aliasRouteName(route);
			m += ' route ' + r + ':';
		} else {
			m += ' routes:';
		}
		return m;
	}
	var toggleRoute = function (/*string*/route,/*boolean*/pulldownSelect) {
		pulldownSelect = typeof pulldownSelect !== 'undefined' ? pulldownSelect : false;
		// var i = ROUTESTOSHOW.indexOf(route); // check if the route already in the list
		// if (i === -1) {
		// 	ROUTESTOSHOW.push(route);
		// } else {
		// 	ROUTESTOSHOW.splice(i, 1);
		// }
		if (route) {
			commentFormReset();
			//ROUTESTOSHOW = [];
			//ROUTESTOSHOW.push(route);
			if (pulldownSelect) {
				MAP.infoWindow.hide();
				updateLayersByType(0); // reset the route selectors too
			} else {
				$('#nnRoute').val(''); // reset the route pulldown list
			}
			// drawRoutes(ROUTESTOSHOW, /*zoom*/ false);
			drawRoute(route, /*zoom*/false);
		}
		let m = setCommentText(route);
		$('#networkNextCommentForm').val(m + '\n');
		$('#networkNextCommentForm').focus();
	}
	var formatPopUpList = function formatPopUpList(/*string*/routeList) {
		// routeList is a string with route numbers space-delimited
		var routestring = '';
		if (routeList.length > 0) {
			let w = routeList.split(' ').sort(function (a, b) { return parseInt(a) - parseInt(b); });
			routestring += '<span>PIck one to highlight.<br/><br/></span>';
			for (let i = 0, len = w.length; i < len; i++) {
				routestring += '<br/>';
				var rt = w[i];
				var rtName = rt;
				var rtDesc;
				if (ROUTENAMES) {
					if (rt in ROUTENAMES) {
						rtName = ROUTENAMES[rt].name;
						rtDesc = ROUTENAMES[rt].description;
					}
				}
				var html = '<input id="cb' + rt + '"';
				html += 'onclick="javascript: NetworkNextMap.toggleRoute(' + rt + ');return true; "';
				html += 'type="radio" name="routeSelect"';
				var ix = ROUTESTOSHOW.indexOf(parseInt(rt)); // check if route already in the list
				if (ix !== -1) {
					html += ' checked="checked" ';
				}
				html += '/>';
				//html += '<label for='cb' + rt + ''><a href='https://www.metrotransit.org/route/' + rt + '' target='_blank'>' + rtName + '</a></label>';
				if (rtDesc) {
					html += '<label for="cb' + rt + '">' + rtName + ' - ' + rtDesc + '</label>';
				} else {
					html += '<label for="cb' + rt + '">' + rtName + '</label>';
				}

				routestring += html;
			}
		} else {
			routestring = '<span style="font-size:large;"><br/>No routes service here.<br/><br/></span>';
		}
		routestring += '<br/><br/>' +
			// '<div>' +
			// '<a class="btn btn-sm btn-secondary-ghost" role="button"' +
			// 'href="#">Comments</a></div>';
			'<span style="font-size:larger;"><a href="#"><br /><br />Leave a comment, please!!</a>'
		return routestring;
	};

	var locateAddress = function (/*float*/longitude, /*float*/latitude) {
		// return the street address of this Lat - Lng
		var utmXY = [];
		CoordinateConversion.LatLonToUTMXY(CoordinateConversion.DegToRad(latitude), CoordinateConversion.DegToRad(longitude), 15, utmXY);
		//console.log('Result: ' + utmXY[0] + ' ' + utmXY[1]);
		return $.Deferred(function (dfd) {
			$.ajax({
				type: 'get',
				url: 'https://arcgis.metc.state.mn.us/ArcGIS/rest/services/metro_streets/GeocodeServer/reverseGeocode',
				data: {
					location: utmXY[0] + ',' + utmXY[1],
					distance: 300,
					outSR: 3857,
					returnIntersection: false,
					f: 'json'
				},
				dataType: 'json',
			})
				.done(function (result, status, xhr) {
					//console.dir(result);
					if (result && result.error) {
						console.warn('Error locateAddress: ' + result.error.message);
						dfd.reject(result.error.message);
					}
					if (result && result.address) {
						dfd.resolve(result.address.Match_addr);
					}
				});
		}).promise();
	}

	var idMap = function (evt) {
		ROUTESTOSHOW = [];
		require(['esri/tasks/query',
			'esri/tasks/QueryTask',
			'esri/geometry/webMercatorUtils',
			'esri/geometry/Extent'
		],
			function (Query, QueryTask, webMercatorUtils, Extent) {
				// convert 102100 Web Mercator to Lat/Lng coordinates
				var mapPointLngLat = webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y);

				var query = new Query();
				var queryTask = new QueryTask(
					'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/4');
				var pixelWidth = MAP.extent.getWidth() / MAP.width;
				var toleraceInMapCoords = 20 * pixelWidth;
				query.returnGeometry = true;
				query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
				query.where = '1=1';
				query.outFields = ['LINE_ID', 'ROUTENUM', 'ROUTEDESCRIPTION'];
				query.geometry = new Extent(evt.mapPoint.x - toleraceInMapCoords, evt.mapPoint.y - toleraceInMapCoords,
					evt.mapPoint.x + toleraceInMapCoords,
					evt.mapPoint.y + toleraceInMapCoords,
					MAP.spatialReference);

				queryTask.execute(query);
				queryTask.on('error', function (err) {
					console.warn('Bus Route Query Error: ' + err);
				});
				queryTask.on('complete', function (fSet) {
					let routes = null;
					let content = '';
					let features = fSet.featureSet.features;
					if (features && features.length > 0) {
						// we found some routes at the location of this map click
						routes = '';
						for (var i = 0, len = features.length; i < len; i++) {
							var f = features[i];
							var atts = f.attributes;
							if (i > 0) {
								routes += ' ';
							}
							routes += atts.LINE_ID;
						}
					} else {
						// didn't find any routes so we'll look up the street address of the map click
						locateAddress(mapPointLngLat[0], mapPointLngLat[1])
							.done(function (result) {
								if (result.error) {
									console.log('locateAddress Error - unable to fetch address');
								}
								console.log('Address: ' + result.address);
							});
					}
					if (routes) {
						content = formatPopUpList(routes);
					} else {
						content = 'Map clicked';
					}

					MAP.infoWindow.resize(250, 300);
					MAP.infoWindow.setTitle('Routes for this location:');
					MAP.infoWindow.setContent(content);
					MAP.infoWindow.show(evt.screenPoint, MAP.getInfoWindowAnchor(evt.screenPoint));
					if (evt.screenX > 760) {
						MAP.centerAt(evt.mapPoint);
					}
				});
			});
	};

	var commentFormSubmit = function () {
		// determines current state of application and launches comment form 
		let c = $('#networkNextCommentForm').val();
		if (c) {
			console.log("Submit form: " + c);
			$('#nnCommentFormSubmitStatus').html('Comments sent successfully.');
		} else {
			alert('Provide some comments');
		}
	};

	//@@@@@@@@@@@@@@@@@@@@
	//@@@  I N I T @@@@@@@
	//@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@
	var init = function (mapElementID) {
		return $.Deferred(function (dfd) {
			require([
				'esri/map',
				'esri/basemaps',
				'esri/Color',
				'esri/layers/ArcGISDynamicMapServiceLayer',
				'esri/layers/FeatureLayer',
				'esri/tasks/query',
				'esri/tasks/QueryTask',
				'esri/symbols/SimpleMarkerSymbol',
				'esri/dijit/Scalebar',
				'esri/dijit/Legend',
				'esri/dijit/Popup',
				'esri/dijit/PopupTemplate',
				'esri/dijit/LocateButton',
				"esri/dijit/BasemapToggle",
				'dojo/on',
				'dojo/domReady!'
			], function (Map, esriBasemaps, Color, ArcGISDynamicMapServiceLayer, FeatureLayer,
				Query, QueryTask, SimpleMarkerSymbol, Scalebar, Legend, Popup, PopupTemplate, LocateButton, BasemapToggle, on) {

				var createRouteList = function () {
					// this function creates two lists from one source:
					// List 1: an object list have with the route number and description. This get used to show the
					//         route description in the pop-up lists.
					// List 2: is the route selection pull-down list to highlight a route on the map.
					let routedrop = $('#nnRoute');
					routedrop.empty(); // clear the select list
					routedrop.append($('<option selected/>').val('').text('Pick a Route'));
					ROUTENAMES = {}; // Outformat { 901: { name: "METRO Blue Line", description: "" }

					var query = new Query();
					var queryTask = new QueryTask(
						'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/4'
					);
					query.returnGeometry = false;
					query.where = '1=1'; // extract them all
					query.orderByFields = ['ROUTENUM'];
					query.outFields = ['ROUTENUM', 'ROUTEDESCRIPTION'];
					queryTask.execute(query);
					queryTask.on('error', function (err) {
						console.warn('createRouteList error');
						console.dir(err);
					});
					queryTask.on('complete', function (fSet) {
						if (fSet.featureSet.features.length > 0) {
							for (let i = 0, l = fSet.featureSet.features.length; i < l; i++) {
								let route =
									fSet.featureSet.features[i].attributes;
								let routeName = aliasRouteName(route.ROUTENUM);
								if (route.ROUTENUM > 890) {
									ROUTENAMES[route.ROUTENUM] = { 'name': routeName, 'description': null };
									routedrop.append(
										$('<option/>')
											.val(route.ROUTENUM.toString())
											.text(routeName)
									);
								}
							}
							for (let i = 0, l = fSet.featureSet.features.length; i < l; i++) {
								let route =
									fSet.featureSet.features[i].attributes;
								let routeName = aliasRouteName(route.ROUTENUM);
								if (route.ROUTENUM < 890) {
									ROUTENAMES[route.ROUTENUM] = { 'name': routeName, 'description': route.ROUTEDESCRIPTION };
									routedrop.append(
										$('<option/>')
											.val(route.ROUTENUM.toString())
											.text(routeName + " - " + route.ROUTEDESCRIPTION)
									);
								}

							}
						}
					});
				};
				//===================================================================================
				//  START OF MAP INITIALIZATION =====================================================
				//===================================================================================
				var popUpDiv = document.createElement('div');
				var mapPopup = new Popup(
					{
						zoomFactor: 4,
						marginLeft: 20, //if maxed
						marginRight: 20, //if maxed
						anchor: 'auto',
						pagingControls: false,
						pagingInfo: false,
						titleInBody: false,
						markerSymbol: new SimpleMarkerSymbol(
							'circle',
							32,
							null,
							new Color([0, 0, 0, 0.25])
						),
						highlight: true
					},
					popUpDiv
				);
				mapPopup.startup();

				esriBasemaps.metCouncilWebMercator = {
					baseMapLayers: [
						{ url: 'https://arcgis.metc.state.mn.us/arcgis/rest/services/BaseLayer/BasemapWM/MapServer' }
					],
					title: 'MetCouncil'
				};
				esriBasemaps.transitVector = {
					title: 'Basemap',
					baseMapLayers: [{ url: '/js/basemapStylev3.json', type: 'VectorTile' }]
				};

				MAP = new Map(mapElementID, {
					autoResize: true,
					logo: false,
					showAttribution: false,
					infoWindow: mapPopup,
					sliderPosition: 'bottom-right',
					basemap: 'transitVector',
					maxZoom: 18,
					minZoom: 9,
					center: [-93.18, 44.93],
					zoom: 10
				});

				MAP.on('resize', function (extent, width, height) { });

				MAP.on('update-start', function () {
					$('.mapLoading').show();
				});
				MAP.on('update-end', function (err) {
					$('.mapLoading').hide();
				});

				var _layerErrorCount = 0;
				MAP.on('layers-add-result', function (result) {
					if (_layerErrorCount > 0) {
						// If we encounter a service error, assume the page is broken, display an alert and
						// replace the page contents with an error text.
						$('#networkNextMapContainer').html('We are currently experiencing difficulties and are unable to display this page at this time.');
						alert('One or more geographic services needed for this map have failed to load properly.' +
							'\n\nBecause of this, the map may not work as expected. \n\nWe are working to correct the probelm.');
					}
					//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
					dfd.resolve();
					//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
				});
				MAP.on('layer-add-result', function (result) {
					if (result.error) {
						console.error('Layer add ' + result.error + ' for ' + result.layer.url);
						_layerErrorCount++
					}
				});
				MAP.on('click', function (evt) {
					idMap(evt);
				});
				var layerMetroRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'metroRoutes',
						opacity: 1,
						visible: false
					}
				);
				layerMetroRoutes.setImageFormat('svg');
				layerMetroRoutes.setVisibleLayers([0]);

				var layerHiFreqRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'hiFreqRoutes',
						opacity: 1,
						visible: false
					}
				);
				layerHiFreqRoutes.setImageFormat('svg');
				layerHiFreqRoutes.setVisibleLayers([1]);

				var layerLocalRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'localRoutes',
						opacity: 0.6,
						visible: true
					}
				);
				layerLocalRoutes.setImageFormat('svg');
				layerLocalRoutes.setVisibleLayers([2]);

				var layerExpressRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'expressRoutes',
						opacity: 1,
						visible: false
					}
				);
				layerExpressRoutes.setImageFormat('svg');
				layerExpressRoutes.setVisibleLayers([3]);

				var layerSubRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'subRoutes',
						opacity: 1,
						visible: false
					}
				);
				layerSubRoutes.setImageFormat('svg');
				layerSubRoutes.setVisibleLayers([4]);


				// var routesProposedLayer = new ArcGISDynamicMapServiceLayer(
				// 	ROUTE_MAPSERVICE,
				// 	{
				// 		id: 'routesProposed',
				// 		opacity: 0.7,
				// 		visible: false
				// 	}
				// );
				// routesProposedLayer.setImageFormat('svg');
				// routesProposedLayer.setVisibleLayers([0]);

				// =========================================================================================
				// this feature layer is visible but transparent and overlays all the new and proposed existing changes
				// =========================================================================================
				// var template = new PopupTemplate();
				// template.setTitle('Stop Number: ${site_id}');
				// template.setContent(function (graphic) {
				// 	//console.dir(graphic);
				// 	var a = graphic.attributes;
				// 	var content = '<strong>' + a.location + '</strong><br/>';
				// 	return content;
				// });
				// ===================================================================
				// This layer services the map click to determine which routes
				// services a specific point
				// ===================================================================
				var allRoutesLayer = new FeatureLayer(
					'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/4',
					{
						id: 'allRoutes',
						mode: FeatureLayer.MODE_SNAPSHOT,
						//infoTemplate: template,
						opacity: 0,
						visible: true,
						outFields: ['*']
					}
				);

				allRoutesLayer.on('mouse-over', function () {
					MAP.setMapCursor('pointer');
				});
				allRoutesLayer.on('mouse-out', function () {
					MAP.setMapCursor('default');
				});
				var mapLayers = [
					layerMetroRoutes,
					//layerHiFreqRoutes,
					layerLocalRoutes,
					layerExpressRoutes,
					layerSubRoutes,
					allRoutesLayer
				];
				MAP.addLayers(mapLayers);

				MAP.on('load', function () {
					GEOLOCATE = new LocateButton(
						{
							map: MAP,
							scale: 10000
						},
						'networkNextMapLocate'
					);
					GEOLOCATE.startup();
					GEOLOCATE.on('locate', function (result) {
						on.once(MAP, 'click', function () {
							GEOLOCATE.clear();
						});
					});
					var scalebar = new Scalebar({
						map: MAP,
						attachTo: 'bottom-left',
						scalebarUnit: 'english'
					});

					// var layerInfo = [{ layer: routeLayer, title: ' ' }];
					// var mapLegend = new Legend(
					// 	{
					// 		map: MAP,
					// 		//layerInfos: layerInfo,
					// 		respectCurrentMapScale: false,
					// 		autoUpdate: false
					// 	},
					// 	'networkNextMapLegend'
					// );
					// mapLegend.startup();

					// var toggle = new BasemapToggle({
					// 	map: MAP,
					// 	basemap: "satellite"
					// }, "nnBasemapToggle");
					// toggle.startup();

					require(['dijit/form/Button'], function (Button) {
						var bImagery = new Button({
							id: 'bImagery',
							label: 'Aerials',
							title: 'Click to toggle imagery',
							'class': 'bImagery',
							onClick: function () {
								if (MAP.getBasemap() === 'hybrid') {
									MAP.setBasemap('transitVector');
									$('#bImagery').html('Aerials');
								} else {
									MAP.setBasemap('hybrid');
									$('#bImagery').html('Basemap');
								}
							}
						});
						bImagery.placeAt($('#nnBasemapToggle')[0]);
						bImagery.startup();
					});

					MAP.disableScrollWheel();

					createRouteList();
					// When route dropdown changes, draw it
					$('#nnRoute').change(function () {
						let routeId = this.value;
						if (routeId !== '') {
							toggleRoute(routeId, true);
						}
					});
					$('#networkNextMapLayer1').click(function () {
						updateLayersByType(1);
					});
					$('#networkNextMapLayer2').click(function () {
						updateLayersByType(2);
					});
					$('#networkNextMapLayer3').click(function () {
						updateLayersByType(3);
					});
					$('#networkNextMapLayer4').click(function () {
						updateLayersByType(4);
					});
					$('#networkNextTimeSelect1').click(function () {
						updateLayersByTime(1);
					});
					$('#networkNextTimeSelect2').click(function () {
						updateLayersByTime(2);
					});
					$('#networkNextTimeSelect3').click(function () {
						updateLayersByTime(3);
					});
					$('#networkNextTimeSelect4').click(function () {
						updateLayersByTime(4);
					});
				});
			});
		}).promise();
	};
	return {
		centerMarkerAtPoint: centerMarkerAtPoint,
		toggleRoute: toggleRoute,
		commentFormSubmit: commentFormSubmit,
		init: init
	};
})(jQuery, window, document);

$(function () {
	// ----------------------------------------------------
	// Network Next Maps
	// ----------------------------------------------------
	if ($('#networkNextMap').length) {
		// This one loads the Search field in the Network Next page -- the search result
		// automatically sets the map to zoom to the requested location
		AutocompleteAddress.init(
			'networkNextMapSearch',
			/*UTMout*/ false,
			function () {
				var choice = AutocompleteAddress.getChoice(
					'networkNextMapSearch'
				);
				NetworkNextMap.centerMarkerAtPoint(
					choice.location.x,
					choice.location.y,
					15
				);
			}
		);

		NetworkNextMap.init('networkNextInteractiveMap').then(function () {
			console.log('Map loaded');
		});
	}

});
