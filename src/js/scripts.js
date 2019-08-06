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

    // Get json data
    // var JSONPLAN = null;
    // $.ajax({
    //     type: 'get',
    //     url: 'TripPlan.json',
    //     dataType: 'json'
    // })
    // .done(function(result, status, xhr) {
    //     console.dir(result);
    //     JSONPLAN = result;
    // })
    // .fail(function(err) {
    //     console.warn('Fetch TripPlan - No trip found ' + err);
    // });

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

    // Get json data

    // var ntRouteOptions;
    // var ntDirectionOptions;
    //
    // $.ajax ({
    //     type: 'get',
    //     //url: 'http://svc.metrotransit.org/NexTrip/Routes?format=json',
    //     url: 'https://svc.metrotransittest.org/nextripv2/routes',
    //     dataType: 'json',
    //     success: function(result) {
    //         $.each(result, function(i,ntRoute) {
    //             //console.log(ntRoute.Description);
    //             //<option value="Route">Route</option>
    //             ntRouteOptions += "<option value='" +  ntRoute.Route + "'>" + ntRoute.Description + "</option>";
    //         });
    //         $('#ntRoute').html(ntRouteOptions);
    //     }
    // });
    // $('#ntRoute').change(function() {
    //     if($(this).val() != null) {
    //         $.ajax ({
    //             type: 'get',
    //             url: 'http://svc.metrotransit.org/NexTrip/Directions/5?format=json',
    //             dataType: 'json',
    //             success: function(result) {
    //                 $.each(result, function(directionText,directionValue) {
    //                     //console.log(ntRoute.Description);
    //                     //<option value="Route">Route</option>
    //                     ntDirectionOptions += "<option value='" +  directionValue.Value + "'>" + directionText.Text + "</option>";
    //                 });
    //                 $('#ntDirection').html(ntDirectionOptions);
    //             }
    //         });
    //     }
    // });

    /*************************************************
    * Trip Plans
    ************************************************/
    // var JSONPLAN = null;
    // $.ajax({
    //     type: 'get',
    //     url: 'TripPlan.json',
    //     dataType: 'json'
    // })
    // .done(function(result, status, xhr) {
    //     console.dir(result);
    //     JSONPLAN = result;
    // })
    // .fail(function(err) {
    //     console.warn('Fetch TripPlan - No trip found ' + err);
    // });
});
