<template>
    <div id="tripPlannerModule">
        <b-card no-body>
            <h1 class="sr-only">Trip Planner</h1>
            <div class="form-group mb-0">
                <float-label for="fromLocation">
                    <input
                        id="fromLocation"
                        v-model="fromLocation"
                        type="text"
                        name="fromLocation"
                        class="form-control form-control-lg from-location"
                        placeholder="From"
                        required
                    >
                    <!-- <label for="fromLocation">From</label> -->
                </float-label>
            </div>
            <div class="location-toggler text-right">
                <BaseIconSprite
                    name="icon-location-toggler-blue"
                    class="icon-location-toggler-blue mb-2 pt-2 pr-2 pl-2"
                />
            </div>
            <div class="form-group">
                <float-label for="toLocation">
                    <input
                        id="toLocation"
                        v-model="toLocation"
                        type="text"
                        name="toLocation"
                        class="form-control form-control-lg to-location"
                        placeholder="To"
                        required
                    >
                </float-label>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="selectTime" class="sr-only">Select time</label>
                        <select
                            id="selectTime"
                            v-model="timeSelected"
                            name="selectTime"
                            class="custom-select custom-select-lg"
                        >
                            <option value="leave-now">Leave now</option>
                            <option value="depart-at">Depart at</option>
                            <option value="arrive-by">Arrive by</option>
                        </select>
                    </div>
                    <div v-if="timeSelected !== 'leave-now'" class="row time-elements">
                        <div class="col-xl-6">
                            <div class="input-group mb-3">
                                <label for="time" class="sr-only">Depart/arrival time</label>
                                <input
                                    id="time"
                                    type="time"
                                    name="time"
                                    class="form-control border-right-0"
                                    aria-label="depart/arrive by time"
                                    aria-describedby="time"
                                >
                                <div class="input-group-append border">
                                    <BaseIconSprite
                                        name="icon-clock-gray"
                                        class="icon-clock mt-1 mt-md-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="input-group mb-3">
                                <label for="date" class="sr-only">Depart/arrival date</label>
                                <input
                                    id="date"
                                    type="date"
                                    name="date"
                                    class="form-control border-right-0"
                                    aria-label="depart/arrive by time"
                                    aria-describedby="date"
                                >
                                <div class="input-group-append border">
                                    <BaseIconSprite
                                        name="icon-calendar-gray"
                                        class="icon-clock-gray mt-1 mt-md-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="more-options" role="tablist">
                        <b-card no-body>
                            <b-card-header header-tag="header" class="d-flex border" role="tab">
                                <b-button
                                    href="#"
                                    v-b-toggle.tpMoreOptions
                                    variant="link"
                                    block
                                    class="d-flex align-items-center text-left"
                                >
                                    More options
                                    <BaseIconSprite name="icon-plus-blue" class="ml-auto"/>
                                </b-button>
                            </b-card-header>
                            <b-collapse id="tpMoreOptions" accordion="more-options" role="tabpanel">
                                <b-card-body class="border">
                                    <b-card-text class="mb-0">
                                        <strong>I'm willing to walk:</strong>
                                    </b-card-text>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="quarterMile"
                                            type="radio"
                                            name="walkingDistance"
                                            class="custom-control-input"
                                        >
                                        <label
                                            class="custom-control-label"
                                            for="quarterMile"
                                        >1/4 mile</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="halfMile"
                                            type="radio"
                                            name="walkingDistance"
                                            class="custom-control-input"
                                        >
                                        <label class="custom-control-label" for="halfMile">1/2 mile</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="oneMile"
                                            type="radio"
                                            name="walkingDistance"
                                            class="custom-control-input"
                                        >
                                        <label class="custom-control-label" for="oneMile">1 mile</label>
                                    </div>
                                    <hr>

                                    <div class="custom-control custom-radio">
                                        <input
                                            id="anyType"
                                            type="radio"
                                            name="serviceType"
                                            class="custom-control-input"
                                        >
                                        <label
                                            class="custom-control-label"
                                            for="anyType"
                                        >Any service type</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="railOnly"
                                            type="radio"
                                            name="serviceType"
                                            class="custom-control-input"
                                        >
                                        <label class="custom-control-label" for="railOnly">Rail only</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="busOnly"
                                            type="radio"
                                            name="serviceType"
                                            class="custom-control-input"
                                        >
                                        <label class="custom-control-label" for="busOnly">Bus only</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="noExpress"
                                            type="radio"
                                            name="serviceType"
                                            class="custom-control-input"
                                        >
                                        <label
                                            class="custom-control-label"
                                            for="noExpress"
                                        >No express</label>
                                    </div>

                                    <hr>

                                    <div class="custom-control custom-radio">
                                        <input
                                            id="fasterTrip"
                                            type="radio"
                                            name="convenience"
                                            class="custom-control-input"
                                        >
                                        <label
                                            class="custom-control-label"
                                            for="fasterTrip"
                                        >Faster trip</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="fewerTransfers"
                                            type="radio"
                                            name="convenience"
                                            class="custom-control-input"
                                        >
                                        <label
                                            class="custom-control-label"
                                            for="fewerTransfers"
                                        >Fewer transfers</label>
                                    </div>
                                    <div class="custom-control custom-radio">
                                        <input
                                            id="lessWalking"
                                            type="radio"
                                            name="convenience"
                                            class="custom-control-input"
                                        >
                                        <label
                                            class="custom-control-label"
                                            for="lessWalking"
                                        >Less walking</label>
                                    </div>

                                    <hr>

                                    <p class="m-0">
                                        <strong>
                                            <BaseIconSprite name="icon-accessible-gray"/>&nbsp;Accessible stops
                                        </strong>
                                    </p>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input
                                            id="accessibleYes"
                                            type="radio"
                                            name="accessible"
                                            class="custom-control-input"
                                        >
                                        <label class="custom-control-label" for="accessibleYes">Yes</label>
                                    </div>
                                    <div class="custom-control custom-radio custom-control-inline">
                                        <input
                                            id="accessibleNo"
                                            type="radio"
                                            name="accessible"
                                            class="custom-control-input"
                                        >
                                        <label class="custom-control-label" for="accessibleNo">No</label>
                                    </div>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                    </div>
                </div>
            </div>
            <TripPlannerResults/>
            <div class="btn-container text-center">
                <BaseButton type="submit" name="planMyTrip">Plan my trip</BaseButton>
            </div>
        </b-card>
    </div>
