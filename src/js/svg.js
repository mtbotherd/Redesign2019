$('svg.hover, svg.active').hide();

$('#header .dropdown').hover(function() {
	$(this).find('svg.hover').show();
	$(this).find('svg.normal').hide();
}, function() {
	$(this).find('svg.normal').show();
	$(this).find('svg.hover').hide();
}
);