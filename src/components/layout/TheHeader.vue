<template>
    <header>
        <b-navbar toggleable="xl">
            <div class="container">
                <b-navbar-brand href="/">
                    <img
                        alt="metro transit logo"
                        src="/img/MetroTransitLogo.svg"
                        class="logo d-inline-block"
                    >
                </b-navbar-brand>
                <b-navbar-toggle target="navCollapse"></b-navbar-toggle>
                <b-collapse id="navCollapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2">Trip Tools</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="active"/>
                            </template>
                            <b-dropdown-item href="trip-planner">Trip Planner</b-dropdown-item>
                            <b-dropdown-item href="nextrip">NexTrip</b-dropdown-item>
                            <b-dropdown-item href="alerts">Alerts</b-dropdown-item>
                            <b-dropdown-item href="find-park-n-ride">Find a Park &amp; Ride</b-dropdown-item>
                            <b-dropdown-item href="stops-stations">Find a Stop or Station</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item href="schedules-maps">
                            <slot>Schedules &amp; Maps</slot>
                        </b-nav-item>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2">Fares</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="active"/>
                            </template>
                            <b-dropdown-item href="fares">Fares</b-dropdown-item>
                            <b-dropdown-item href="go-to-card">Go-To Card</b-dropdown-item>
                            <b-dropdown-item href="passes">Pass Programs</b-dropdown-item>
                            <b-dropdown-item href="https://store.metrotransit.org/">Store</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2">More</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="active"/>
                            </template>
                            <b-dropdown-item href="/">Carpool &amp; Vanpool</b-dropdown-item>
                            <b-dropdown-item href="transit-link">Transit Link</b-dropdown-item>
                            <b-dropdown-item href="guaranteed-ride-home">Guaranteed Ride Home</b-dropdown-item>
                            <b-dropdown-item href="bicycle">Bicycle</b-dropdown-item>
                            <b-dropdown-item href="news-room">News &amp; Events</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2">Help</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="active"/>
                            </template>
                            <b-dropdown-item href="how-to-ride">How to Ride Guide</b-dropdown-item>
                            <b-dropdown-item href="contact-us">Contact Us</b-dropdown-item>
                            <b-dropdown-item href="lost-found">Lost &amp; Found</b-dropdown-item>
                            <b-dropdown-item href="accessibility">Accessibility</b-dropdown-item>
                            <b-dropdown-item href="languages">Languages</b-dropdown-item>
                            <b-dropdown-item href="police">Transit Police</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <BaseIconSprite name="icon-globe-gray"/>
                                <span class="dropdown-text mr-2 ml-1">En</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="active"/>
                            </template>
                            <b-dropdown-item href="how-to-ride">How to Ride Guide</b-dropdown-item>
                            <b-dropdown-item href="contact-us">Contact Us</b-dropdown-item>
                            <b-dropdown-item href="lost-found">Lost &amp; Found</b-dropdown-item>
                            <b-dropdown-item href="accessibility">Accessibility</b-dropdown-item>
                            <b-dropdown-item href="languages">Languages</b-dropdown-item>
                            <b-dropdown-item href="police">Transit Police</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                    <b-navbar-nav class="utilities">
                        <b-nav-item href="https://store.metrotransit.org/">
                            <BaseIconSprite name="icon-shopping-cart-green" class="inactive"/>
                            <BaseIconSprite name="icon-shopping-cart-white" class="active"/>
                        </b-nav-item>
                        <b-nav-item href="/">
                            <BaseIconSprite name="icon-magnifying-glass-gray" class="inactive"/>
                            <BaseIconSprite name="icon-magnifying-glass-white" class="active"/>
                        </b-nav-item>
                        <b-nav-item href="/">
                            <BaseIconSprite name="icon-avatar-gray" class="inactive"/>
                            <BaseIconSprite name="icon-avatar-white" class="active"/>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </header>
</template>

<script>
//  Components with the prefix "Base" are already registered globally in main.js
export default {
	name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
a.skip-to-content {
	position: absolute;
	top: -40px;
	left: 0;
	transition: top 1s ease-out;

	&:focus {
		background-color: $red;
		color: $white;
		left: 0;
		padding: 1rem;
		text-decoration: underline;
		top: 0;
		transition: top 0.1s ease-in;
	}
}

.navbar-light {
	.navbar-nav {
		.nav-link {
			.icon-wrapper {
				width: 1rem;
				height: 1rem;
				vertical-align: middle;

				+ .active {
					display: none;
				}
			}
		}

		+ .utilities {
			@include media-breakpoint-up(xl) {
				margin-left: auto;
				padding-left: 1rem;
				border-left: 1px solid $border-color;
			}

			.nav-link {
				.icon-wrapper {
					@include media-breakpoint-up(xl) {
						.icon-wrapper {
							width: 1.25rem;
							height: 1.25rem;
						}
					}
				}
			}
		}
	}
}
</style>
