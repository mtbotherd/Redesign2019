<template>
	<div class="icon-wrapper">
		<svg class="icon" :width="width" :height="height">
			<use v-bind="{ 'xlink:href': '/icon-sprite.svg#' + name }"></use>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		name: String, // ID of the symbol we want to use
		width: {
			type: [Number, String],
			default: '100%'
		},
		height: {
			type: [Number, String],
			default: '100%'
		}
	}
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
	width: 1rem;
	height: 1rem;
	display: inline-flex;
}
</style>
