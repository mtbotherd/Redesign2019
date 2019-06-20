<template>
    <div id="tripPlannerResults">
        <h2>Suggested trips</h2>
        <p class="mb-0">
            <strong>Start:&nbsp;</strong>225 Farrington
            <abbr title="street">St.</abbr>,
            <abbr title="Saint">St.</abbr> Paul, MN 55102
        </p>
        <p>
            <strong>End:&nbsp;</strong>560 6th
            <abbr title="avenue">Ave.</abbr> N, Minneapolis, MN 55411
        </p>
        <div class="tp-itinerary" role="tablist">
            <b-card no-body>
                <b-link to="/trip-plan" class="border">
                    <span class="d-flex" role="link">
                        <span class="d-flex align-items-center tp-time">56 min</span>
                        <span class="align-items-center tp-route">
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
                            <BaseIconSprite name="icon-arrow-right-blue" class="ml-auto"/>
                        </span>
                    </span>
                </b-link>
            </b-card>
            <b-card no-body>
                <b-link to="/trip-plan" class="border">
                    <span class="d-flex" role="link">
                        <span class="d-flex align-items-center tp-time">1 hr 2 min</span>
                        <span class="align-items-center tp-route">
                            <BaseIconSprite name="icon-pedestrian-gray"/>
                            <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right mr-1"/>
                            <BaseIconSprite name="icon-bus-gray"/>&nbsp;
                            <span class="route mr-1">21</span>
                            <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right mr-1"/>
                            <BaseIconSprite name="icon-pedestrian-gray"/>
                            <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right mr-1"/>
                            <span class="d-flex align-items-center badge badge-secondary mr-1">
                                <BaseIconSprite name="icon-lrt-white"/>
                                <span class="caps">Blue</span>
                            </span>
                            <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right"/>
                            <BaseIconSprite name="icon-pedestrian-gray" class="mr-1"/>
                            <BaseIconSprite name="icon-arrow-right-blue" class="ml-auto"/>
                        </span>
                    </span>
                </b-link>
            </b-card>
            <b-card no-body>
                <b-link to="/trip-plan" class="border">
                    <span class="d-flex" role="link">
                        <span class="d-flex align-items-center tp-time">1 hr 6 min</span>
                        <span class="align-items-center tp-route">
                            <BaseIconSprite name="icon-pedestrian-gray"/>
                            <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right mr-2"/>
                            <BaseIconSprite name="icon-bus-gray"/>&nbsp;
                            <span class="route mr-1">21</span>
                            <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right mr-2"/>
                            <span class="d-flex align-items-center badge badge-success mr-1">
                                <BaseIconSprite name="icon-lrt-white"/>
                                <span class="caps">Green</span>
                            </span>
                            <BaseIconSprite name="icon-chevron-up-gray" class="rotate-right"/>
                            <BaseIconSprite name="icon-pedestrian-gray" class="mr-1"/>
                            <BaseIconSprite name="icon-arrow-right-blue" class="ml-auto"/>
                        </span>
                    </span>
                </b-link>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
	name: 'TripPlannerResults'
}
</script>

<style lang="scss" scoped>
#tripPlannerResults {
	.card {
		margin-bottom: 0.75rem;
		background-color: transparent;
		padding: 0;

		a {
			color: $body-color;

			.tp-time {
				border-right: 1px solid $border-color;
				@include fontSize(12);
				font-weight: $font-weight-bold;
				padding: 0.5rem;
				width: 6rem;
			}

			.tp-route {
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

				.tp-time {
					background-color: $cyan;
					color: $white;
				}

				.tp-route {
					background-color: $teal;
				}
			}
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>