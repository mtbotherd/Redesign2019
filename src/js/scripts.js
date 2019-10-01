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
  
	// Display search bar
	$(".site-search").click(function() {
	  $("#siteSearchBox").slideToggle();
	  $("#siteSearch").focus();
	});
  
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
	$('[data-toggle="popover"]').popover();
});
