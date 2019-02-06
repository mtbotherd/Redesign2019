<template>
	<div>
		<b-navbar type="light" toggleable="lg">
			<div class="container">
				<b-navbar-brand :to="{ name: 'home' }">
					<img
						src="../assets/img/MetroTransitLogo.svg"
						width="225"
						height="53"
						class="img-fluid d-inline-block aling-top"
						alt="Metro Transit T logo"
					/>
					<span class="sr-only">Metro Transit</span>
				</b-navbar-brand>
				<b-collapse id="mainNav" is-nav>
					<b-navbar-nav>
						<b-nav-item-dropdown text="Trip Tools">
							<b-dropdown-item :to="{ name: 'trip-planner' }"
								>Trip Planner</b-dropdown-item
							>
							<b-dropdown-item :to="{ name: 'nextrip' }"
								>NexTrip</b-dropdown-item
							>
							<b-dropdown-item :to="{ name: 'find-stops' }"
								>Find Stops</b-dropdown-item
							>
							<b-dropdown-item :to="{ name: 'alerts' }"
								>Alerts</b-dropdown-item
							>
						</b-nav-item-dropdown>
						<b-nav-item :to="{ name: 'maps-schedules' }"
							>Maps &amp; Schedules</b-nav-item
						>
						<b-nav-item-dropdown text="Fares">
							<b-dropdown-item :to="{ name: 'ride-costs' }"
								>Ride Costs</b-dropdown-item
							>
							<b-dropdown-item :to="{ name: 'goto-card' }"
								>Go-To Card</b-dropdown-item
							>
							<b-nav-item-dropdown text="Discount Passes">
								<b-dropdown-item :to="{ name: 'tap' }"
									>Transit Assistance Program</b-dropdown-item
								>
							</b-nav-item-dropdown>
						</b-nav-item-dropdown>
						<b-nav-toggle target="mainNav"></b-nav-toggle>
					</b-navbar-nav>
				</b-collapse>
			</div>
		</b-navbar>
	</div>
</template>

<script>
export default {}
</script>

<style scoped></style>
