<template>
    <div
        class="tt-trip-planner tab-pane fade show active"
        id="tripPlanner"
        role="tabpanel"
        aria-labelledby="trip-planner-tab"
    >
        <div class="card border-0">
            <h1 class="sr-only">Trip Planner</h1>
            <form>
                <div class="form-group mb-0">
                    <input
                        v-model="fromLocation"
                        id="tpFrom"
                        type="text"
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
                        class="form-control form-control-lg tp-to-location"
                        required
                    >
                    <label for="tpTo" class="form-control-placeholder">To</label>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="tpLeaveNow" class="sr-only">Leave now</label>
                            <select id="tpSelectTime" class="custom-select custom-select-lg">
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
                                        type="time"
                                        class="form-control border-right-0"
                                        aria-label="depart/arrive by time"
                                        aria-describedby="tpTime"
                                        required
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
                                        type="date"
                                        class="form-control border-right-0"
                                        aria-label="depart/arrive by time"
                                        aria-describedby="tpDate"
                                        required
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
                                <b-collapse
                                    id="tpMoreOptions"
                                    accordion="tp-more-options"
                                    role="tabpanel"
                                >
                                    <b-card-body class="border">
                                        <b-card-text class="mb-0">
                                            <strong>I'm willing to walk:</strong>
                                        </b-card-text>
                                        <div class="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="tpQuarterMile"
                                                name="tp-walking-distance"
                                                class="custom-control-input"
                                            >
                                            <label
                                                class="custom-control-label"
                                                for="quarterMile"
                                            >1/4 mile</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="tpHalfMile"
                                                name="tp-walking-distance"
                                                class="custom-control-input"
                                            >
                                            <label
                                                class="custom-control-label"
                                                for="halfMile"
                                            >1/2 mile</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="tpOneMile"
                                                name="tp-walking-distance"
                                                class="custom-control-input"
                                            >
                                            <label class="custom-control-label" for="oneMile">1 mile</label>
                                        </div>
                                        <hr>

                                        <div class="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="tpAnyType"
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
                                                type="radio"
                                                id="tpRailOnly"
                                                name="tp-service-type"
                                                class="custom-control-input"
                                            >
                                            <label
                                                class="custom-control-label"
                                                for="tpRailOnly"
                                            >Rail only</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="tpBusOnly"
                                                name="tp-service-type"
                                                class="custom-control-input"
                                            >
                                            <label
                                                class="custom-control-label"
                                                for="tpBusOnly"
                                            >Bus only</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="tpNoExpress"
                                                name="tp-service-type"
                                                class="custom-control-input"
                                            >
                                            <label
                                                class="custom-control-label"
                                                for="tpNoExpress"
                                            >No express</label>
                                        </div>

                                        <hr>

                                        <div class="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                id="tpFasterTrip"
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
                                                type="radio"
                                                id="tpFewerTransfers"
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
                                                type="radio"
                                                id="tpLessWalking"
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
                                        <div
                                            class="custom-control custom-radio custom-control-inline"
                                        >
                                            <input
                                                type="radio"
                                                id="tpAccessibleStopYes"
                                                name="tp-accessible-stop"
                                                class="custom-control-input"
                                            >
                                            <label
                                                class="custom-control-label"
                                                for="tpAccessibleStopYes"
                                            >Yes</label>
                                        </div>
                                        <div
                                            class="custom-control custom-radio custom-control-inline"
                                        >
                                            <input
                                                type="radio"
                                                id="tpAccessibleStopNo"
                                                name="tp-accessible-stop"
                                                class="custom-control-input"
                                            >
                                            <label
                                                class="custom-control-label"
                                                for="tpAccessibleStopNo"
                                            >No</label>
                                        </div>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
                        </div>
                    </div>
                </div>
                <TripPlannerResults/>
                <div class="text-center">
                    <BaseSubmit>Plan my trip</BaseSubmit>
                </div>
            </form>
        </div>
    </div>
    <!-- End Trip Planner -->
</template>

<script>
export default {
	data() {
		return {
			fromLocation: '',
			toLocation: ''
		}
	}
}
</script>

<style lang="scss" scoped></style>
