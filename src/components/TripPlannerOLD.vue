<template>
	<!-- Begin Trip Planner -->
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
					<div class="row">
						<div class="col">
							<div class="input-group mb-3">
								<label for="tpTime" class="sr-only">
									Depart/arrival time
								</label>
								<input
									type="time"
									class="form-control border-right-0"
									aria-label="depart/arrive by time"
									aria-describedby="tpTime"
								/>
								<div class="input-group-append border">
									<IconSprite
										name="icon-sm-clock-gray"
										id="tpTime"
										class="icon-clock mt-2 mr-2"
									/>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="input-group mb-3">
								<label for="tpDate" class="sr-only">
									Depart/arrival date
								</label>
								<input
									type="date"
									class="form-control border-right-0"
									aria-label="depart/arrive by time"
									aria-describedby="tpDate"
								/>
								<div class="input-group-append border">
									<IconSprite
										name="icon-sm-calendar-gray"
										id="tpDate"
										class="icon-clock mt-2 mr-2"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="more-options" role="tablist">
						<b-card no-body class="border mb-1">
							<b-card-header
								header-tag="header"
								class="d-flex p-0"
								role="tab"
							>
								<b-button
									href="#"
									v-b-toggle.tpMoreOptions
									variant="link"
									block
									class="d-flex align-items-center text-left"
								>
									More optioins
									<IconSprite
										name="icon-sm-plus-blue"
										class="ml-auto"
									/>
								</b-button>
							</b-card-header>
							<b-collapse
								id="tpMoreOptions"
								accordion="tp-more-options"
								role="tabpanel"
							>
								<b-card-body class="border-top">
									<b-card-text>
										<p class="m-0">I'm willing to walk:</p>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpQuarterMile"
												name="tp-walking-distance"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="quarterMile"
											>
												1/4 mile
											</label>
										</div>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpHalfMile"
												name="tp-walking-distance"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="halfMile"
											>
												1/2 mile
											</label>
										</div>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpOneMile"
												name="tp-walking-distance"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="oneMile"
											>
												1 mile
											</label>
										</div>
										<hr />

										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpAnyType"
												name="tp-service-type"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpAnyType"
											>
												Any service type
											</label>
										</div>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpRailOnly"
												name="tp-service-type"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpRailOnly"
											>
												Rail only
											</label>
										</div>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpBusOnly"
												name="tp-service-type"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpBusOnly"
											>
												Bus only
											</label>
										</div>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpNoExpress"
												name="tp-service-type"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpNoExpress"
											>
												No express
											</label>
										</div>

										<hr />

										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpFasterTrip"
												name="tp-convenience"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpFasterTrip"
											>
												Faster trip
											</label>
										</div>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpFewerTransfers"
												name="tp-convenience"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpFewerTransfers"
											>
												Fewer transfers
											</label>
										</div>
										<div
											class="custom-control custom-radio"
										>
											<input
												type="radio"
												id="tpLessWalking"
												name="tp-convenience"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpLessWalking"
											>
												Less walking
											</label>
										</div>

										<hr />

										<p class="m-0">
											<IconSprite
												name="icon-sm-accessible-gray"
											></IconSprite>
											Accessible stops
										</p>
										<div
											class="custom-control custom-radio custom-control-inline"
										>
											<input
												type="radio"
												id="tpAccessibleStopYes"
												name="tp-accessible-stop"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpAccessibleStopYes"
											>
												Yes
											</label>
										</div>
										<div
											class="custom-control custom-radio custom-control-inline"
										>
											<input
												type="radio"
												id="tpAccessibleStopNo"
												name="tp-accessible-stop"
												class="custom-control-input"
											/>
											<label
												class="custom-control-label"
												for="tpAccessibleStopNo"
											>
												No
											</label>
										</div>
									</b-card-text>
								</b-card-body>
							</b-collapse>
						</b-card>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 offset-md-4">
					<b-btn type="Submit" variant="warning" block>
						Plan My Trip
					</b-btn>
				</div>
			</div>
		</form>
	</div>
	<!-- End Trip Planner -->
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
