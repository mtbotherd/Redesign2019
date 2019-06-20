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
                        <BaseIconSprite name="icon-pedestrian-gray"/>
                        <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right mr-2"/>
                        <BaseIconSprite name="icon-bus-gray"/>&nbsp;
                        <span class="route mr-1">21</span>
                        <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right mr-1"/>
                        <span class="d-flex align-items-center badge badge-success mr-1">
                            <BaseIconSprite name="icon-lrt-white"/>
                            <span class="caps">Green</span>
                        </span>
                        <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right"/>
                        <BaseIconSprite name="icon-pedestrian-gray" class="mr-1"/>
                        <BaseIconSprite name="icon-link-gray" class="icon-chain-link ml-auto"/>
                    </span>
                </span>
            </b-card-header>
            <b-card-body class="border-top-0">
                <div class="row flex-row">
                    <div class="col-lg-5">
                        <div class="d-block tp-itinerary">
                            <div class="leg-item">
                                <div class="d-table-cell leg-time">1:06 p.m.</div>
                                <div class="d-table-cell leg-mode walk">
                                    <div class="d-table-cell leg-mode-icon">
                                        <BaseIconSprite name="icon-circle-pedestrian-color"/>
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
                            <div class="leg-item">
                                <div class="d-table-cell leg-time">1:10 p.m.</div>
                                <div class="d-table-cell leg-mode bus">
                                    <div class="d-table-cell leg-mode-icon">
                                        <BaseIconSprite name="icon-circle-bus-gray"/>
                                    </div>
                                    <p>
                                        <BaseIconSprite name="icon-broadcast-red" class="blink"/>&nbsp;Currently 5
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
                            <div class="leg-item">
                                <div class="d-table-cell leg-time">1:40 p.m.</div>
                                <div class="d-table-cell leg-mode metro-green">
                                    <div class="d-table-cell leg-mode-icon">
                                        <BaseIconSprite name="icon-circle-lrt-green"/>
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
                            <div class="leg-item">
                                <div class="d-table-cell leg-time">1:10 p.m.</div>
                                <div class="d-table-cell leg-mode walk">
                                    <div class="d-table-cell leg-mode-icon">
                                        <BaseIconSprite name="icon-circle-pedestrian-color"/>
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
                            <div class="leg-item">
                                <div class="d-table-cell leg-time">12:88 p.m.</div>
                                <div class="d-table-cell leg-mode arrive">
                                    <div class="d-table-cell leg-mode-icon">
                                        <BaseIconSprite name="icon-circle-pin-color"/>
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
                    <div class="col-lg-7">
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