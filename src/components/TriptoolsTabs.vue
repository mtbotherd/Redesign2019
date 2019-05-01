<template>
    <div id="tripToolsTabs" class="trip-tools-tabs">
        <TabsTest/>
        <!-- <b-card no-body>
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
                        <TripPlanner/>
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
                        class="tt-nextrip tab-pane fade"
                        role="tabpanel"
                        aria-labelledby="nextrip-tab"
                    >
                        <NexTrip/>
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
                        class="tt-alerts tab-pane fade"
                        role="tabpanel"
                        aria-labelledby="alerts-tab"
                    >
                        <ServiceAlerts/>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>-->
    </div>
</template>

<script>
import TabsTest from './TabsTest'
// import TripPlanner from './TripPlanner'
// import NexTrip from './NexTrip'
// import ServiceAlerts from './ServiceAlerts'

export default {
	name: 'TriptoolsTabs',
	components: {
		TabsTest
		// TripPlanner,
		// NexTrip,
		// ServiceAlerts
	}
}
</script>

<style lang="scss" scoped></style>
