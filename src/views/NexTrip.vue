<template>
    <div id="nextrip" class="container">
        <h1>NexTrip</h1>
        <NexTripModule/>
    </div>
</template>

<script>
import NexTripModule from '../components/nextrip/NexTripModule.vue'
export default {
	name: 'NexTrip',
	title: 'Metro Transit | NexTrip',
	components: {
		NexTripModule
	}
}
</script>

<style lang="scss" scoped>
</style>
