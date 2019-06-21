<template>
    <div id="tripToolsTabs" class="trip-tools-tabs">
        <b-card no-body>
            <b-tabs>
                <b-tab
                    title="Trip Planner"
                    title-item-class="mr-2"
                    title-link-class="p-md-3"
                    href="#trip-planner"
                    active
                >
                    <template slot="title">
                        <BaseIconSprite name="icon-directions-color" class="svg-active mx-auto"/>
                        <BaseIconSprite name="icon-directions-white" class="svg-inactive mx-auto"/>Trip Planner
                    </template>
                    <div class="tt-trip-planner tab-pane fade show active" role="tabpanel">
                        <TripPlannerModule/>
                    </div>
                </b-tab>
                <b-tab
                    title="NexTrip"
                    title-item-class="mr-2"
                    title-link-class="p-md-3"
                    href="#nextrip"
                >
                    <template slot="title">
                        <BaseIconSprite
                            name="icon-clock-color"
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-clock-white"
                            class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
                        />NexTrip
                    </template>
                    <div class="tt-nextrip tab-pane fade show" role="tabpanel">
                        <NexTripModule/>
                    </div>
                </b-tab>
                <b-tab title="Alerts" title-link-class="p-md-3" href="#alerts">
                    <template slot="title">
                        <BaseIconSprite
                            name="icon-triangle-exclamation-color"
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-triangle-exclamation-white"
                            class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
                        />Alerts
                    </template>
                    <div class="tt-alerts tab-pane fade show" role="tabpanel">
                        <AlertsModule/>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import TripPlannerModule from './trip-planner/TripPlannerModule'
import NexTripModule from './nextrip/NexTripModule'
import AlertsModule from './alerts/AlertsModule'

export default {
	name: 'TriptoolsTabs',
	components: {
		TripPlannerModule,
		NexTripModule,
		AlertsModule
	}
}
</script>

<style lang="scss" scoped>
// Style located in src/assets/scss/_triptools-tabs.scss
</style>
