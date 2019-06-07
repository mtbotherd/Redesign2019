<template>
    <div id="tripToolsTabs" class="trip-tools-tabs">
        <b-card no-body>
            <b-tabs>
                <b-tab title-item-class="trip-planner-tab mr-2" title-link-class="p-md-3" active>
                    <template slot="title">
                        <BaseIconSprite name="icon-lg-directions-color" class="svg-active mx-auto"/>
                        <BaseIconSprite
                            name="icon-lg-directions-white"
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
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-lg-clock-white"
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
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-lg-triangle-exclamation-white"
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
import TripPlannerModule from './trip-planner/TripPlannerModule'
import NexTripModule from './nextrip/NexTripModule'
import ServiceAlertsModule from './service-alerts/ServiceAlertsModule'

export default {
	name: 'TriptoolsTabs',
	components: {
		TripPlannerModule,
		NexTripModule,
		ServiceAlertsModule
	}
}
</script>

<style lang="scss" scoped>
// Style located in src/assets/scss/_triptools-tabs.scss
</style>
