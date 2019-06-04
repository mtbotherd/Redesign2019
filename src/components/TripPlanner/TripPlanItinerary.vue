<template>
    <div id="tripPlanItinerary" class="tt-trip-plan">
        <b-card no-body>
            <b-card-header>
                <span class="d-flex">
                    <span class="d-flex align-items-center tp-time">
                        56&nbsp;
                        <abbr title="minutes">min</abbr>
                    </span>
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
            <b-card-body class="border-top-0">
                <div class="row flex-row">
                    <div class="col-md-12 col-lg-5">
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
                                        <small>
                                            (about 4
                                            <abbr title="minutes">min</abbr>)
                                        </small>
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
                                        <BaseIconSprite name="icon-md-broadcast-red" class="blink"/>&nbsp;Currently 5
                                        <abbr title="minutes">min</abbr> late
                                        <br>
                                        <strong>Route 21</strong> Selby-Lake/Uptown
                                        <br>
                                        <b-link to="/home/#ServiceAlerts">
                                            <small>view alerts</small>
                                        </b-link>
                                    </p>
                                    <p>
                                        <strong>Depart</strong> from Selby
                                        <abbr title="avenue">Ave</abbr> &amp; Farrington
                                        <abbr title="street">St</abbr>
                                    </p>
                                    <p>
                                        <strong>Arrive</strong> at Snelling
                                        <abbr title="avenue">Ave</abbr> &amp; University
                                        <abbr title="avenue">Ave</abbr> / SpruceTree
                                        <abbr title="drive">Dr</abbr>
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
                                        <strong>Green Line</strong> to
                                        <abbr title="Minneapolis">Mpls</abbr>-Target Field
                                    </p>
                                    <p>
                                        <strong>Depart</strong> from Snelling
                                        <abbr title="avenue">Ave</abbr> Station
                                    </p>
                                    <p>
                                        <strong>Arrive</strong> at Target Field Station Platform 1
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
                                        <strong>Walk</strong> 0.25 miles
                                        <abbr title="west">W</abbr> to
                                        <abbr title="Fred T. Heywood">FTH</abbr>, Minneapolis, MN
                                        <br>
                                        <small>
                                            (about 6
                                            <abbr title="minutes">min</abbr>)
                                        </small>
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
                                        <strong>Arrive</strong>
                                        at
                                        <abbr
                                            title="Fred T. Heywood"
                                        >FTH</abbr>, Minneapolis, MN
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <hr class="d-block d-lg-none">
                    </div>
                    <div class="col-md-12 col-lg-7">
                        <div class="tp-basemap">
                            <b-card no-body class="border">
                                <img class="img-fluid" src="/img/TripPlanMap1.png">
                            </b-card>
                        </div>
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
.row.flex-row {
	display: flex;
	flex-wrap: wrap;
}
.row.flex-row > [class*='col-'] {
	display: flex;
	flex-direction: column;
}

/*
* And with max cross-browser enabled.
* Nobody should ever write this by hand. 
* Use a preprocesser with autoprefixing.
*/
.row.flex-row {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-flex-wrap: wrap;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
}

.row.flex-row > [class*='col-'] {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
}
// .tp-basemap {
// 	margin-top: 1rem;

// 	@include media-breakpoint-up(lg) {
// 		margin-top: 0;
// 	}
// }
</style>