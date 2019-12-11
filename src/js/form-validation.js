$(function () {

	$("#aspnetForm").validate({
		debug: true,
		errorClass: 'is-invalid',
		rules: {
			fromLocation: "required",
			toLocation: "required"
		},
		messages: {
			fromLocation: "Begin typing, then select an option from the list.",
			toLocation: "Begin typing, then select an option from the list."
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent("div"));
		},
	});
});