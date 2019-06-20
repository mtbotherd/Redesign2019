<template>
    <div id="findSchedulesByRoute">
        <div class="row justify-content-md-center">
            <div class="col-md-8 col-lg-6 mt-2 mt-md-4">
                <div class="input-group">
                    <input
                        type="search"
                        id="schedulesByRoute"
                        class="form-control form-control-lg"
                        placeholder="Find schedules by route"
                        aria-label="Find schedules by route"
                        aria-describedby="searchButton"
                    >
                    <div class="input-group-append">
                        <b-button id="searchButton" type="search" variant="primary">
                            <span class="sr-only">Search</span>
                            <BaseIconSprite name="icon-magnifying-glass-gray"/>
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'FindSchedulesByRoute'
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-up(md) {
	.form-control {
		@include fontSize(23);
		border: 0;
	}

	.btn-primary {
		background-color: $white;
		border: 0;
		z-index: 4; // Sets icon button over input during focus (which takes on z-index: 3)
	}
}
</style>
