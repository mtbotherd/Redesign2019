<template>
    <div id="nexTripModule">
        <h1 class="sr-only">NexTrip</h1>
        <h2 class="text-center">Real-time Departures</h2>
        <div class="row">
            <div class="col-md-5">
                <div class="form-group">
                    <label for="selectRoute" class="sr-only">Select Route</label>
                    <select
                        id="selectRoute"
                        name="selectRoute"
                        class="custom-select custom-select-lg"
                    >
                        <option value>Select route</option>
                        <option value="route-1">Route 1</option>
                        <option value="route-2">Route 2</option>
                        <option value="route-2">Route 3</option>
                    </select>
                </div>
            </div>
            <div class="col-md-2">
                <p class="h4 text-center">or</p>
            </div>
            <div class="col-md-5">
                <div class="form-group">
                    <input
                        id="stopNumber"
                        v-model="stopNumber"
                        type="text"
                        name="stopNumber"
                        class="form-control form-control-lg"
                        required
                    >
                    <label for="stopNumber" class="form-control-placeholder">Enter stop number</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'NexTripModule',
	data() {
		return {
			stopNumber: ''
		}
	}
	// mounted() {
	// 	if (this.href === window.location.hash) {
	// 		this.isActive = true
	// 	}
	// }
}
</script>

<style  lang="scss" scoped>
#nexTripModule {
}
</style>
