<template>
    <div id="nexTripModule">
        <h1 class="sr-only">NexTrip</h1>
        <div class="card no-body">
            <h2 class="text-center">Real-time Departures</h2>
            <div class="row">
                <div class="col-md-5">
                    <div class="form-group">
                        <label for="selectRoute" class="sr-only">Select route</label>
                        <select
                            id="selectRoute"
                            v-model="routeSelected"
                            name="selectRoute"
                            class="custom-select custom-select-lg"
                        >
                            <option value>Select route</option>
                            <option value="route-1">Route 1</option>
                            <option value="route-2">Route 2</option>
                            <option value="route-2">Route 3</option>
                        </select>
                    </div>
                    <div v-if="routeSelected" class="form-group">
                        <label for="selectDirection" class="sr-only">Select direction</label>
                        <select
                            id="selectDirection"
                            v-model="directionSelected"
                            name="selectDirection"
                            class="custom-select custom-select-lg"
                        >
                            <option value>Select direction</option>
                            <option value="north">North</option>
                            <option value="sout">South</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                        </select>
                    </div>
                    <div v-if="routeSelected && directionSelected" class="form-group">
                        <label for="selectStop" class="sr-only">Select stop</label>
                        <select
                            id="selectStop"
                            v-model="stopSelected"
                            name="selectStop"
                            class="custom-select custom-select-lg"
                        >
                            <option value>Select stop</option>
                            <option value="stop-1">Stop 1</option>
                            <option value="stop-2">Stop 2</option>
                            <option value="stop-3">Stop 3</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <p class="text-center or">or</p>
                </div>
                <div class="col-md-5">
                    <div class="form-group">
                        <float-label for="stopNumber">
                            <input
                                id="stopNumber"
                                v-model="stopNumber"
                                type="text"
                                name="stopNumber"
                                class="form-control form-control-lg"
                                placeholder="Enter stop number"
                                required
                            >
                        </float-label>
                    </div>
                </div>
            </div>

            <!-- NexTrip Departures (results) -->
            <NexTripDepartures/>

            <div class="btn-container text-center">
                <BaseButton type="submit" name="getDepartures">Get departures</BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
import NexTripDepartures from './NexTripDepartures'

export default {
	name: 'NexTripModule',
	components: {
		NexTripDepartures
	},
	data() {
		return {
			routeSelected: '',
			directionSelected: '',
			stopSelected: '',
			stopNumber: ''
		}
	},
	methods: {}
}
</script>

<style  lang="scss" scoped>
#nexTripModule {
	.card-header {
		background-color: transparent;
		border: none;
		padding: 0;
	}

	.or {
		margin-bottom: 1rem;

		@include media-breakpoint-up(md) {
			margin-bottom: 0;
			padding-top: 1rem;
		}
	}
}
</style>
