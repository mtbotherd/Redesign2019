// Select route
$('.nt-direction, .nt-stop').hide();

// Get route data
$.ajax ({
    type: 'get',
    url: 'https://svc.metrotransittest.org/nextripv2/routes',
    dataType: 'json',
    success: function(result) {
        $.each(result, function(i, ntRoute) {
            $('#ntRoute').append('<option value="' + ntRoute.RouteId + '">' + ntRoute.Description + '</option>');
        });
    }
});


$('#ntRoute').change(function() {
    // Show Direction dropdown if not empty
    if ($('#ntRoute').val() != null) {
        $('.nt-direction').fadeIn('slow').css('display', 'flex');
    } else {
        $('.nt-direction, .nt-stop').hide();
    }

    var routeSelected = $('#ntRoute option:selected').val();

    // Get route direction based on route selected (above).
    $.ajax ({
        type: 'get',
        url: 'https://svc.metrotransittest.org/nextripv2/directions/' + routeSelected + '',
        dataType: 'json',
        success: function(result) {
            $.each(result, function(i, routeSelected) {
                $('#ntDirection').append('<option value="' + routeSelected.DirectionId + '">' + routeSelected.DirectionName + '</option>');
            });
        }
    });
});

$('#ntDirection').change(function() {
    // Show Stop dropdown
    if ($('#ntDirection').val() != null) {
        $('.nt-stop').fadeIn('slow').css('display', 'flex');
    } else {
        $('.nt-stop').hide();
    }

    var directionSelected = $('#ntDirection option:selected').val() + '';

    // Get route direction based on route selected (above).
    $.ajax ({
        type: 'get',
        url: 'https://svc.metrotransittest.org/nextripv2/' + directionSelected.StopId +  '',
        dataType: 'json',
        success: function(result) {
            $.each(result, function(i, directionSelected) {
                //console.log(ntRoute.Description);
                //<option value="Route">Route</option>
                $('#ntDirection').append('<option value="' + directionSelected.StopId + '">' + directionSelected.Description + '</option>');
            });
        }
    });
});