</template>

<script>
import TripPlannerResults from './TripPlannerResults'

export default {
	name: 'TripPlannerModule',
	components: {
		TripPlannerResults
	},
	data() {
		return {
			fromLocation: '',
			toLocation: '',
			timeSelected: 'leave-now'
		}
	}
}
</script>

<style lang="scss" scoped>
#tripPlannerModule {
	.location-toggler .icon-wrapper {
		width: 2rem;
		height: 2rem;
	}

	.time-elements {
		.input-group-append {
			padding: 0.375rem 0.75rem;
		}
	}

	input::placeholder {
		font-weight: $font-weight-bold;
	}

	.custom-select {
		font-weight: $font-weight-medium;
	}

	.more-options {
		margin-bottom: 1rem;
		.card {
			.card-header {
				background-color: transparent;
				border-bottom: 0;
				padding: 0;

				.btn-link {
					text-decoration: none;
					color: $body-color;
					@include fontSize(17);
					font-weight: 500;
					padding: 0.375rem 0.75rem;

					@include media-breakpoint-up(md) {
						@include fontSize(23);
						padding: 0.454rem 1rem;
					}

					&:focus {
						color: #626462;
						background-color: #fff;
						border-color: #51cfff;
						outline: 0;
						-webkit-box-shadow: 0 0 0 0.2rem rgba(0, 151, 208, 0.25);
						box-shadow: 0 0 0 0.2rem rgba(0, 151, 208, 0.25);
					}
				}
			}

			.card-body {
				background-color: $gray-100;
			}
		}
		@include media-breakpoint-up(xl) {
			margin-bottom: 1.5rem;
		}
	}
}
</style>
