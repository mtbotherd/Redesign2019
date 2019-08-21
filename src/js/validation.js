$(function () {

	'use strict';
	
	// Exampl of jQuery Validate
	$('#formId').validate({ // replace "#formId" with the id of your form.
		debug: true,
		rules: {
			stopNumber: {
				required: true,
				minlength: 4
			}
		},
		messages: {
			stopNumber: {
				required: 'Please enter a stop number',
				minlength: 'Must be a minimum of four numbers'
			}
		},
		onfocusout: function(element) {
			this.element(element); // triggers validation
		},
		errorElement: 'div',

		// Replaces default .has-error class with Bootstrap 4 .is-valid class
		errorClass: 'is-invalid',
		// Replaces default .has-succes class with Bootstrap 4 .is-valid class
		validClass: 'is-valid',

		errorPlacement: function(error, element) {
			// Add the `help-block` class to the error element
			error.addClass('help-block');

			element.parents('.input-group').addClass('has-feedback');

			$('<span class="form-control-feedback"></span>').insertAfter(element);
			error.appendTo(element.parents('.input-group'));
		},
		success: function(label, element) {},
		highlight: function(element, errorClass, validClass) {
			// Adds error '.is-invalid' for Bootstrap 4 styles.
			$(element).parents('.input-group').addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			// Adds valid class '.is-valid' for Bootstrap 4 styles.
			$(element).parents('.input-group').addClass(validClass).removeClass(errorClass);
		}
	});
});