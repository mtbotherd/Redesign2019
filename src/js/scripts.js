$(function() {
	"use strict";

	/***********************************************
			  Trip Planner
	  ***********************************************/
	// location switcher
	var inputs = $(".from-location, .to-location"),
	  tmp,
	  loctmp;
  
	$(".location-toggler").click(function() {
	  tmp = inputs[0].value;
	  inputs[0].value = inputs[1].value;
	  inputs[1].value = tmp;
	  AutocompleteAddress.exchangeValues("fromLocation", "toLocation");
	});

	// Drop down for "From" input
	$("input.dropdown").dropdown();

    $(".time-elements").hide();
    $("#selectTime").on("change", function () {
        // time & date inputs
		var currentDate = function () {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			var min = today.getMinutes();
			var hrs = today.getHours();
			hrs = hrs < 10 ? '0' + hrs : hrs;
			min = min < 10 ? '0' + min : min;
			dd = dd < 10 ? '0' + dd : dd;
			mm = mm < 10 ? '0' + mm : mm;
			today = { date: yyyy + '-' + mm + '-' + dd, time: hrs + ":" + min };
			return today;
		};
        if (this.value === "depart-at" || this.value === "arrive-by") {
            $("#date").attr('value', currentDate().date);
            $("#time").attr('value', currentDate().time);
            $(".time-elements").slideDown();
        } else {
            $(".time-elements").slideUp();
        }
    });
});

var Main = (function ($, window, document, undefined) {

    'use strict';

    var getCookie = function (check_name) {
        var a_all_cookies = document.cookie.split(';'); var a_temp_cookie = ''; var cookie_name = ''; var cookie_value = ''; var b_cookie_found = false; var i = ''; for (i = 0; i < a_all_cookies.length; i++) {
            a_temp_cookie = a_all_cookies[i].split('='); cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, ''); if (cookie_name == check_name) {
                b_cookie_found = true; if (a_temp_cookie.length > 1) { cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, '')); }
                return cookie_value; break;
            }
            a_temp_cookie = null; cookie_name = '';
        }
        if (!b_cookie_found) { return null; }
    }

    var setCookie = function (name, value, expires, path, domain, secure) {
        var today = new Date(); today.setTime(today.getTime()); if (expires) { expires = expires * 1000 * 60 * 60 * 24; }
        var expires_date = new Date(today.getTime() + (expires)); document.cookie = name + "=" + escape(value) +
            ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
    }

    var deleteCookie = function (name, path, domain) {
        if (getCookie(name)) document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }

    var popupAlertNotice = function (cookieID, expire) {
        if ($('#special-alert-notice').hasClass('alert-popup')) {
            if (cookieID.substring(0, 3) === 'pop' &&
                getCookie('PopupNoticeShown' + cookieID) !== 'true') {
                setCookie('PopupNoticeShown' + cookieID, 'true', expire);
                $('<div />').prependTo('body').addClass('alert-popup-overlay');
                $('body').addClass('hidden-overflow');
                $('#special-alert-notice').show();
                $('#special-alert-notice .fa-close').one('click', function () {
                    $('#special-alert-notice').hide();
                    $('.alert-popup-overlay').remove();
                    $('body').removeClass('hidden-overflow');
                });
            }
        }

        if ($('#special-alert-notice').hasClass('alert-topmargin')) {
            if (cookieID.substring(0, 3) === 'top' &&
                getCookie('PopupNoticeShown' + cookieID) !== 'true') {
                $('body').prepend($('#special-alert-notice').show());
            }
            $('#special-alert-notice').on('close.bs.alert', function () {
                setCookie('PopupNoticeShown' + cookieID, 'true', expire);
            });
        }
    };

    var enterKeyPressHandler = function (f, t) {
        var field = $(f);
        field.on('focus', function () {
            $(document).on('keydown', function (event) {
                if (field.attr('id') !== event.target.id) return;
                if (field.val() == '') return;
                if (event.which == 13) {
                    event.preventDefault();
                    $(t).trigger('click');
                }
            });
        });
        field.on('blur', function () { $(document).off('keydown'); });
    };

    var init = function () {
        // Bootstrap Popover with HTML
        $('[data-toggle="popover"]').popover({
            html: true,
            trigger: 'click'
        });

        $("#header img.active").hide();

        var navImg = $("#header .nav-item");
        $(navImg).hover(
            function () {
                $(this)
                    .find("img.inactive")
                    .hide();
                $(this)
                    .find("img.active")
                    .show();
            },
            function () {
                $(this)
                    .find("img.inactive")
                    .show();
                $(this)
                    .find("img.active")
                    .hide();
            }
        );

        // Secondary nav set active item
        if ($('.secondary-nav').length) {
            $('.secondary-nav > ul > li > a[href=' + location.pathname.replace('/', '\\/') + ']').addClass('active');
        }
    };

    return {
        init: init,
        enterKeyPressHandler: enterKeyPressHandler,
        popupAlertNotice: popupAlertNotice
    };

})(jQuery, window, document);

$(function () {
    Main.init();
});
