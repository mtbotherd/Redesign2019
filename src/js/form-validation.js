$(function() {
	$('#aspnetForm').validate({
		debug: true,
		errorElement: 'div',
		errorClass: 'is-invalid',
		validClass: 'is-valid',
		rules: {
			firstName: 'required',
			lastName: 'required',
			address: 'required',
			city: 'required',
			state: 'required',
			zipCode: {
				required: true,
				number: true,
			},
			phone: {
				required: true,
				phoneUS: true,
			},
			email: {
				required: true,
				email: true,
			},
			dob: 'required',
			photoID: 'required',
			certificate: 'required',
		},
		messages: {
			firstName: 'Please provide your first name.',
			lastName: 'Please provide your last name.',
			streetAddress: 'Please provide your address.',
			city: 'Please provide your city.',
			state: 'Please provide your state.',
			zipCode: {
				required: 'Please provide your zip code.',
				number: 'Please enter numbers only.',
			},
			phone: {
				required: 'Please provide your phone number.',
				phoneUS: 'Please provide a valid phone number.',
			},
			email: 'Please provide a valid email address.',
			dob: 'Please provide your date of birth.',
			photoID: 'Please attach a photo ID.',
			certificate: 'Please attach a valid certificate.',
		},
		errorPlacement: function(error, element) {
			// Add the `help-block` class to the error element
			error.addClass('help-block');

			element
				.parents('.form-group, .input-group, .custom-control')
				.addClass('has-feedback');

			if (
				element.prop('type') === 'checkbox' ||
				element.prop('type') === 'radio' ||
				element.prop('type') === 'file'
			) {
				error.appendTo(element.parents('.custom-control'));
			} else {
				error.appendTo(element.parents('.form-group, .input-group'));
			}
		},
		highlight: function(element, errorClass, validClass) {
			$(element)
				.parents('.form-group, .input-group, .custom-control')
				.addClass(errorClass)
				.removeClass(validClass);

			// Sets error icon.
			$(element)
				.next('.alert-red')
				.show();
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element)
				.parents('.form-group, .input-group, .custom-control')
				.addClass(validClass)
				.removeClass(errorClass);
			$(element)
				.next('.alert-red')
				.remove();
		},
	});
});
