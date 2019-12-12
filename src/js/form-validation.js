$(function () {

	$("#aspnetForm").validate({
	// 	debug: true,
	errorClass: '',
	validClass: '',
	// 	rules: {
	// 		fromLocation: "required",
	// 		toLocation: "required"
	// 	},
	messages: {
		fromLocation: "h",
		toLocation: "Begin typing, then select an option from the list."
	}
	// 	errorPlacement: function(error, element) {
	// 		error.appendTo(element.parent("div"));
	// 	},
	});
});