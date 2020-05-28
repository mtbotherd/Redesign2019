'use strict';

var Main = (function($, window, document, undefined) {
	'use strict';

	var getCookie = function getCookie(check_name) {
		var a_all_cookies = document.cookie.split(';');
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false;
		var i = '';

		for (i = 0; i < a_all_cookies.length; i++) {
			a_temp_cookie = a_all_cookies[i].split('=');
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

			if (cookie_name === check_name) {
				b_cookie_found = true;

				if (a_temp_cookie.length > 1) {
					cookie_value = unescape(
						a_temp_cookie[1].replace(/^\s+|\s+$/g, '')
					);
				}

				return cookie_value;
				break;
			}

			a_temp_cookie = null;
			cookie_name = '';
		}

		if (!b_cookie_found) {
			return null;
		}
	};

	var setCookie = function setCookie(
		name,
		value,
		expires,
		path,
		domain,
		secure
	) {
		var today = new Date();
		today.setTime(today.getTime());

		if (expires) {
			expires = expires * 1000 * 60 * 60 * 24;
		}

		var expires_date = new Date(today.getTime() + expires);
		document.cookie =
			name +
			'=' +
			escape(value) +
			(expires ? ';expires=' + expires_date.toGMTString() : '') +
			(path ? ';path=' + path : '') +
			(domain ? ';domain=' + domain : '') +
			(secure ? ';secure' : '');
	};

	var deleteCookie = function deleteCookie(name, path, domain) {
		if (getCookie(name))
			document.cookie =
				name +
				'=' +
				(path ? ';path=' + path : '') +
				(domain ? ';domain=' + domain : '') +
				';expires=Thu, 01-Jan-1970 00:00:01 GMT';
	};

	var popupAlertNotice = function popupAlertNotice(cookieID, expire) {
		if ($('.alert-popup').length) {
			if (
				cookieID.substring(0, 3) === 'pop' &&
				getCookie('PopupNoticeShown' + cookieID) !== 'true'
			) {
				setCookie('PopupNoticeShown' + cookieID, 'true', expire);
				$('<div />')
					.prependTo('body')
					.addClass('alert-popup-overlay');
				$('body').addClass('hidden-overflow');
				$('.alert-popup').show();
				$('button[data-dismiss="alert"]').on('click', function() {
					$('.alert-popup').hide();
					$('.alert-popup-overlay').remove();
					$('body').removeClass('hidden-overflow');
				});
			}
		}

		if ($('.alert-topmargin').length) {
			if (
				cookieID.substring(0, 3) === 'top' &&
				getCookie('PopupNoticeShown' + cookieID) !== 'true'
			) {
				$('body').prepend($('.alert-topmargin').show());
			}

			$('.alert-topmargin').on('close.alert-topmargin', function() {
				setCookie('PopupNoticeShown' + cookieID, 'true', expire);
			});
		}
	};

	var enterKeyPressHandler = function enterKeyPressHandler(f, t) {
		var field = $(f);
		field.on('focus', function() {
			$(document).on('keydown', function(event) {
				if (field.attr('id') !== event.target.id) return;
				if (field.val() === '') return;

				if (event.which === 13) {
					event.preventDefault();
					$(t).trigger('click');
				}
			});
		});
		field.on('blur', function() {
			$(document).off('keydown');
		});
	};

	var init = function init() {
		// shopping cart number
		var qty = getCookie('cart_status');

		if (qty !== null && qty > 0) {
			$('<span/>', {
				class: 'badge badge-info',
			})
				.text(qty)
				.appendTo($('a.store-icon'));
		} // Initialize Bootstrap Popover

		$('[data-toggle="popover"]').popover({
			html: true,
			trigger: 'focus',
		});
		$('#header img.active').hide();
		var navImg = $('#header .nav-item');
		$(navImg).hover(
			function() {
				$(this)
					.find('img.inactive')
					.hide();
				$(this)
					.find('img.active')
					.show();
			},
			function() {
				$(this)
					.find('img.inactive')
					.show();
				$(this)
					.find('img.active')
					.hide();
			}
		); // Secondary nav set active item

		if ($('.secondary-nav').length) {
			$(
				'.secondary-nav > ul > li > a[href="' +
					location.pathname.replace('/', '\\/') +
					'"]'
			).addClass('active');
		} // Lost & found form - Mail item toggeler

		$('#mailItem').click(function() {
			if ($(this).is(':checked')) {
				$('#mailingAddress').fadeIn(300);
				$('#mailingAddress input').attr('required', 'required');
				$('#address2').removeAttr('required');
			} else if ($(this).is(':not(:checked)')) {
				$('#mailingAddress input').removeAttr('required');
				$('#mailingAddress').fadeOut(300);
			}
		}); // Google CSE

		$('#siteSearchBtn').on('click', function() {
			window.location =
				$('meta[name=metrotransit-org-uri]').attr('content') +
				'/website-search-results?q=' +
				encodeURI($('#siteSearch').val());
		});
		Main.enterKeyPressHandler('#siteSearch', '#siteSearchBtn');
	};

	return {
		init: init,
		enterKeyPressHandler: enterKeyPressHandler,
		popupAlertNotice: popupAlertNotice,
	};
})(jQuery, window, document);

$(function() {
	Main.init();
});
/* for google translate element in the footer */

function googleTranslateElementInit() {
	new google.translate.TranslateElement(
		{
			pageLanguage: 'en',
			includedLanguages: 'ar,zh,fr,de,ko,hmn,ru,es,so,vi',
			layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
			autoDisplay: false,
			gaTrack: true,
			gaId: 'UA-63539533-1',
		},
		'google_translate_element'
	);
}
