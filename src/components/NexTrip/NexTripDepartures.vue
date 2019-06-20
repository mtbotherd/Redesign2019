<template>
    <div id="nexTripDepartures">
        <div class="card mb-3 p-2">
            <p class="h2 text-center">Departures</p>
            <p>
                Selby
                <abbr title="avenue">Ave</abbr>. and Dale
                <abbr title="street">St</abbr>.
                <br>Stop 17023
            </p>
            <div class="list-group mb-2">
                <div class="d-flex list-group-item pr-0 pl-0">
                    <span class="nt-route-number mr-2">21 A</span>
                    <span class="nt-route-name">Shelby-Lake / Uptown</span>
                    <span class="nt-depart-time ml-auto">
                        <BaseIconSprite name="icon-broadcast-red" class="blink mr-1"/>6
                        <abbr title="minutes">min</abbr>
                    </span>
                </div>
                <div class="d-flex list-group-item pr-0 pl-0">
                    <span class="nt-route-number mr-2">21 A</span>
                    <span class="nt-route-name">Shelby-Lake / Uptown</span>
                    <span class="nt-depart-time ml-auto">
                        <BaseIconSprite name="icon-broadcast-red" class="blink mr-1"/>6
                        <abbr title="minutes">min</abbr>
                    </span>
                </div>
                <div class="d-flex list-group-item pr-0 pl-0">
                    <span class="nt-route-number mr-2">21 A</span>
                    <span class="nt-route-name mr-2">SW Transit - Express - Chaska - Chanhassen Mpls</span>
                    <span class="nt-depart-time ml-auto">10:00 p.m.</span>
                </div>
            </div>
            <b-link class="nt-show-more-link">
                <BaseIconSprite name="icon-sm-circle-plus-blue" class="mr-2"/>
                <span class="nt-show-more-link-text">Show more</span>
            </b-link>
        </div>

        <div class="nt-show-my-bus">
            <b-btn
                v-b-toggle.collapse-a.collapse-b
                variant="light"
                class="d-flex align-items-center btn-block text-left"
            >
                <BaseIconSprite name="icon-bus-broadcast-gray" class="bus-broadcast-icon mr-2"/>Show my bus
                <BaseIconSprite name="icon-chevron-down-blue" class="ml-auto"/>
            </b-btn>
            <b-collapse id="collapse-a">
                <b-card no-body>
                    <img class="img-fluid" src="/img/TripPlanMap1.png">
                </b-card>
            </b-collapse>
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

		.nt-route-number {
			font-weight: $font-weight-bold;
		}
		.nt-depart-time {
			font-weight: $font-weight-bold;
		}

		.nt-route-name {
			max-width: 219px;

			@include media-breakpoint-up(md) {
				max-width: 100%;
			}
		}
	}

	.nt-show-my-bus {
		.btn {
			color: $gray-600;
			@include fontSize(20);
			font-weight: $font-weight-bold;
		}

		.bus-broadcast-icon {
			width: 28px;
			height: 28px;
		}
	}
}
</style>