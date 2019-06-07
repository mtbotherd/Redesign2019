<template>
    <div id="tripPlan">
        <div class="page-title">
            <div class="container">
                <h1>Trip Plan</h1>
            </div>
        </div>
        <div class="container">
            <TripPlanItinerary/>
        </div>
    </div>
</template>

<script>
import TripPlanItinerary from '@/components/trip-planner/TripPlanItinerary'

export default {
	name: 'TripPlan',
	components: {
		TripPlanItinerary
	}
}
</script>

<style lang="scss" scoped>
#tripPlan {
	.page-title {
		background-color: $blue;
		padding: 0.5rem 0;

		@include media-breakpoint-up(md) {
			padding: 4rem 0 1rem 0;
		}
	}
	h1 {
		color: $white;
		margin-bottom: 0;
	}
}
</style>