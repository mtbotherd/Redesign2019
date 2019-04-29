<template>
    <div id="tripPlanItinerary" class="tt-trip-plan">
        <b-card no-body>
            <b-card-header>
                <span class="d-flex">
                    <span class="d-flex align-items-center tp-time">56 min</span>
                    <span class="align-items-center tp-route">
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
                    <div class="col-md-5">
                        <div class="current-itinerary">
                            <div class="legs">
                                <div class="leg-time">1:06 p.m.</div>
                                <div class="leg-mode">
                                    <BaseIconSprite name="icon-md-circle-pedestrian-color"/>
                                </div>
                                <div class="leg-detail">
                                    <p>
                                        <strong>Walk</strong> 0.12 miles to Selby
                                        <abbr title="avenue">Ave</abbr> &amp; Farrington
                                        <abbr title="street">St</abbr> (about 4 min)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7">Map goes here</div>
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

	@include media-breakpoint-up(md) {
		padding: 3rem 0;
	}

	.card {
		margin-bottom: 0.75rem;
		border: 0;
		background-color: transparent;
		padding: 0;

		.card-header {
			background-color: transparent;
			border: 1px solid $gray-700;
			padding: 0;

			.tp-time {
				border-right: 1px solid $gray-700;
				@include fontSize(12);
				font-weight: $font-weight-bold;
				padding: 0.5rem;
				width: 6rem;

				@include media-breakpoint-up(md) {
					@include fontSize(23);
					padding: 0.813rem;
					width: 9.857rem;
				}
			}

			.tp-route {
				display: flex;
				padding: 0.5rem;
				// padding: 0.5rem 0.75rem;
				width: 100%;

				@include media-breakpoint-up(md) {
					padding: 0.813rem;

					.icon-wrapper {
						width: 1.5rem;
						height: 1.5rem;
					}
				}

				.route {
					@include fontSize(8);

					@include media-breakpoint-up(md) {
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

					@include media-breakpoint-up(md) {
						@include fontSize(16);
					}
				}

				.icon-chain-link {
					display: none;

					@include media-breakpoint-up(md) {
						display: inline-flex;
					}
				}
			}
		}

		.card-body {
			border: 1px solid $border-color;
			border-top: 0;
		}
	}
}
</style>