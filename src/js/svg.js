$('svg.active').hide();

var dropdown = $('#header .dropdown');
$(dropdown).hover(function() {
	$(this).find('svg.active').show();
	$(this).find('svg.normal').hide();
}, function() {
	$(this).find('svg.normal').show();
	$(this).find('svg.active').hide();
}
);

// var rotated = false;
// $(dropdown).click(function() {
// 	if (!rotated) {
// 	$(this).find('.dropdown-toggle').addClass('active');
// 	$(this).find("svg.active").css({ "transform": "rotate(180deg)" });
// 	} else {
// 	$(this).find('.dropdown-toggle').removeClass('active');
// 	$(this).find("svg.normal").css({ "transform": "rotate(0deg)" });
// 	}
// 	// Toggle the flag
// 	//rotated = !rotated;
// });