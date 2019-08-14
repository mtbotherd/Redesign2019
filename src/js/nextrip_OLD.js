// Select route
$('.select-route-direction, .select-route-stop').hide();

// Get route data
$.ajax ({
    type: 'get',
    url: 'https://svc.metrotransittest.org/nextripv2/routes',
    dataType: 'json',
    success: function(result) {
        $.each(result, function(i, route) {
            $('#ntRoute').append('<option value="' + route.RouteId + '">' + route.Description + '</option>');
        });
    }
});


$('#ntRoute').change(function() {
    // Show Direction dropdown if not empty
    if ($(this).val() != '') {
        $('.select-route-direction').fadeIn('slow').css('display', 'flex');
    } else {
        $('.select-route-direction, .select-route-stop').hide();
    }

    var routeSelected = $('#ntRoute option:selected').val();

    // Get route direction based on route selected (above).
    $.ajax ({
        type: 'get',
        url: 'https://svc.metrotransittest.org/nextripv2/directions/' + routeSelected,
        dataType: 'json',
        success: function(result) {
            $.each(result, function(i, direction) {
                $('#ntDirection').append('<option value="' + direction.DirectionId + '">' + direction.DirectionName + '</option>');
            });
        }
    });
});

$('#ntDirection').change(function() {
    // Show Stop dropdown
    if ($('#ntDirection').val() != '') {
        $('select-route-direction').fadeIn('slow').css('display', 'flex');
    } else {
        $('.nt-stop').hide();
    }

	var routeSelected = $('#ntRoute option:selected').val();
    var directionSelected = $('#ntDirection option:selected').val();

    // Get route direction based on route selected (above).
    $.ajax ({
        type: 'get',
        url: 'https://svc.metrotransittest.org/nextripv2/stops/' + routeSelected + "/" + directionSelected,
        dataType: 'json',
        success: function(result) {
            $.each(result, function(i, stop) {
                $('#ntStop').append('<option value="' + stop.PlaceCode + '">' + stop.Description + '</option>');
            });
        }
    });
});

$('#ntStop').change(function() {

	var routeSelected = $('#ntRoute option:selected').val();
    var directionSelected = $('#ntDirection option:selected').val();
	var stopSelected = $('#ntStop option:selected').val();
	
	$.ajax ({
        type: 'get',
        url: 'https://svc.metrotransittest.org/nextripv2/' + routeSelected + "/" + directionSelected + "/" + stopSelected,
        dataType: 'json'
    }).done(function(result) {
		$('#nextripDepartures').append(JSON.stringify(result))
	});
});