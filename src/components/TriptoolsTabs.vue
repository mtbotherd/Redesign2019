<template>
    <div id="tripToolsTabs" class="trip-tools-tabs">
        <b-card no-body>
            <b-tabs v-model="tabIndex">
                <b-tab
                    title="Trip Planner"
                    title-item-class="mr-2"
                    title-link-class="p-md-3"
                    href="#trip-planner"
                    active
                >
                    <template slot="title">
                        <BaseIconSprite name="icon-lg-directions-color" class="svg-active mx-auto"/>
                        <BaseIconSprite
                            name="icon-lg-directions-white"
                            class="svg-inactive mx-auto"
                        />Trip Planner
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
                            name="icon-lg-clock-color"
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-lg-clock-white"
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
                            name="icon-lg-triangle-exclamation-color"
                            class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                        />
                        <BaseIconSprite
                            name="icon-lg-triangle-exclamation-white"
                            class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
                        />Alerts
                    </template>
                    <div class="tt-alerts tab-pane fade show" role="tabpanel">
                        <AlertsModule/>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>

        <!-- <b-nav tabs fill>
            <b-nav-item href="#tripPlanner" active>
                <BaseIconSprite name="icon-lg-directions-color" class="svg-active mx-auto"/>
                <BaseIconSprite name="icon-lg-directions-white" class="svg-inactive mx-auto"/>Trip Planner
                <div class="tt-trip-planner tab-pane fade show active" role="tabpanel">
                <TripPlannerModule/>
                </div>
            </b-nav-item>
            <b-nav-item href="#nextrip">
                <BaseIconSprite
                    name="icon-lg-clock-color"
                    class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                />
                <BaseIconSprite
                    name="icon-lg-clock-white"
                    class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
                />NexTrip
                <div class="tt-nextrip tab-pane fade show" role="tabpanel">
                <NexTripModule/>
                </div>
            </b-nav-item>
            <b-nav-item href="#alerts">
                <BaseIconSprite
                    name="icon-lg-triangle-exclamation-color"
                    class="svg-active d-block d-md-inline-block ml-auto mr-auto"
                />
                <BaseIconSprite
                    name="icon-lg-triangle-exclamation-white"
                    class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
                />Alerts
                <div class="tt-alerts tab-pane fade show" role="tabpanel">
                <AlertsModule/>
                </div>
            </b-nav-item>
        </b-nav>-->
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
	},
	data() {
		return {
			// Used for links back to tabs using hash.
			tabIndex: 0, // Current tab
			tabs: ['#trip-planner', '#nextrip', '#alerts']
		}
	},
	mounted() {
		// Find tab in index and set active - uses hash from tabs data above.
		this.tabIndex = this.tabs.findIndex(tab => tab === this.$route.hash)
	}
}
</script>

<style lang="scss" scoped>
// Style located in src/assets/scss/_triptools-tabs.scss
</style>
