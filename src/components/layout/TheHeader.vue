<template>
    <header>
        <nav class="navbar navbar-expand-xl navbar-light border-bottom">
            <a class="skip-to-content" href="#mainContent">Skip to main content</a>
            <div class="container">
                <b-navbar-brand href="home">
                    <img
                        alt="metro transit logo"
                        src="/img/MetroTransitLogo.svg"
                        class="logo d-inline-block"
                    >
                </b-navbar-brand>
                <button
                    class="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-toggleable-xl navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav nav-fill">
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="tripToolsDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Trip Tools
                                <BaseIconSprite name="icon-chevron-down-gray" class="svg-inactive"/>
                                <BaseIconSprite name="icon-chevron-up-white" class="svg-active"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="tripToolsDropdown">
                                <b-link class="dropdown-item" href="trip-planner">Trip Planner</b-link>
                                <b-link class="dropdown-item" href="nextrip">NexTrip</b-link>
                                <b-link class="dropdown-item" href="find-stops">Find Stops</b-link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <b-link class="nav-link" href="schedules-maps">Schedules &amp; Maps</b-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="faresDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Fares &amp; Passes&nbsp;
                                <BaseIconSprite name="icon-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="faresDropdown">
                                <b-link class="dropdown-item" href="ride-costs">Ride Costs</b-link>
                                <b-link class="dropdown-item" href="goto-card">Go-To Card</b-link>
                                <b-link
                                    class="dropdown-item"
                                    href="discount-programs"
                                >Discount Programs</b-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="moreDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                More&nbsp;
                                <BaseIconSprite name="icon-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="faresDropdown">
                                <b-link class="dropdown-item" href>Link name</b-link>
                                <b-link class="dropdown-item" href>Link name</b-link>
                                <b-link class="dropdown-item" href>Link name</b-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle active"
                                href="#"
                                id="helpDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Help&nbsp;
                                <BaseIconSprite name="icon-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="helpDropdown">
                                <b-link class="dropdown-item" href="contact-us">Contact Us</b-link>
                                <b-link class="dropdown-item" href="transit-police">Transit Police</b-link>
                                <b-link
                                    class="dropdown-item"
                                    href="/how-to-ride-guide"
                                >How to Ride Guide</b-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="language"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <BaseIconSprite name="icon-globe-gray"/>&nbsp;
                                En&nbsp;
                                <BaseIconSprite name="icon-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="language">
                                <a class="dropdown-item" href="#">Hmong</a>
                                <a class="dropdown-item" href="#">Karen</a>
                                <a class="dropdown-item" href="#">Somali</a>
                                <a class="dropdown-item" href="#">Spanish</a>
                                <a class="dropdown-item" href="#">Vietnamese</a>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav nav-fill border-left">
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="search" title="Search">
                                <span class="sr-only">Search</span>
                                <BaseIconSprite name="icon-magnifying-glass-gray"/>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="https://account.metrotransittest.org/"
                                id="profile"
                                title="Profile"
                            >
                                <span class="sr-only">Your profile</span>
                                <BaseIconSprite name="icon-avatar-gray"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
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

nav.navbar {
	@include media-breakpoint-up(lg) {
		padding-bottom: 0;
	}

	.nav-fill {
		.nav-item {
			text-align: left;

			&:hover,
			&:active {
				@include media-breakpoint-up(xl) {
					background-color: $cyan;

					.nav-link {
						color: $white;
					}
					.icon-wrapper {
						color: $white;
					}
				}
			}

			.nav-link {
				text-decoration: none;

				@include media-breakpoint-up(md) {
					@include fontSize(18);
				}

				@include media-breakpoint-up(xl) {
					padding: 1.25rem 0.75rem 0.5rem 0.75rem;
				}

				.svg-active {
					display: none !important;
				}

				.svg-inactive {
					display: inline-block !important;
					vertical-align: top;
				}

				&:hover,
				&:active {
					.svg-active {
						display: inline-block !important;
						vertical-align: top;
					}

					.svg-inactive {
						display: none !important;
					}
				}
			}

			.dropdown-menu {
				background-color: $gray-100;
				border: none;
				margin-top: -1px;
			}
		}
	}
	.icon-wrapper {
		width: 0.75rem;
		height: 0.75rem;

		@include media-breakpoint-up(xl) {
			width: 1rem;
			height: 1rem;
			vertical-align: middle;
		}
	}

	.dropdown-toggle {
		.icon-wrapper {
			display: inline-flex;
		}

		&::after {
			display: none;
		}
	}

	.dropdown-menu {
		.dropdown-item {
			text-decoration: none;
			@include fontSize(18);
		}
	}
}

@include media-breakpoint-up(md) {
	.icon-xs-avatar-gray {
		padding: 0.5rem;
	}
}
@include media-breakpoint-up(xl) {
	.navbar-expand-lg .navbar-nav .nav-link {
		padding-right: 0.88rem;
		padding-left: 0.88rem;
	}
}
</style>
