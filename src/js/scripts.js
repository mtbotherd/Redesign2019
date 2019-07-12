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
    })
})