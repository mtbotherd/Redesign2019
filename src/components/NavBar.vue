<template>
	<header>
		<nav class="navbar navbar-expand-sm navbar-light border-bottom">
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
				<div
					class="collapse navbar-collapse flex-md-column"
					id="navbarCollapse"
				>
					<form class="form-inline ml-auto">
						<div class="input-group input-group-sm mb-3">
							<input
								type="text"
								class="form-control"
								placeholder="Search"
								aria-label="Search"
								aria-describedby="search-button"
							/>
							<span class="input-group-append">
								<button
									class="btn btn-outline-secondary"
									type="button"
									id="seach-button"
								>
									Button
								</button>
							</span>
						</div>
					</form>
					<ul class="navbar-nav ml-auto">
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
								Maps &amp; Schedules
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
								Fares
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
						<li class="nav-item">
							<router-link
								class="nav-link"
								:to="{ name: 'more' }"
							>
								More...
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
export default {}
</script>

<style scoped></style>
