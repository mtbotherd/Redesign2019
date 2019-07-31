$(document).ready(function() {

    'use strict';

    $('#header img.active').hide();

    var navImg = $('#header .nav-item');
    $(navImg).hover(function() {
        $(this).find('img.inactive').hide();
        $(this).find('img.active').show();
    }, function() {
        $(this).find('img.inactive').show();
        $(this).find('img.active').hide();
    });

    // Display search bar
    $('.site-search').click(function() {
        $('#siteSearchBox').slideToggle();
        $('#siteSearch').focus();
    });

    /***********************************************
    		Trip Planner
    ***********************************************/
    // location switcher
    var inputs = $('.from-location, .to-location'),
        tmp
    $('.location-toggler').click(function() {
        tmp = inputs[0].value
        inputs[0].value = inputs[1].value
        inputs[1].value = tmp
    })

    // time & date inputs
    $('.time-elements').hide();
    $('#selectTime').on('change', function() {
        if (this.value == 'depart-at' || this.value == 'arrive-by') {
            $('.time-elements').show();
        } else {
            $('.time-elements').hide();
        }
    });

    /***********************************************
			NexTrip
	***********************************************/
    // Select route
    $('.select-route-direction, .select-route-stop').hide();
    $('.select-route').change(function() {
        if ($('select').val() != null) {
            $('.select-route-direction').fadeIn('slow').css('display', 'flex');
        } else {
            $('.select-route-direction, .select-route-stop').hide();
        }
    });

    // Select selectDirection
    $('.select-route-direction').change(function() {
        if ($('select').val() != null) {
            $('.select-route-stop').fadeIn('slow').css('display', 'flex');
        } else {
            $('.select-route-stop').hide();
        }
    });

});
