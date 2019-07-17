$(document).ready(function() {
    /***********************************************
    		SVG icon interactions
    ***********************************************/
    $('#header svg.active').hide();

    var navSvg = $('#header .nav-item');
    $(navSvg).hover(function() {
        $(this).find('svg.active').show();
        $(this).find('svg.inactive').hide();
    }, function() {
        $(this).find('svg.inactive').show();
        $(this).find('svg.active').hide();
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

    // Collapse - rotate icon
    $('.accordion .btn').click(function() {
        $(this).hasCass('collapsed').find('.icon-chevron-down-blue').toggleClass('rotate-180');
    });
});