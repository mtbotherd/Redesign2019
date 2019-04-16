<template>
    <div>
        <b-button variant="outline-primary">
            <slot>CTA Link</slot>
            <BaseIconSprite name="icon-sm-arrow-right-blue"/>
        </b-button>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.btn-outline-primary {
	position: relative;
	border: 2px solid $primary;
	width: 14.063rem;

	&:hover {
		background-color: $gray-100;
	}

	@include media-breakpoint-up(md) {
		@include fontSize(23);
		width: 17.5rem;
		padding: 0.75rem;
	}

	a {
		font-weight: $font-weight-bold;
		color: $body-color;

		&:hover {
			//background-color: $white;
		}
	}

	.icon-wrapper {
		position: absolute;
		top: 1.25rem;
		right: 0.75rem;
	}
}
</style>