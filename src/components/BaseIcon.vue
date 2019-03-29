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
		name: String,
		width: {
			type: [Number, String],
			default: 24
		},
		height: {
			type: [Number, String],
			default: 21
		}
	}
}
</script>

<style scoped></style>
