<template>
    <div id="tripPlanItinerary" class="tt-trip-plan">
        <b-card no-body>
            <b-card-header>
                <span class="d-flex">
                    <span class="d-flex align-items-center tp-time">56 min</span>
                    <span class="d-flex align-items-center tp-route">
                        <BaseIconSprite name="icon-sm-pedestrian-gray"/>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right mr-2"/>
                        <BaseIconSprite name="icon-sm-bus-gray"/>&nbsp;
                        <span class="route mr-1">21</span>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right mr-1"/>
                        <span class="d-flex align-items-center badge badge-success mr-1">
                            <BaseIconSprite name="icon-sm-lrt-white"/>
                            <span class="caps">Green</span>
                        </span>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right"/>
                        <BaseIconSprite name="icon-sm-pedestrian-gray" class="mr-1"/>
                        <BaseIconSprite name="icon-sm-link-gray" class="icon-chain-link ml-auto"/>
                    </span>
                </span>
            </b-card-header>
            <b-card-body>
                <div class="row">
                    <div class="col-md-12 col-lg-5 col-xl-4">
                        <div class="d-block tp-itinerary">
                            <div id="leg-1" class="float-left leg-item leg-walk">
                                <div class="d-inline-block float-left leg-time">1:06 p.m.</div>
                                <div class="d-inline-block float-left leg-mode walk">
                                    <div class="d-inline-block float-left leg-mode-icon">
                                        <BaseIconSprite name="icon-md-circle-pedestrian-color"/>
                                    </div>
                                    <p>
                                        <strong>Walk</strong> 0.12 miles to Selby
                                        <abbr title="avenue">Ave</abbr> &amp; Farrington
                                        <abbr title="street">St</abbr>
                                        <br>
                                        <small>(about 4 min)</small>
                                    </p>
                                </div>
                            </div>
                            <div id="leg-2" class="leg-item leg-bus">
                                <div class="d-inline-block float-left leg-time">1:10 p.m.</div>
                                <div class="d-inline-block float-left leg-mode bus">
                                    <div class="d-inline-block float-left leg-mode-icon">
                                        <BaseIconSprite name="icon-lg-circle-bus-gray"/>
                                    </div>
                                    <p>
                                        <BaseIconSprite name="icon-md-broadcast-red"/>&nbsp;Currently 5 min late
                                        <br>
                                        <strong>Route: 21 Selby-Lake/Uptown</strong>&nbsp;
                                        <b-link to="/home/#ServiceAlerts">view alerts</b-link>
                                    </p>
                                </div>
                            </div>
                            <div id="leg-3" class="leg-item leg-lrt-green">
                                <div class="d-inline-block float-left leg-time">1:40 p.m.</div>
                                <div class="d-inline-block float-left leg-mode metro-green">
                                    <div class="d-inline-block float-left leg-mode-icon">
                                        <BaseIconSprite name="icon-md-circle-lrt-green"/>
                                    </div>
                                    <p>
                                        <strong>Walk</strong> 0.12 miles to Selby
                                        <abbr title="avenue">Ave</abbr> &amp; Farrington
                                        <abbr title="street">St</abbr>
                                        <br>
                                        <small>(about 4 min)</small>
                                    </p>
                                </div>
                            </div>
                            <div id="leg-4" class="leg-item leg-walk">
                                <div class="d-inline-block float-left leg-time">1:10 p.m.</div>
                                <div class="d-inline-block float-left leg-mode walk">
                                    <div class="d-inline-block float-left leg-mode-icon">
                                        <BaseIconSprite name="icon-md-circle-pedestrian-color"/>
                                    </div>
                                    <p>
                                        <strong>Walk</strong> 0.12 miles to Selby
                                        <abbr title="avenue">Ave</abbr> &amp; Farrington
                                        <abbr title="street">St</abbr>
                                        <br>
                                        <small>(about 4 min)</small>
                                    </p>
                                </div>
                            </div>
                            <div id="leg-5" class="leg-item leg-arrive">
                                <div class="d-inline-block float-left leg-time">12:88 p.m.</div>
                                <div class="d-inline-block float-left leg-mode arrive">
                                    <div class="d-inline-block float-left leg-mode-icon">
                                        <BaseIconSprite name="icon-md-circle-pin-color"/>
                                    </div>
                                    <p>
                                        <strong>Walk</strong> 0.12 miles to Selby
                                        <abbr title="avenue">Ave</abbr> &amp; Farrington
                                        <abbr title="street">St</abbr>
                                        <br>
                                        <small>(about 4 min)</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-7 col-xl-8">
                        <div class="tp-map">Base map</div>
                    </div>
                </div>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
	name: 'TripPlanItinerary'
}
</script>

<style lang="scss" scoped>
</style>