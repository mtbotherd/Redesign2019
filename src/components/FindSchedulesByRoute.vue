<template>
    <div id="findSchedulesByRoute">
        <div class="row justify-content-md-center">
            <div class="col-md-8 col-lg-6 mt-2 mt-md-2 mt-lg-5">
                <div class="input-group">
                    <input
                        type="search"
                        id="schedulesByRoute"
                        class="form-control form-control-lg border-0"
                        placeholder="Find schedules by route"
                        aria-label="Find schedules by route"
                        aria-describedby="searchButton"
                    >
                    <button
                        class="btn btn-search position-absolute border-0"
                        type="search"
                        id="searchButton"
                    >
                        <BaseIconSprite name="icon-sm-magnifying-glass-gray"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@include media-breakpoint-up(md) {
	#findSchedulesByRoute {
		.btn-search {
			top: 0;
			right: 0;
			padding: 0.9rem;
			z-index: 4; // Sets icon button over input during focus (which takes on z-index: 3)
		}
	}
}
</style>
