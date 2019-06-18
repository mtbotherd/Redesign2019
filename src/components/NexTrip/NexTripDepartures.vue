<template>
    <div id="nexTripDepartures">
        <div class="card p-2">
            <p class="h2 text-center">Departures</p>
            <p>
                Selby
                <abbr title="avenue">Ave</abbr>. and Dale
                <abbr title="street">St</abbr>.
                <br>Stop 17023
            </p>
            <div class="list-group mb-2">
                <div class="list-group-item pr-0 pl-0">
                    <div class="row">
                        <div class="col-8">
                            <span class="nt-route-number mr-2">21 A</span>
                            <span class="nt-route-name mr-3">Shelby-Lake / Uptown</span>
                        </div>
                        <div class="col-4 text-right">
                            <span class="nt-depart-time float-right">
                                <BaseIconSprite name="icon-md-broadcast-red" class="blink mr-1"/>6
                                <abbr title="minutes">min</abbr>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="list-group-item pr-0 pl-0">
                    <div class="row">
                        <div class="col-8">
                            <span class="nt-route-number mr-2">21 A</span>
                            <span class="nt-route-name mr-3">Shelby-Lake / Uptown</span>
                        </div>
                        <div class="col-4 text-right">
                            <span class="nt-depart-time float-right">
                                <BaseIconSprite name="icon-md-broadcast-red" class="blink mr-1"/>6
                                <abbr title="minutes">min</abbr>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="list-group-item pr-0 pl-0">
                    <div class="row">
                        <div class="col-8">
                            <span class="nt-route-number mr-2">21 A</span>
                            <span
                                class="nt-route-name pr-3"
                            >SW Transit - Express - Chaska - Chanhassen Mpls</span>
                        </div>
                        <div class="col-4 text-right">
                            <span class="nt-depart-time">7:49 p.m.</span>
                        </div>
                    </div>
                </div>
            </div>
            <b-link class="nt-show-more-link">
                <BaseIconSprite name="icon-sm-circle-plus-blue" class="mr-2"/>
                <span class="nt-show-more-link-text">Show more</span>
            </b-link>
        </div>

        <!-- Elements to collapse -->
    </div>
</template>

<script>
export default {
	name: 'NexTripDepartures'
}
</script>

<style lang="scss" scoped>
#nexTripDepartures {
	margin-bottom: 3rem;
	.card {
		background-color: $gray-100;

		.list-group-item {
			background-color: transparent;
			border-color: $gray-300;
			border-right: none;
			border-left: none;
		}

		.nt-show-more-link {
			position: relative;
			color: $gray-600;
			font-size: 20px;
			font-weight: $font-weight-bold;

			.icon-wrapper {
				position: absolute;
				top: 3px;
				width: 22px;
				height: 22px;
			}

			.nt-show-more-link-text {
				margin-left: 27px;
			}
		}

		.nt-route-number,
		.nt-depart-time {
			font-weight: $font-weight-bold;
		}
	}
}
</style>