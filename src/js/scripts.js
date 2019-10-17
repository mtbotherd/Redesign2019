$(function() {
	"use strict";
  
	$("#header img.active").hide();
  
	var navImg = $("#header .nav-item");
	$(navImg).hover(
	  function() {
		$(this)
		  .find("img.inactive")
		  .hide();
		$(this)
		  .find("img.active")
		  .show();
	  },
	  function() {
		$(this)
		  .find("img.inactive")
		  .show();
		$(this)
		  .find("img.active")
		  .hide();
	  }
	);

    // Secondary nav set active item
    $('.secondary-nav > ul > li > a[href=' + location.pathname.replace('/', '\\/') + ']').addClass('active');

   //Newsletter signup button
    //if ($('.createsend-button').length) {
    //    var e = document.createElement('script');
    //    e.type = 'text/javascript';
    //    e.async = true;
    //    e.src = 'https://btn.createsend1.com/js/sb.min.js?v=3';
    //    e.className = 'createsend-script';
    //    var s = document.getElementsByTagName('script')[0];
    //    s.parentNode.insertBefore(e, s);
    //}

	/***********************************************
			  Trip Planner
	  ***********************************************/
	// location switcher
	var inputs = $(".from-location, .to-location"),
	  tmp,
	  loctmp;
  
	$(".location-toggler").click(function() {
	  tmp = inputs[0].value;
	  inputs[0].value = inputs[1].value;
	  inputs[1].value = tmp;
	  AutocompleteAddress.exchangeValues("fromLocation", "toLocation");
	});

	// Drop down for "From" input
	$("input.dropdown").dropdown();
  
	// time & date inputs
	$(".time-elements").hide();
	$("#selectTime").on("change", function() {
	  if (this.value == "depart-at" || this.value == "arrive-by") {
		$(".time-elements").slideDown();
	  } else {
		$(".time-elements").slideUp();
	  }
	});

	// Bootstrap Popover with HTML
	$('[data-toggle="popover"]').popover({
		html: true,
		trigger: 'click'
	});
});
