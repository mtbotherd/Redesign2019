// Trip Planner
var inputs = $('.tp-from-location, .tp-to-location'),
	tmp
$('.icon-sm-switch-blue').click(function() {
	tmp = inputs[0].value
	inputs[0].value = inputs[1].value
	inputs[1].value = tmp
})
