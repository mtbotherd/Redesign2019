<template>
	<div id="searchSchedulesByRoute">
		<form>
			<div class="row justify-content-md-center">
				<div class="col col-lg-6">
					<div class="form-group mt-2 mt-lg-5">
						<label for="schedulesByRoute" class="sr-only">
							Find schedules by route
						</label>
						<input
							type="search"
							id="schedulesByRoute"
							class="form-control form-control-lg"
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

<style scoped>
#searchSchedulesByRoute {
	display: none;
}

@media (min-width: 768px) {
	#searchSchedulesByRoute {
		display: block;
	}
}
</style>
