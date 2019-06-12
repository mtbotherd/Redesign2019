<template>
    <div id="tripPlanner" class="container">
        <h1>Trip Planner</h1>
        <TripPlannerModule/>
    </div>
</template>

<script>
import TripPlannerModule from '../components/trip-planner/TripPlannerModule.vue'
export default {
	name: 'TripPlanner',
	title: 'Metro Transit | Trip Planner',
	components: {
		TripPlannerModule
	}
}
</script>

<style lang="scss" scoped>
</style>
