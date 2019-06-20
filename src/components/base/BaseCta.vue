<!-- Usage:
	<BaseCta to="page-url">Button label</BaseCta>
-->
<template>
    <div class="text-center">
        <b-btn class="btn btn-warning" :to="to">
            <slot>{{ buttonLabel }}</slot>
            <BaseIconSprite name="icon-arrow-right-blue"/>
        </b-btn>
    </div>
</template>

<script>
export default {
	name: 'BaseCta',
	props: {
		name: String,
		type: String,
		to: {
			required: false
		}
	},
	data() {
		return {
			buttonLabel: 'Click me'
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
	}
}
</style>