<template>
	<div id="tripTools">
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
				<IconSprite name="icon-lg-clock-white" width="32" height="32" />
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
		<div id="tripToolsContent" class="tab-content mt-3">
			<div
				class="tt-trip-planner tab-pane fade show active"
				id="tripPlanner"
				role="tabpanel"
				aria-labelledby="trip-planner-tab"
			>
				<h1 class="sr-only">Trip Planner</h1>
				<form>
					<div class="form-group mb-0">
						<label for="tpFrom" class="sr-only">From</label>
						<input
							id="tpFrom"
							type="text"
							class="form-control"
							placeholder="From"
						/>
					</div>
					<div class="float-right mt-1">
						<IconSprite name="icon-sm-switch-blue" />
					</div>
					<div class="form-group">
						<label for="tpTo" class="sr-only">To</label>
						<input
							id="tpTo"
							type="text"
							class="form-control"
							placeholder="To"
						/>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label for="tpLeaveNow" class="sr-only">
									Leave now
								</label>
								<select id="tpLeaveNow" class="custom-select">
									<option value="leave-now">Leave now</option>
									<option value="depart-at">Depart at</option>
									<option value="arrive-by">Arrive by</option>
								</select>
							</div>
						</div>
						<div class="col-md-6">
							<div class="more-options" role="tablist">
								<b-card no-body class="mb-1">
									<b-card-header
										header-tag="header"
										class="d-flex p-0"
										role="tab"
									>
										<b-button
											href="#"
											v-b-toggle.tpMoreOptions
											variant="link"
											class="stretched-link"
										>
											More optioins
										</b-button>
										<IconSprite
											name="icon-sm-plus-blue"
											class="ml-auto m-2"
										/>
									</b-card-header>
									<b-collapse
										id="tpMoreOptions"
										accordion="tp-more-options"
										role="tabpanel"
									>
										<b-card-body>
											<b-card-text>
												Insert options here.
											</b-card-text>
										</b-card-body>
									</b-collapse>
								</b-card>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 offset-md-4">
							<b-btn type="Submit" variant="primary" block>
								Plan My Trip
							</b-btn>
						</div>
					</div>
				</form>
			</div>
			<div
				class="tt-nextrip tab-pane fade"
				id="nextrip"
				role="tabpanel"
				aria-labelledby="nextrip-tab"
			>
				<h1 class="sr-only">NexTrip</h1>
			</div>
			<div
				class="tt-alerts tab-pane fade"
				id="alerts"
				role="tabpanel"
				aria-labelledby="alerts-tab"
			>
				<h1 class="sr-only">Alerts</h1>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showCollapse: true
		}
	}
}
</script>

<style lang="scss" scoped></style>
