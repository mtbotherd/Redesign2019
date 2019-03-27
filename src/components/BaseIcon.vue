<template>
	<div class="icon-wrapper">
		<svg class="icon" :width="width" :height="height">
			<use v-bind="{ 'xlink:href': '/sample-sprite.svg#' + name }"></use>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		name: String,
		width: {
			type: [Number, String],
			default: 37
		},
		height: {
			type: [Number, String],
			default: 37
		}
	}
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
	font-weight: 600;
	position: absolute;
	top: 0.4rem;
	left: 3.5rem;

	.icon {
		margin-right: 6px;
	}
}
</style>
