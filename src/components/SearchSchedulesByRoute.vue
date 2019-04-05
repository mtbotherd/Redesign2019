<template>
	<div id="searchSchedulesByRoute">
		<form>
			<div class="row justify-content-md-center">
				<div class="col col-md-8 col-lg-6">
					<div class="form-group mt-2 mt-md-4 mt-lg-5">
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
				</div>
			</div>
		</form>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#searchSchedulesByRoute {
	display: none;
}

@media (min-width: 768px) {
	#searchSchedulesByRoute {
		display: block;

		.form-control {
			font-size: 1.22rem;
			font-weight: 500;
		}
	}
}
</style>
