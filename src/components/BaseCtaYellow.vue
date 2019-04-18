<template>
    <div class="text-center">
        <component :is="type" class="btn btn-warning" :to="to">
            {{ value }}
            <BaseIconSprite name="icon-sm-arrow-right-blue"/>
        </component>
    </div>
</template>

<script>
export default {
	computed: {
		type() {
			if (this.to) {
				return 'router-link'
			}

			return 'button'
		}
	},

	props: {
		to: {
			required: false
		},
		value: {
			type: String
		}
	}
}
</script>

<style lang="scss" scoped>
.btn-warning {
	position: relative;
	color: $body-color;
	//width: 100%;
	font-weight: $font-weight-bold;

	@include media-breakpoint-up(md) {
		width: 100%;
		@include fontSize(12);
	}

	@include media-breakpoint-up(lg) {
		width: 100%;
		@include fontSize(18);
	}

	.icon-wrapper {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;

		@include media-breakpoint-up(md) {
			top: 0.5rem;
			right: 0.25rem;
		}

		@include media-breakpoint-up(xl) {
			top: 0.75rem;
			right: 0.75rem;
		}
	}
}
// .btn-warning {
// 	font-weight: $font-weight-bold;
// 	color: $body-color;
// 	position: relative;
// 	width: 14.063rem;

// 	&:hover,
// 	&:focus {
// 		background-color: $blue;
// 		color: $white;
// 		border: 2px solid $blue;

// 		.state-normal {
// 			display: none;
// 		}
// 		.state-hover {
// 			display: inline-flex;
// 		}
// 	}

// 	.state-normal {
// 		display: inline-flex;
// 	}

// 	.state-hover {
// 		display: none;
// 	}

// 	@include media-breakpoint-up(md) {
// 		@include fontSize(23);
// 		width: 17.5rem;
// 		padding: 0.75rem;
// 	}

// 	.icon-wrapper {
// 		position: absolute;
// 		top: 0.75rem;
// 		right: 0.75rem;

// 		@include media-breakpoint-up(md) {
// 			top: 1.25rem;
// 			right: 0.75rem;
// 		}
// 	}
// }
</style>