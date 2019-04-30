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
                    <div class="col-lg-5">
                        <div class="tp-itinerary">
                            <div class="legs">
                                <div class="d-inline-block float-left leg-time">1:06 p.m.</div>
                                <div class="d-inline-block float-left leg-detail">
                                    <div class="d-inline-block float-left leg-mode">
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
                        </div>
                    </div>
                    <div class="col-lg-7">
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
#tripPlanItinerary {
	padding: 1.5rem 0;

	@include media-breakpoint-up(lg) {
		padding: 3rem 0;
	}

	.card {
		margin-bottom: 0.75rem;
		border: 0;
		background-color: transparent;
		padding: 0;

		.card-header {
			background-color: transparent;
			border: 2px solid $gray-700;
			padding: 0;

			.tp-time {
				border-right: 2px solid $gray-700;
				@include fontSize(12);
				font-weight: $font-weight-bold;
				padding: 0.5rem;
				width: 6rem;

				@include media-breakpoint-up(lg) {
					@include fontSize(23);
					padding: 0.813rem;
					width: 9.857rem;
				}
			}

			.tp-route {
				display: flex;
				padding: 0.5rem;
				width: 100%;

				@include media-breakpoint-up(lg) {
					padding: 0.813rem;

					.icon-wrapper {
						width: 1.5rem;
						height: 1.5rem;
					}
				}

				.route {
					@include fontSize(8);

					@include media-breakpoint-up(lg) {
						@include fontSize(18);
					}
				}

				.rotate-right {
					transform: rotate(90deg);
					width: 0.5rem;
					height: 0.5rem;
				}

				.badge {
					border-radius: 0.25rem;
					@include fontSize(8);
					padding-right: 0.5rem;

					@include media-breakpoint-up(lg) {
						@include fontSize(16);
					}
				}

				.icon-chain-link {
					display: none;

					@include media-breakpoint-up(lgd) {
						display: inline-flex;
					}
				}
			}
		}

		.card-body {
			padding-right: 0;
			padding-left: 0;

			@include media-breakpoint-up(lg) {
				border: 1px solid $border-color;
				border-top: 0;
				padding: 1rem;
			}

			.tp-itinerary {
				.leg-time {
					font-weight: $font-weight-bold;
					margin-right: 3rem;
				}

				.leg-detail {
					width: 14.75rem;
					border-left: 4px dotted #7dcae7;
					margin-left: -1rem;
					padding-left: 1rem;
					position: relative;

					.leg-mode {
						background-color: $white;
						width: 2.5rem;
						height: 2.5rem;
						position: absolute;
						top: -0.5rem;
						left: -1.333rem;

						@include media-breakpoint-up(lg) {
							top: -0.25rem;
						}

						.icon-wrapper {
							width: 2.5rem;
							height: 2.5rem;
						}
					}

					p {
						padding-left: 0.75rem;
					}
				}
			}
		}
	}
}
</style>