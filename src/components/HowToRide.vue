<template>
    <div id="howToRide" class="how-to-ride">
        <BaseIconSprite name="icon-lg-circle-exclamation-color"/>
        <BaseCta to="how-to-ride-guide" value="How to Ride"/>
    </div>
</template>

<script>
export default {
	name: 'HowToRide'
}
</script>

<style lang="scss" scoped>
.how-to-ride {
	position: relative;
	width: 345px;
	margin: 0 auto;

	@include media-breakpoint-up(md) {
		width: 410px;
	}

	.icon-wrapper {
		position: absolute;
		top: 0.25rem;
		left: 1rem;
		width: 32px;
		height: 32px;

		@include media-breakpoint-up(md) {
			top: 0.45rem;
			left: 0;
			width: 50px;
			height: 50px;
		}
	}
}
</style>