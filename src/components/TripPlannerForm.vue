<template>
    <div id="tripPlannerForm">
        <div class="form-group mb-0">
            <input
                v-model="fromLocation"
                id="tpFrom"
                type="text"
                name="tpFrom"
                class="form-control form-control-lg tp-from-location"
                required
            >
            <label for="tpFrom" class="form-control-placeholder">From</label>
        </div>
        <div class="tp-location-toggler text-right">
            <BaseIconSprite
                name="icon-sm-location-toggler-blue"
                class="icon-sm-location-toggler-blue mb-2 pt-2 pr-2 pl-2"
            />
        </div>
        <div class="form-group">
            <input
                v-model="toLocation"
                id="tpTo"
                type="text"
                name="tpTo"
                class="form-control form-control-lg tp-to-location"
                required
            >
            <label for="tpTo" class="form-control-placeholder">To</label>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="tpLeaveNow" class="sr-only">Leave now</label>
                    <select
                        id="tpSelectTime"
                        name="tpSelectTime"
                        class="custom-select custom-select-lg"
                    >
                        <option value="tp-leave-now">Leave now</option>
                        <option value="tp-depart-at">Depart at</option>
                        <option value="tp-arrive-by">Arrive by</option>
                    </select>
                </div>
                <div class="row tp-time-elements">
                    <div class="col-xl-6">
                        <div class="input-group mb-3">
                            <label for="tpTime" class="sr-only">Depart/arrival time</label>
                            <input
                                id="tpTime"
                                type="time"
                                name="tpTime"
                                class="form-control border-right-0"
                                aria-label="depart/arrive by time"
                                aria-describedby="tpTime"
                            >
                            <div class="input-group-append border">
                                <BaseIconSprite
                                    name="icon-sm-clock-gray"
                                    id="tpTime"
                                    class="icon-clock mt-1 mt-md-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="input-group mb-3">
                            <label for="tpDate" class="sr-only">Depart/arrival date</label>
                            <input
                                id="tpDate"
                                type="date"
                                name="tpDate"
                                class="form-control border-right-0"
                                aria-label="depart/arrive by time"
                                aria-describedby="tpDate"
                            >
                            <div class="input-group-append border">
                                <BaseIconSprite
                                    name="icon-sm-calendar-gray"
                                    id="tpDate"
                                    class="icon-clock-gray mt-1 mt-md-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="more-options" role="tablist">
                    <b-card no-body class="mb-4">
                        <b-card-header header-tag="header" class="d-flex border" role="tab">
                            <b-button
                                href="#"
                                v-b-toggle.tpMoreOptions
                                variant="link"
                                block
                                class="d-flex align-items-center text-left"
                            >
                                More options
                                <BaseIconSprite name="icon-sm-plus-blue" class="ml-auto"/>
                            </b-button>
                        </b-card-header>
                        <b-collapse id="tpMoreOptions" accordion="tp-more-options" role="tabpanel">
                            <b-card-body class="border">
                                <b-card-text class="mb-0">
                                    <strong>I'm willing to walk:</strong>
                                </b-card-text>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpQuarterMile"
                                        type="radio"
                                        name="tp-walking-distance"
                                        class="custom-control-input"
                                    >
                                    <label class="custom-control-label" for="quarterMile">1/4 mile</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpHalfMile"
                                        type="radio"
                                        name="tp-walking-distance"
                                        class="custom-control-input"
                                    >
                                    <label class="custom-control-label" for="halfMile">1/2 mile</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpOneMile"
                                        type="radio"
                                        name="tp-walking-distance"
                                        class="custom-control-input"
                                    >
                                    <label class="custom-control-label" for="oneMile">1 mile</label>
                                </div>
                                <hr>

                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpAnyType"
                                        type="radio"
                                        name="tp-service-type"
                                        class="custom-control-input"
                                    >
                                    <label
                                        class="custom-control-label"
                                        for="tpAnyType"
                                    >Any service type</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpRailOnly"
                                        type="radio"
                                        name="tp-service-type"
                                        class="custom-control-input"
                                    >
                                    <label class="custom-control-label" for="tpRailOnly">Rail only</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpBusOnly"
                                        type="radio"
                                        name="tp-service-type"
                                        class="custom-control-input"
                                    >
                                    <label class="custom-control-label" for="tpBusOnly">Bus only</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpNoExpress"
                                        type="radio"
                                        name="tp-service-type"
                                        class="custom-control-input"
                                    >
                                    <label class="custom-control-label" for="tpNoExpress">No express</label>
                                </div>

                                <hr>

                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpFasterTrip"
                                        type="radio"
                                        name="tp-convenience"
                                        class="custom-control-input"
                                    >
                                    <label
                                        class="custom-control-label"
                                        for="tpFasterTrip"
                                    >Faster trip</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpFewerTransfers"
                                        type="radio"
                                        name="tp-convenience"
                                        class="custom-control-input"
                                    >
                                    <label
                                        class="custom-control-label"
                                        for="tpFewerTransfers"
                                    >Fewer transfers</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input
                                        id="tpLessWalking"
                                        type="radio"
                                        name="tp-convenience"
                                        class="custom-control-input"
                                    >
                                    <label
                                        class="custom-control-label"
                                        for="tpLessWalking"
                                    >Less walking</label>
                                </div>

                                <hr>

                                <p class="m-0">
                                    <strong>
                                        <BaseIconSprite name="icon-sm-accessible-gray"/>&nbsp;Accessible stops
                                    </strong>
                                </p>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input
                                        id="tpAccessibleStopYes"
                                        type="radio"
                                        name="tp-accessible-stop"
                                        class="custom-control-input"
                                    >
                                    <label
                                        class="custom-control-label"
                                        for="tpAccessibleStopYes"
                                    >Yes</label>
                                </div>
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input
                                        id="tpAccessibleStopNo"
                                        type="radio"
                                        name="tp-accessible-stop"
                                        class="custom-control-input"
                                    >
                                    <label class="custom-control-label" for="tpAccessibleStopNo">No</label>
                                </div>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'TripPlannerForm',
	data() {
		return {
			fromLocation: '',
			toLocation: ''
		}
	}
}
</script>

<style lang="scss" scoped>
#tripPlannerForm {
	.tp-location-toggler .icon-wrapper {
		width: 2rem;
		height: 2rem;
	}

	.tp-time-elements {
		display: none;

		.input-group-append {
			padding: 0.375rem 0.75rem;
		}
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