<template>
	<nav class="navbar navbar-expand-lg navbar-light border-bottom">
		<a class="skip-to-content" href="#mainContent">Skip to main content</a>
		<div class="container">
			<router-link class="navbar-brand" :to="{ name: 'home' }">
				<img
					src="../assets/img/MetroTransitLogo.svg"
					class="logo d-inline-block"
				/>
			</router-link>
			<button
				class="navbar-toggler navbar-toggler-right"
				type="button"
				data-toggle="collapse"
				data-target="#navbarCollapse"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarCollapse">
				<ul class="navbar-nav">
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
							Trip Tools
							<span class="chevron bottom"></span>
						</a>
						<div
							class="dropdown-menu"
							aria-labelledby="tripToolsDropdown"
						>
							<router-link
								class="dropdown-item"
								:to="{ name: 'trip-planner' }"
							>
								Trip Planner
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'nextrip' }"
							>
								NexTrip
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'find-stops' }"
							>
								Find Stops
							</router-link>
						</div>
					</li>
					<li class="nav-item">
						<router-link
							class="nav-link"
							:to="{ name: 'maps-schedules' }"
						>
							Schedules &amp; Maps
						</router-link>
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
							Fares &amp; Passes
							<span class="chevron bottom"></span>
						</a>
						<div
							class="dropdown-menu"
							aria-labelledby="faresDropdown"
						>
							<router-link
								class="dropdown-item"
								:to="{ name: 'ride-costs' }"
							>
								Ride Costs
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'goto-card' }"
							>
								Go-To Card
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'discount-programs' }"
							>
								Discount Programs
							</router-link>
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
							More
							<span class="chevron bottom"></span>
						</a>
						<div
							class="dropdown-menu"
							aria-labelledby="faresDropdown"
						>
							<router-link
								class="dropdown-item"
								:to="{ name: 'Link-name' }"
							>
								Link name
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'link-name' }"
							>
								Link name
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'link-name' }"
							>
								Link name
							</router-link>
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
							Help
						</a>
						<div
							class="dropdown-menu"
							aria-labelledby="helpDropdown"
						>
							<router-link
								class="dropdown-item"
								:to="{ name: 'contact-us' }"
							>
								Contact Us
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'transit-police' }"
							>
								Transit Police
							</router-link>
							<router-link
								class="dropdown-item"
								:to="{ name: 'how-to-ride-guide' }"
							>
								How to Ride Guide
							</router-link>
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
							En
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
			</div>
		</div>
	</nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@media (min-width: 1200px) {
	.navbar {
		.nav-link {
			text-decoration: none;
		}

		.dropdown-toggle {
			.chevron::before {
				border-style: solid;
				border-width: 0.05em 0.05em 0 0;
				content: '';
				display: inline-block;
				height: 0.45em;
				left: 0.15em;
				position: relative;
				top: 0.15em;
				transform: rotate(-45deg);
				vertical-align: top;
				width: 0.45em;
			}

			.chevron.bottom:before {
				top: 0;
				transform: rotate(135deg);
			}
		}

		.dropdown-toggle::after {
			border: none;
		}
	}
}
</style>
