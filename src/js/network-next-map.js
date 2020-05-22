var NetworkNextMap = (function ($, window, document) {
	'use strict';
	const ROUTE_MAPSERVICE =
		'https://arcgis.metc.state.mn.us/arcgis/rest/services/transit/NetworkNext/MapServer';

	var MAP = null; // this is the main MAP object
	var GEOLOCATE = null; // this is the locate button object
	var ROUTENAMES = null; // an object with the route number as the key and route name as the data
	var ROUTESTOSHOW = [];

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
	var drawRoutes = function (/*[string]*/ routes, /*string*/layerId, /*bool*/zoom) {
		zoom = typeof zoom !== 'undefined' ? zoom : false;
		var routeLayer = MAP.getLayer(layerId);
		if (!routeLayer) return;

		var routesQuery = [];
		routesQuery[4] = '1=0';
		if (routes) {
			routes = routes.filter(function (value, idx, arr) {
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
				.done(function (result, status, xhr) {
					if (result.features.length > 0) {
						require(['esri/geometry/Polyline'], function (Polyline) {
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
				.fail(function (err) {
					console.warn(
						'Routes fatal error fetching polylines: ' + err.Message
					);
				});
		}
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
	var toggleRoute = function (/*string*/route) {
		var i = ROUTESTOSHOW.indexOf(route); // check if the route already in the list
		if (i === -1) {
			ROUTESTOSHOW.push(route);
		} else {
			ROUTESTOSHOW.splice(i, 1);
		}
		drawRoutes(ROUTESTOSHOW, 'currentRoutes', /*zoom*/ false);
	}
	var formatRouteList = function formatRouteList(/*string*/routeList) {
		var w = routeList;
		if (typeof routeList === 'string') {
			var routestring = '';
			w = routeList.split(' ').sort(function (a, b) { return parseInt(a) - parseInt(b); });
		}
		if (w.length > 0) {
			for (var i = 0, len = w.length; i < len; i++) {
				if (i > 0) { routestring += '<br/>'; }
				var rt = w[i];
				var rtName = '';
				if (ROUTENAMES) rtName = ROUTENAMES[rt];
				var html = '<input id="cb' + rt + '"';
				html += 'onclick="javascript: NetworkNextMap.toggleRoute(' + rt + '); return true; "';
				html += 'type="checkbox"';
				var ix = ROUTESTOSHOW.indexOf(parseInt(rt)); // check if route already in the list
				if (ix !== -1) {
					html += ' checked="checked" ';
				}
				html += '/>';
				//html += '<label for='cb' + rt + ''><a href='https://www.metrotransit.org/route/' + rt + '' target='_blank'>' + rtName + '</a></label>';
				html += '<label for="cb' + rt + '">' + rtName + '</label>';
				routestring += html;
			}
		} else {
			routestring = '<span style="font-size:larger;">No routes service here.</span>';
		}
		//console.log(routestring);
		return routestring;
	};
	var idMapRoutes = function (evt) {
		require(['esri/tasks/query',
			'esri/tasks/QueryTask',
			'esri/geometry/Extent'
		],
			function (Query, QueryTask, Extent) {
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

					if (fSet.featureSet.features.length === 0) {
						console.warn('No features to show');
					}
					else {
						var features = fSet.featureSet.features;
						var routes = '';
						for (var i = 0, len = features.length; i < len; i++) {
							var f = features[i];
							var atts = f.attributes;
							if (i > 0) {
								routes += ' ';
							}
							routes += atts.LINE_ID;
						}
						var content = formatRouteList(routes);

						MAP.infoWindow.setTitle('Route Service');
						MAP.infoWindow.setContent(content);
						MAP.infoWindow.show(evt.screenPoint, MAP.getInfoWindowAnchor(evt.screenPoint));
					}
				});
			});
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
				'dojo/domReady!'
			], function (Map, esriBasemaps, Color, ArcGISDynamicMapServiceLayer, FeatureLayer,
				Query, QueryTask, SimpleMarkerSymbol, Scalebar, Legend, Popup, PopupTemplate, LocateButton) {

				var createRouteList = function () {
					var query = new Query();
					var queryTask = new QueryTask(
						'https://arcgis.metc.state.mn.us/transit/rest/services/transit/TRIM/MapServer/4'
					);
					query.returnGeometry = false;
					query.where = '1=1'; // extract them all
					query.outFields = ['ROUTENUM', 'ROUTEDESCRIPTION'];
					queryTask.execute(query);
					queryTask.on('error', function (err) {
						console.warn('createRouteList error');
						console.dir(err);
					});
					queryTask.on('complete', function (fSet) {
						if (fSet.featureSet.features.length > 0) {
							ROUTENAMES = {};
							// Outformat { "901": "METRO Blue Line" }
							for (let i = 0, l = fSet.featureSet.features.length; i < l; i++) {
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
					title: 'TransitVector',
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
							'\n\nBecause of this, the map may not work as expected. \n\nTry again later.');
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

				var layerMetroRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'metroRoutes',
						opacity: 1,
					}
				);
				layerMetroRoutes.setImageFormat('svg');
				layerMetroRoutes.setVisibleLayers([0]);
				var layerHiFreqRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'hiFreqRoutes',
						opacity: 1,
					}
				);
				layerHiFreqRoutes.setImageFormat('svg');

				layerHiFreqRoutes.setVisibleLayers([1]);
				var layerLocalRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'localRoutes',
						opacity: 1,
					}
				);
				layerLocalRoutes.setImageFormat('svg');
				layerLocalRoutes.setVisibleLayers([2]);

				var layerExpressRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'expressRoutes',
						opacity: 1,
					}
				);
				layerExpressRoutes.setImageFormat('svg');
				layerExpressRoutes.setVisibleLayers([3]);

				var layerSubRoutes = new ArcGISDynamicMapServiceLayer(
					ROUTE_MAPSERVICE,
					{
						id: 'subRoutes',
						opacity: 1,
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
				MAP.infoWindow.resize(300, 260);

				allRoutesLayer.on('mouse-over', function () {
					MAP.setMapCursor('pointer');
				});
				allRoutesLayer.on('mouse-out', function () {
					MAP.setMapCursor('default');
				});
				allRoutesLayer.on('click', function (evt) {
					idMapRoutes(evt);
				});

				var mapLayers = [
					layerMetroRoutes,
					layerHiFreqRoutes,
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

					MAP.disableScrollWheel();

					createRouteList();
				});
			});
		}).promise();
	};
	return {
		centerMarkerAtPoint: centerMarkerAtPoint,
		toggleLayer: toggleLayer,
		toggleRoute: toggleRoute,
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
		$('#networkNextMapLayer1').click(function () {
			NetworkNextMap.toggleLayer('metroRoutes');
		});
		$('#networkNextMapLayer2').click(function () {
			NetworkNextMap.toggleLayer('localRoutes');
		});
		$('#networkNextMapLayer1').click(function () {
			NetworkNextMap.toggleLayer('expressRoutes');
		});
		$('#networkNextMapLayer2').click(function () {
			NetworkNextMap.toggleLayer('subRoutes');
		});
	}

});
