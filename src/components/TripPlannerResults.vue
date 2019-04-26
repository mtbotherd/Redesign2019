<template>
    <div id="tripPlannerResults" class="tt-trip-planner-results">
        <h2>Suggested trips</h2>
        <p class="mb-0">
            <strong>Start:&nbsp;</strong>225 Farrington
            <abbr title="street">St.</abbr>,
            <abbr title="Saint Paul">St.</abbr> Paul, MN 55102
        </p>
        <p>
            <strong>End:&nbsp;</strong>560 6th
            <abbr title="avenue">Ave.</abbr> N, Minneapolis, MN 55411
        </p>
        <div class="tp-itinerary" role="tablist">
            <b-card no-body>
                <b-card-header header-tag="header" class="d-flex border" role="tab">
                    <div class="d-flex align-items-center trip-time border-right">56 min</div>
                    <div class="trip-route align-items-center">
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
                        <BaseIconSprite name="icon-sm-arrow-right-blue" class="ml-auto"/>
                    </div>
                </b-card-header>
                <b-collapse id="tpMoreOptions" accordion="tp-more-options" role="tabpanel">
                    <b-card-body class="border">
                        <b-card-text class="mb-0">
                            <strong>I'm willing to walk:</strong>
                        </b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body>
                <b-card-header header-tag="header" class="d-flex border" role="tab">
                    <div class="d-flex align-items-center trip-time border-right">1 hr 2 min</div>
                    <div class="trip-route align-items-center">
                        <BaseIconSprite name="icon-sm-pedestrian-gray"/>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right mr-2"/>
                        <BaseIconSprite name="icon-sm-bus-gray"/>&nbsp;
                        <span class="route mr-1">21</span>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right mr-1"/>
                        <BaseIconSprite name="icon-sm-pedestrian-gray"/>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right mr-2"/>
                        <span class="d-flex align-items-center badge badge-secondary mr-1">
                            <BaseIconSprite name="icon-sm-lrt-white"/>
                            <span class="caps">Blue</span>
                        </span>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right"/>
                        <BaseIconSprite name="icon-sm-pedestrian-gray" class="mr-1"/>
                        <BaseIconSprite name="icon-sm-arrow-right-blue" class="ml-auto"/>
                    </div>
                </b-card-header>
                <b-collapse id="tpMoreOptions" accordion="tp-more-options" role="tabpanel">
                    <b-card-body class="border">
                        <b-card-text class="mb-0">
                            <strong>I'm willing to walk:</strong>
                        </b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body>
                <b-card-header header-tag="header" class="d-flex border" role="tab">
                    <div class="d-flex align-items-center trip-time border-right">1 hr 6 min</div>
                    <div class="trip-route align-items-center">
                        <BaseIconSprite name="icon-sm-pedestrian-gray"/>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right mr-2"/>
                        <BaseIconSprite name="icon-sm-bus-gray"/>&nbsp;
                        <span class="route mr-1">21</span>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right mr-2"/>
                        <span class="d-flex align-items-center badge badge-success mr-1">
                            <BaseIconSprite name="icon-sm-lrt-white"/>
                            <span class="caps">Green</span>
                        </span>
                        <BaseIconSprite name="icon-sm-chevron-up-gray" class="rotate-right"/>
                        <BaseIconSprite name="icon-sm-pedestrian-gray" class="mr-1"/>
                        <BaseIconSprite name="icon-sm-arrow-right-blue" class="ml-auto"/>
                    </div>
                </b-card-header>
                <b-collapse id="tpMoreOptions" accordion="tp-more-options" role="tabpanel">
                    <b-card-body class="border">
                        <b-card-text class="mb-0">
                            <strong>I'm willing to walk:</strong>
                        </b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.tt-trip-planner-results {
	p {
		@include fontSize(16);
	}

	.card {
		margin-bottom: 0.75rem;

		&:last-child {
			margin-bottom: 3rem;
		}

		.card-header {
			background-color: transparent;
			padding: 0;

			.trip-time {
				@include fontSize(12);
				font-weight: $font-weight-bold;
				padding: 0.5rem;
				width: 6rem;
			}

			.trip-route {
				display: flex;
				padding: 0.5rem 0.75rem;
				width: 100%;

				.route {
					@include fontSize(8);
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
				}
			}

			&:hover {
				border: 1px solid $cyan !important;

				.trip-time {
					background-color: $cyan;
					color: $white;
				}

				.trip-route {
					background-color: $teal;
				}
			}
		}
	}
}
</style>