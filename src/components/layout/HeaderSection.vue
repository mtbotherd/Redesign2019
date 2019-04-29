<template>
    <header>
        <nav class="navbar navbar-expand-xl navbar-light border-bottom">
            <a class="skip-to-content" href="#mainContent">Skip to main content</a>
            <div class="container">
                <router-link class="navbar-brand" :to="{ name: 'home' }">
                    <img src="../../assets/img/MetroTransitLogo.svg" class="logo d-inline-block">
                </router-link>
                <button
                    class="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-toggleable-xl navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav nav-fill w-100">
                        <li class="nav-item dropdown active">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="tripToolsDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Trip Tools&nbsp;
                                <BaseIconSprite name="icon-sm-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="tripToolsDropdown">
                                <!-- <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'home', hash: '#tripPlanner' }"
                                >Trip Planner</router-link>-->
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'trip-planner' }"
                                >Trip Planner</router-link>
                                <router-link class="dropdown-item" :to="{ name: 'nextrip' }">NexTrip</router-link>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'find-stops' }"
                                >Find Stops</router-link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'schedules-maps' }"
                            >Schedules &amp; Maps</router-link>
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
                                <BaseIconSprite name="icon-sm-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="faresDropdown">
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'ride-costs' }"
                                >Ride Costs</router-link>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'goto-card' }"
                                >Go-To Card</router-link>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'discount-programs' }"
                                >Discount Programs</router-link>
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
                                <BaseIconSprite name="icon-sm-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="faresDropdown">
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'link-name' }"
                                >Link name</router-link>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'link-name' }"
                                >Link name</router-link>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'link-name' }"
                                >Link name</router-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="helpDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Help&nbsp;
                                <BaseIconSprite name="icon-sm-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="helpDropdown">
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'contact-us' }"
                                >Contact Us</router-link>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'transit-police' }"
                                >Transit Police</router-link>
                                <router-link
                                    class="dropdown-item"
                                    :to="{ name: 'how-to-ride-guide' }"
                                >How to Ride Guide</router-link>
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
                                <BaseIconSprite name="icon-sm-globe-gray"/>&nbsp;
                                En&nbsp;
                                <BaseIconSprite name="icon-sm-chevron-down-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="language">
                                <a class="dropdown-item" href="#">Hmong</a>
                                <a class="dropdown-item" href="#">Karen</a>
                                <a class="dropdown-item" href="#">Somali</a>
                                <a class="dropdown-item" href="#">Spanish</a>
                                <a class="dropdown-item" href="#">Vietnamese</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="search"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                title="Search"
                            >
                                <span class="sr-only">Search</span>
                                <BaseIconSprite name="icon-sm-magnifying-glass-gray"/>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="searchDropdown">
                                <div class="form-group">
                                    <label for="siteSearch" class="sr-only">Search</label>
                                    <input
                                        type="search"
                                        id="siteSearch"
                                        class="form-control form-control-sm"
                                        placeholder="Enter search word or phrase"
                                    >
                                </div>
                            </div>
                        </li>
                        <li>
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="profile"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                title="Profile"
                            >
                                <span class="sr-only">Your profile</span>
                                <BaseIconSprite name="icon-sm-avatar-gray"/>
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
	name: 'HeaderSection'
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
	.nav-fill {
		.nav-item {
			text-align: left;
		}
	}
	.nav-link {
		text-decoration: none;

		@include media-breakpoint-up(md) {
			@include fontSize(18);
		}

		@include media-breakpoint-up(xl) {
			padding-top: 1.25rem;
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
