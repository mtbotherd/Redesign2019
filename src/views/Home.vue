<template>
	<div id="home">
		<div class="hero-bg">
			<form>
				<div class="form-group">
					<label for="schedulesByRoute" class="sr-only">
						Find schedules by route
					</label>
					<input
						type="search"
						id="schedulesByRoute"
						class="form-control"
						placeholder="Find schedules by route"
					/>
				</div>
			</form>
		</div>
		<div id="homeContent" class="container">
			<ul
				id="tripTools"
				role="tablist"
				class="nav nav-tabs nav-justified d-flex align-items-end"
			>
				<li class="nav-item mr-2 active">
					<IconSprite
						name="icon-lg-directions-color"
						width="37"
						height="32"
					/>
					<a
						id="trip-planner-tab"
						class="nav-link align-middle pt-0 pt-lg-2 stretched-link active"
						data-toggle="tab"
						href="#trip-planner"
						role="tab"
						aria-controls="trip-planner"
						aria-selected="true"
					>
						Trip Planner
					</a>
				</li>
				<li class="nav-item mr-2">
					<IconSprite
						name="icon-lg-clock-white"
						width="32"
						height="32"
					/>
					<a
						id="nextrip-tab"
						class="nav-link align-middle pt-0 pt-lg-2 stretched-link"
						data-toggle="tab"
						href="#nextrip"
						role="tab"
						aria-controls="nextrip"
						aria-selected="false"
					>
						NexTrip
					</a>
				</li>
				<li class="nav-item">
					<IconSprite
						name="icon-lg-triangle-exclamation-white"
						width="34"
						height="32"
					/>
					<a
						id="alerts-tab"
						class="nav-link align-middl pt-0 pt-lg-2 stretched-link"
						data-toggle="tab"
						href="#alerts"
						role="tab"
						aria-controls="alerts"
						aria-selected="false"
					>
						Alerts
					</a>
				</li>
			</ul>
			<div class="tab-content" id="tripToolsContent">
				<div
					class="tab-pane fade show active"
					id="trip-planner"
					role="tabpanel"
					aria-labelledby="trip-planner-tab"
				>
					<h1>Trip Planner</h1>
				</div>
				<div
					class="tab-pane fade"
					id="nextrip"
					role="tabpanel"
					aria-labelledby="nextrip-tab"
				>
					<h1>NexTrip</h1>
				</div>
				<div
					class="tab-pane fade"
					id="alerts"
					role="tabpanel"
					aria-labelledby="alerts-tab"
				>
					<h1>Alerts</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
