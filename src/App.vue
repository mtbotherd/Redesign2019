<template>
	<div id="app">
    	<header>
            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <!-- Skip nav - for accessibility -->
                <a class="skip-to-content" href="#mainContent">Skip to main content</a>

                <div class="container">
                    <router-link :to="{ name: 'home' }" class="navbar-brand">
                        <img src="./assets/img/MetroTransitLogo.svg" width="225" height="53" class="d-inline-block aling-top" alt="Metro Transit T logo" />
                    </router-link>
                    <!-- <a class="navbar-brand" href="index.html">
                        <img src="./assets/img/MetroTransitLogo.svg" width="225" height="53" class="d-inline-block aling-top" alt="Metro Transit T logo" />
                    </a> -->
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown active">
                                <a class="nav-link dropdown-toggle" id="tripTools" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Trip Tools <span class="sr-only">(current)</span></a>
                                <ul class="dropdown-menu" aria-labelledby="trip tools">
                                    <li class="dropdown-item" href="#"><a>Trip Planner</a></li>
                                    <li class="dropdown-item" href="#"><a>Tracker (NexTrip)</a></li>
                                    <li class="dropdown-item" href="#"><a>Find Stops</a></li>
                                    <li class="dropdown-item" href="#"><a>Alerts</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" id="mapsSchedules" href="#">Maps &amp; Schedules</a></li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="fares" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Fares</a>
                                <ul class="dropdown-menu" aria-labelledby="fares">
                                    <li class="dropdown-item" href="#"><a>Ride Costs</a></li>
                                    <li class="dropdown-item" href="#"><a>Go-To Cards</a></li>
                                    <li class="dropdown-item dropdown">
                                        <a class="dropdown-toggle" id="discountPrograms" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Discount Programs</a>
                                        <ul class="dropdown-menu" aria-labelledby="discountPrograms">
                                            <li class="dropdown-item" href="#"><a>Transit Assistance Programs (TAP)</a></li>
                                            <li class="dropdown-item" href="#"><a>MetroPass (for companies and orgs)</a></li>
                                            <li class="dropdown-item" href="#"><a>Student Pass</a></li>
                                            <li class="dropdown-item" href="#"><a>College Pass</a></li>
                                            <li class="dropdown-item" href="#"><a>U Pass</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="help" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Help</a>
                                <ul class="dropdown-menu" aria-labelledby="help">
                                    <li class="dropdown-item" href="#"><a>Contact Us</a></li>
                                    <li class="dropdown-item" href="#"><a>Transit Police</a></li>
                                    <li class="dropdown-item" href="#"><a>Lost &amp; Found</a></li>
                                    <li class="dropdown-item" href="#"><a>Accessibility</a></li>
                                    <li class="dropdown-item" href="#"><a>Guaranteed Ride Home</a></li>
                                    <li class="dropdown-item" href="#"><a>How to Ride Guide</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="more" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</a>
                                <ul class="dropdown-menu" aria-labelledby="more">
                                    <li class="dropdown-item dropdown">
                                        <a class="dropdown-toggle" id="missionImpact" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mission &amp; Impact</a>
                                        <ul class="dropdown-menu" aria-labelledby="missionImpact">
                                            <li class="dropdown-item" href="#"><a>Commitment to Fairness</a></li>
                                            <li class="dropdown-item dropdown">
                                                <a class="dropdown-toggle" id="impactPrograms" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Impact Programs</a>
                                                <ul class="dropdown-menu" aria-labelledby="impactPrograms">
                                                    <li class="dropdown-item" href="#"><a>Commuter Choice Awards</a></li>
                                                    <li class="dropdown-item" href="#"><a>Go Greener</a></li>
                                                    <li class="dropdown-item" href="#"><a>Transit-Oriented Development</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item dropdown">
                                        <a class="dropdown-toggle" id="transitImprovements" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Transit Improvements</a>
                                        <ul class="dropdown-menu" aria-labelledby="transitImprovements">
                                            <li class="dropdown-item" href="#"><a>B Line</a></li>
                                            <li class="dropdown-item" href="#"><a>C Line</a></li>
                                            <li class="dropdown-item" href="#"><a>D Line</a></li>
                                            <li class="dropdown-item" href="#"><a>E Line</a></li>
                                            <li class="dropdown-item" href="#"><a>Gold Line</a></li>
                                            <li class="dropdown-item" href="#"><a>Service Improvement Plan</a></li>
                                            <li class="dropdown-item" href="#"><a>Transit-Oriented Development</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item dropdown">
                                        <a class="dropdown-toggle" id="facilities" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Facilities</a>
                                        <ul class="dropdown-menu" aria-labelledby="facilities">
                                            <li class="dropdown-item" href="#"><a>Adopt a Shelter</a></li>
                                            <li class="dropdown-item" href="#"><a>Use of Transit Property</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item dropdown">
                                        <a class="dropdown-toggle" id="rideshareOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Rideshare Options</a>
                                        <ul class="dropdown-menu" aria-labelledby="rideshareOptions">
                                            <li class="dropdown-item" href="#"><a>Transit Link</a></li>
                                            <li class="dropdown-item" href="#"><a>Carpooling</a></li>
                                            <li class="dropdown-item" href="#"><a>Vanpooling</a></li>
                                            <li class="dropdown-item" href="#"><a>Metro Mobility</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item" href="#"><a>News &amp; Events</a></li>
                                    <li class="dropdown-item dropdown">
                                        <a class="dropdown-toggle" id="careers" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Careers</a>
                                        <ul class="dropdown-menu" aria-labelledby="careers">
                                            <li class="dropdown-item" href="#"><a>Available Job Opportunities</a></li>
                                            <li class="dropdown-item" href="#"><a>Become a Bus Driver</a></li>
                                            <li class="dropdown-item" href="#"><a>Career Fairs</a></li>
                                            <li class="dropdown-item" href="#"><a>Internships</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown-item" href="#"><a>(Reserved for special events)</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="form-inline mt-2 mt-md-0 ml-md-3">
                            <div class="input-group mb-2">
                                <input class="form-control" type="text" placeholder="Search" aria-label="Search">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary" type="button">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    	<!-- <router-view/> -->
    </div>
</template>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
