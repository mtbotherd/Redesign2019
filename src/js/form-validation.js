$(function () {

	$("#aspnetForm").validate({
		debug: true,
        errorClass: "is-invalid",
        validClass: "is-valid",
		rules: {
			firstName: "required",
			lastName: "required"
		},
		messages: {
			firstName: "Please enter your first name.",
			lastName: "Please enter your last name."
		}
		// 	errorPlacement: function(error, element) {
		// 		error.appendTo(element.parent("div"));
		// 	},
	});
});