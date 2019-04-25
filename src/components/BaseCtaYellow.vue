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
	@include fontSize(12);
	font-weight: $font-weight-bold;
	width: 100%;

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
		top: 0.6rem;
		right: 0.75rem;
		width: 0.75rem;
		height: 0.75rem;

		@include media-breakpoint-up(lg) {
			top: 0.75rem;
			width: 1rem;
			height: 1rem;
		}

		// @include media-breakpoint-up(xl) {
		// 	top: 0.75rem;
		// 	right: 0.75rem;
		// }
	}
}
</style>