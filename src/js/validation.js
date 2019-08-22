$(function () {

	'use strict';

	// Valiadte site search
	// $('#siteSearchButton').click(function () {
	// 	$('form').validate({
	// 		debug: true,
	// 		rules: {
	// 			siteSearch: {
	// 				required: true
	// 			}
	// 		},
	// 		messages: {
	// 			siteSearch: {
	// 				required: 'Please enter a search term'
	// 			}
	// 		},
	// 		errorElement: 'div',
	
	// 		// Replaces default .has-error class with Bootstrap 4 .is-valid class
	// 		errorClass: 'is-invalid',
	// 		// Replaces default .has-succes class with Bootstrap 4 .is-valid class
	// 		validClass: 'is-valid',
	
	// 		errorPlacement: function(error, element) {
	// 			// Add the `help-block` class to the error element
	// 			error.addClass('help-block');
	
	// 			element.parents('.input-group').addClass('has-feedback');
	
	// 			$('<span class="form-control-feedback"></span>').insertAfter(element);
	// 			error.appendTo(element.parents('.input-group'));
	// 		},
	// 		success: function(label, element) {},
	// 		highlight: function(element, errorClass, validClass) {
	// 			// Adds error '.is-invalid' for Bootstrap 4 styles.
	// 			$(element).parents('.input-group').addClass(errorClass).removeClass(validClass);
	// 		},
	// 		unhighlight: function(element, errorClass, validClass) {
	// 			// Adds valid class '.is-valid' for Bootstrap 4 styles.
	// 			$(element).parents('.input-group').removeClass(errorClass);
	// 		}
	// 	});
	// });
	
	// Valiadte Find schedules by route
	// $('#searchRoutesButton').click(function () {
	// 	$('form').validate({
	// 		debug: true,
	// 		rules: {
	// 			schedulesByRoute: {
	// 				required: true
	// 			}
	// 		},
	// 		messages: {
	// 			schedulesByRoute: {
	// 				required: 'Please enter a route number'
	// 			}
	// 		},
	// 		errorElement: 'div',
	
	// 		// Replaces default .has-error class with Bootstrap 4 .is-valid class
	// 		errorClass: 'is-invalid',
	// 		// Replaces default .has-succes class with Bootstrap 4 .is-valid class
	// 		validClass: 'is-valid',
	
	// 		errorPlacement: function(error, element) {
	// 			// Add the `help-block` class to the error element
	// 			error.addClass('help-block');
	
	// 			element.parents('.input-group').addClass('has-feedback');
	
	// 			$('<span class="form-control-feedback"></span>').insertAfter(element);
	// 			error.appendTo(element.parents('.input-group'));
	// 		},
	// 		success: function(label, element) {},
	// 		highlight: function(element, errorClass, validClass) {
	// 			// Adds error '.is-invalid' for Bootstrap 4 styles.
	// 			$(element).parents('.input-group').addClass(errorClass).removeClass(validClass);
	// 		},
	// 		unhighlight: function(element, errorClass, validClass) {
	// 			// Adds valid class '.is-valid' for Bootstrap 4 styles.
	// 			$(element).parents('.input-group').removeClass(errorClass);
	// 		}
	// 	});
	// });

	// Trip Planner validation
	/* to/from location */
	$('#planMyTrip').click(function () {
		$('form').validate({
			debug: true,
			rules: {
				fromLocation: {
					required: true
				},
				toLocation: {
					required: true
				}
			},
			messages: {
				fromLocation: {
					required: 'Please select an adsress'
				},
				toLocation: {
					required: 'Please select an address'
				}
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
				$(element).parents('.input-group').removeClass(errorClass);
			}
		});
	});
});