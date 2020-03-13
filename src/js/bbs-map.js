var bbsMap = (function($, window, document) {
	'use strict';
	var MAP = null; // this is the main MAP object
	var GEOLOCATE = null; // this is the locate button object

	var _isEmpty = function _isEmpty(str) {
		return (!str || 0 === str.length);
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


	//@@@@@@@@@@@@@@@@@@@@
	//@@@  I N I T @@@@@@@
	//@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@
	var init = function(mapElementID) {
		return $.Deferred(function(dfd) {
			require([
				'esri/map',
				'esri/basemaps',
				'esri/Color',
				'esri/SpatialReference',
				'esri/geometry/Extent',
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
				'dojo/on',
				'dojo/domReady!',
			], function(Map, esriBasemaps, Color, SpatialReference, 
				Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, Query, QueryTask,
				SimpleMarkerSymbol, Scalebar, Legend, Popup, PopupTemplate, LocateButton, on) {
				//===================================================================================
				//  START OF MAP INITIALIZATION =====================================================
				//===================================================================================
				const spatialRefWM = new SpatialReference({ wkid: 3857 });
				const initExtent = new Extent({
					xmin: -10385405,
					ymin: 5615111,
					xmax: -10379460,
					ymax: 5619877,
					spatialReference: spatialRefWM,
				});
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
					baseMapLayers: [
						{ url: '/js/basemapStylev3.json', type: 'VectorTile' },
					],
				};

				MAP = new Map(mapElementID, {
					autoResize: true,
					logo: false,
					showAttribution: true,
					infoWindow: mapPopup,
					sliderPosition: 'bottom-right',
					basemap: 'transitVector',
					maxZoom: 18,
					minZoom: 10,
					center: [-93.27, 44.975],
					zoom: 12,
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

				var sheltersLayer = new ArcGISDynamicMapServiceLayer(
					'https://arcgis.metc.state.mn.us/arcgis/rest/services/transit/BetterBusStops/MapServer',
					{
						id: 'shelters',
						opacity: 0.6,
					}
				);
				sheltersLayer.setImageFormat('svg');
				sheltersLayer.setVisibleLayers([6]);

				var newSheltersLayer = new ArcGISDynamicMapServiceLayer(
					'https://arcgis.metc.state.mn.us/arcgis/rest/services/transit/BetterBusStops/MapServer',
					{
						id: 'newShelters',
						opacity: 1,
					}
				);
				newSheltersLayer.setImageFormat('svg');
				newSheltersLayer.setVisibleLayers([3]);

				var improvementsLayer = new ArcGISDynamicMapServiceLayer(
					'https://arcgis.metc.state.mn.us/arcgis/rest/services/transit/BetterBusStops/MapServer',
					{
						id: 'improvements',
						opacity: 1,
					}
				);
				improvementsLayer.setImageFormat('svg');
				improvementsLayer.setVisibleLayers([5,4,2,1,0]);

				// this feature layer is visible but transparent and overlays all the new and proposed existing changes
				// =========================================================
				var template = new PopupTemplate();
				template.setTitle('Stop Number: ${site_id}');
				template.setContent(function (graphic) {
					//console.dir(graphic);
					var a = graphic.attributes;
					var content = '<strong>'+ a.location +'</strong><br/>';
					if (a.New) { content += '<strong>&mdash;</strong> Adding a new shelter in ' + a.New + '<br/>';}
					if (a.Replacement) { content += '<strong>&mdash;</strong> Replacing shelter in ' + a.Replacement + '<br/>';}
					if (a.Remove) { content += '<strong>&mdash;</strong> Removing shelter in ' + a.Remove + '<br/>';}
					if (a.AddLight) { content += '<strong>&mdash;</strong> Adding lights in ' + a.AddLight + '<br/>';}
					if (a.SolarLight) { content += '<strong>&mdash;</strong> Adding solar lighting in ' + a.SolarLight + '<br/>';}
					if (a.AddHeat) { content += '<strong>&mdash;</strong> Adding heat in ' + a.AddHeat + '<br/>';}
					if (a.AddPad) { content += '<strong>&mdash;</strong> Adding a boarding pad in ' + a.AddPad + '<br/>';}
					return content;
				});
				// =========================================================
				 var refFeatureLayer = new FeatureLayer(
					'https://arcgis.metc.state.mn.us/arcgis/rest/services/transit/BetterBusStops/MapServer/7', {
				 	id: 'allFeatures',
				 	mode: FeatureLayer.MODE_SNAPSHOT,
				 	infoTemplate: template,
				 	opacity: 0,
				 	visible: true,
				 	outFields: ["*"]
				 });

				MAP.infoWindow.resize( 280, 260 );

				on(refFeatureLayer, "mouse-over", function () {
					MAP.setMapCursor("pointer");
				});
				on(refFeatureLayer, "mouse-out", function () {
					MAP.setMapCursor("default");
				});

				var mapLayers = [
						sheltersLayer,
						newSheltersLayer,
						improvementsLayer,
						refFeatureLayer
					];
				MAP.addLayers(mapLayers);

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
					var layerInfo = [
						{layer: sheltersLayer, title: " "},
						{layer: newSheltersLayer, title: " "},
						{layer: improvementsLayer, title: " "}
					];
					var mapLegend = new Legend({
						map: MAP,
						layerInfos: layerInfo
					}, "betterStopsLegend");
					mapLegend.startup();

					MAP.disableScrollWheel();

					// Add a list of text descriptions of the better bus stop improvements
					// These are hidden for the screen reader
					var query = new Query();
					var queryTask = new QueryTask('https://arcgis.metc.state.mn.us/arcgis/rest/services/transit/BetterBusStops/MapServer/7');
					query.returnGeometry = false;
					query.where = '1=1'; // fetch all features
					query.orderByFields=['site_id'];
					query.outFields = ['TextDescription'];
					queryTask.execute(query);
					queryTask.on('error', function(err) {
						console.warn('Improvements Query Error: ' + err);
					});
					queryTask.on('complete', function(fSet) {
						console.log("TextDescription Query Complete. There are " + fSet.featureSet.features.length + " features");
						fSet.featureSet.features.forEach(function (feature, idx) {
							$('.bbsTextDescriptions').append('<div>'+feature.attributes.TextDescription+'</div>');
						});
					});
					
				});
			});
		}).promise();
	};
	return {
		centerMarkerAtPoint: centerMarkerAtPoint,
		toggleLayer: toggleLayer,
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
			'bbsMapSearch',
			/*UTMout*/ false,
			function() {
				var choice = AutocompleteAddress.getChoice(
					'bbsMapSearch'
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
			bbsMap.toggleLayer('newShelters', /*zoomLevel*/ 12);
		});
		$('#betterStopsMapLayer2').click(function() {
			bbsMap.toggleLayer('improvements', /*zoomLevel*/ 12);
		});
	}
});
