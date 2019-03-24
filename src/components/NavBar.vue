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
						<ul class="navbar-nav utilities">
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
									<font-awesome-icon icon="globe-americas" />
									<span class="small p-1">Language</span>
								</a>
								<div
									class="dropdown-menu"
									aria-labelledby="language"
								>
									<a class="dropdown-item" href="#">Hmong</a>
									<a class="dropdown-item" href="#">Karen</a>
									<a class="dropdown-item" href="#">Somali</a>
									<a class="dropdown-item" href="#">
										Spanish
									</a>
									<a class="dropdown-item" href="#">
										Vietnamese
									</a>
								</div>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="/alerts">
									<font-awesome-icon
										icon="exclamation-triangle"
									/>
									<span class="small p-1">Alerts</span>
								</a>
							</li>
						</ul>
						<div class="input-group input-group-sm">
							<input
								type="text"
								class="form-control ml-5"
								placeholder="Search"
								aria-label="Search"
								aria-describedby="search-button"
							/>
							<!-- <span class="input-group-append"> -->
							<button
								class="btn btn-search"
								type="button"
								id="seach-button"
							>
								<font-awesome-icon icon="search" />
							</button>
							<!-- </span> -->
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
