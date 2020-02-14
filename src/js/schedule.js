var Schedule = (function($, window, document, undefined) {
	function _isValue(x) {
		// tests if value is NOT empty AND NOT blank and NOT NULL
		var str = x.toString(); // this allows zero to test as a valid value
		//console.write("test value is " + x)
		if (str) {
			return /\S/.test(str);
		}
		return false;
	}
	function _isNumber(x) {
		// tests if value is any sort of number with +/- or decimals
		if (_isValue(x)) {
			return !isNaN(x - 0);
		}
		return false;
	}
	function _isInteger(s) {
		// Numbers only, no +/- or decimals allowed
		if (_isNumber(s)) {
			return s.toString().search(/^[0-9]+$/) === 0;
		}
		return false;
	}

	var scheduleSelect = function() {
		var aTag = $('a[name="schedulepane"]');
		var pane = '#' + $(this).data('pane');
		$('.schedule-days>button.active').removeClass('active');
		$(this).addClass('active');
		$('.timetables>div.active').removeClass('active fade show');
		$(pane).addClass('active fade show');
		loadTimetable();
		$('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
	};

	var loadTimetable = function() {
		var pane = $('.timetables>div.active');
		if (!pane.data('isLoaded')) {
			$.get('/Schedules/Timetable.aspx', {
				scheduleID: pane.data('scheduleId'),
			}).done(function(data) {
				$('.timetables>div.active>.timetable-container').html(data);
				pane.data('isLoaded', true);
				if (
					navigator.userAgent.indexOf('Chrome') !== -1 &&
					navigator.userAgent.indexOf('Edge') === -1
				) {
					$('.schedule-scroll-body').addClass('no-pad');
				}
			});
		}
	};

	var searchSchedules = function() {
		var term = $('#schedulesByRoute').val();
		if (term.length) {
			var terms = term
				.toLowerCase()
				.trim()
				.split(' ');
			var dict = {
				north: 888,
				northstar: 888,
				blue: 901,
				green: 902,
				red: 903,
				a: 921,
				c: 923,
			};
			var notFound = true;
			terms.forEach(function(item) {
				if (_isInteger(item)) {
					location.assign('/route/' + item);
					notFound = false;
				} else if (_isInteger(dict[item])) {
					location.assign('/route/' + dict[item]);
					notFound = false;
				}
			});

			if (notFound) location.assign('/route/0');
		}
	};

	var init = function(routeAbbr) {
		if (',901,902,906,888,'.indexOf(',' + routeAbbr + ',') > -1) {
			$('#showMyBus button h3').text('Show my train');
		} else {
			$('#showMyBus button h3').text('Show my bus');
		}

		Alerts.getAlertsForRoute(routeAbbr);

		loadTimetable();

		$('.schedule-days>button').on('click', scheduleSelect);
		$('#maplink').on('click', function() {
			window.location.href = '/imap/' + $(this).data('link');
		});
		$('#printlink').on('click', function() {
			window.print();
		});

		$(document).on('keydown', function(event) {
			if ($('body').hasClass('purgeable')) {
				if (event.ctrlKey && event.key === 'y') {
					document.forms[0].submit();
				}
			}
		});

		if ($('#routeBOM').attr('maptype') === 'BOM') {
			let parms = {
				stopID: null, // optional stop, if route too then show just the one route
				routeID: routeAbbr, // optional route, if no stop - show vehicles on route, if 0 - show all
				zoomToNearestBus: true, // when drawing buses the first time, zoom out until you find a bus to show
				stopZoomLevel: 16, // Web Mercator level to intially zoom the stop extent, if stopID has a value
			};
			BOM.init('routeBOM');
			$('#collapseMap').on('shown.bs.collapse', function() {
				BOM.startBusesOnMap(parms);
			});
			$('#collapseMap').on('hidden.bs.collapse', function() {
				BOM.stopBusesOnMap();
			});
		}
	};

	return {
		init: init,
		searchSchedules: searchSchedules,
	};
})(jQuery, window, document);
