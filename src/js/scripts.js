var Main = (function ($, window, document, undefined) {

    'use strict';

    var getCookie = function (check_name) {
        var a_all_cookies = document.cookie.split(';'); var a_temp_cookie = ''; var cookie_name = ''; var cookie_value = ''; var b_cookie_found = false; var i = ''; for (i = 0; i < a_all_cookies.length; i++) {
            a_temp_cookie = a_all_cookies[i].split('='); cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, ''); if (cookie_name === check_name) {
                b_cookie_found = true; if (a_temp_cookie.length > 1) { cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, '')); }
                return cookie_value; break;
            }
            a_temp_cookie = null; cookie_name = '';
        }
        if (!b_cookie_found) { return null; }
    };

    var setCookie = function (name, value, expires, path, domain, secure) {
        var today = new Date(); today.setTime(today.getTime()); if (expires) { expires = expires * 1000 * 60 * 60 * 24; }
        var expires_date = new Date(today.getTime() + (expires)); document.cookie = name + "=" + escape(value) +
            ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
    };

    var deleteCookie = function (name, path, domain) {
        if (getCookie(name)) document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    };

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
                if (field.val() === '') return;
                if (event.which === 13) {
                    event.preventDefault();
                    $(t).trigger('click');
                }
            });
        });
        field.on('blur', function () { $(document).off('keydown'); });
    };

    var init = function () {
        // shopping car number
        let qty = getCookie('cart_status');
        if (qty !== null && qty > 0) {
            $('<span/>', { class: 'badge badge-info' }).text(qty).appendTo($('a.store-icon'));
        }

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
		
		// Google CSE
		$('#siteSearchBtn').on('click', function() {
			window.location = "/website-search-results?q=" + encodeURI ($('#siteSearch').val());
		});
		Main.enterKeyPressHandler('#siteSearch', '#siteSearchBtn');
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
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ar,zh,fr,de,ko,hmn,ru,es,so,vi',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        gaTrack: true,
        gaId: 'UA-63539533-1'
    },
        'google_translate_element'
    );
}
