/***********************************************
			SVG icon interactions
***********************************************/
// Header menu
$('svg.active').hide();

var menu = $('#header .nav-item');
$(menu).hover(function() {
	$(this).find('svg.active').show();
	$(this).find('svg.inactive').hide();
}, function() {
	$(this).find('svg.inactive').show();
	$(this).find('svg.active').hide();
}
);

// Trip Tools Tabs
