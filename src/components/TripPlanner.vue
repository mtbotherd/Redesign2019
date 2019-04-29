<template>
    <div id="tripPlanner" class="card border-0">
        <h1 class="sr-only">Trip Planner</h1>
        <TripPlannerForm/>
        <TripPlannerResults/>
        <div class="text-center">
            <BaseButton type="submit" name="planMyTrip">Plan my trip</BaseButton>
        </div>
    </div>
</template>

<script>
import TripPlannerForm from './TripPlannerForm'
import TripPlannerResults from './TripPlannerResults'

export default {
	name: 'TripPlanner',
	components: {
		TripPlannerForm,
		TripPlannerResults
	}
}
</script>

<style lang="scss" scoped>
#tripPlannerForm {
	.tp-location-toggler .icon-wrapper {
		width: 2rem;
		height: 2rem;
	}

	.tp-time-elements {
		display: none;

		.input-group-append {
			padding: 0.375rem 0.75rem;
		}
	}

	.more-options {
		margin-bottom: 1rem;
		.card {
			.card-header {
				background-color: transparent;
				border-bottom: 0;
				padding: 0;

				.btn-link {
					text-decoration: none;
					color: $body-color;
					@include fontSize(17);
					font-weight: 500;
					padding: 0.375rem 0.75rem;

					@include media-breakpoint-up(md) {
						@include fontSize(23);
						padding: 0.454rem 1rem;
					}

					&:focus {
						color: #626462;
						background-color: #fff;
						border-color: #51cfff;
						outline: 0;
						-webkit-box-shadow: 0 0 0 0.2rem rgba(0, 151, 208, 0.25);
						box-shadow: 0 0 0 0.2rem rgba(0, 151, 208, 0.25);
					}
				}
			}

			.card-body {
				background-color: $gray-100;
			}
		}
		@include media-breakpoint-up(xl) {
			margin-bottom: 1.5rem;
		}
	}
}
</style>
