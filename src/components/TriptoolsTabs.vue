<template>
    <div id="tripToolsTabs" class="trip-tools-tabs">
        <b-card no-body>
            <b-tabs>
                <b-tab title-item-class="trip-planner-tab mr-2" title-link-class="p-md-3" active>
                    <template slot="title">
                        <BaseIconSprite
                            name="icon-lg-directions-color"
                            width="37"
                            height="32"
                            class="svg-active mx-auto"
                        />
                        <BaseIconSprite
                            name="icon-lg-directions-white"
                            width="37"
                            height="32"
                            class="svg-inactive mx-auto"
                        />Trip Planner
                    </template>
                    <div
                        class="tt-trip-planner tab-pane fade show active"
                        role="tabpanel"
                        aria-labelledby="trip-planner-tab"
                    >
                        <TripPlannerModule/>
                    </div>
                </b-tab>
                <b-tab title-item-class="mr-2" title-link-class="p-md-3">
                    <template slot="title">
                        <BaseIconSprite
                            name="icon-lg-clock-color"
                            width="32"
                            height="32"
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-lg-clock-white"
                            width="32"
                            height="32"
                            class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
                        />NexTrip
                    </template>
                    <div
                        class="tt-nextrip tab-pane fade show"
                        role="tabpanel"
                        aria-labelledby="nextrip-tab"
                    >
                        <NexTripModule/>
                    </div>
                </b-tab>
                <b-tab title-link-class="p-md-3">
                    <template slot="title">
                        <BaseIconSprite
                            name="icon-lg-triangle-exclamation-color"
                            width="37"
                            height="32"
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-lg-triangle-exclamation-white"
                            width="37"
                            height="32"
                            class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
                        />Alerts
                    </template>
                    <div
                        class="tt-alerts tab-pane fade show"
                        role="tabpanel"
                        aria-labelledby="alerts-tab"
                    >
                        <ServiceAlertsModule/>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import TripPlannerModule from './TripPlanner/TripPlannerModule'
import NexTripModule from './NexTrip/NexTripModule'
import ServiceAlertsModule from './ServiceAlerts/ServiceAlertsModule'

export default {
	name: 'TriptoolsTabs',
	components: {
		TripPlannerModule,
		NexTripModule,
		ServiceAlertsModule
	}
}
</script>

<style lang="scss" scoped></style>
