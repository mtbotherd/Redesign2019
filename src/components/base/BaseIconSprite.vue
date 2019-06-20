<template>
    <span class="icon-wrapper">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            class="icon"
            :width="width"
            :height="height"
        >
            <use v-bind="{ 'xlink:href': '../../../../../img/icon-sprite.svg#' + name }"></use>
        </svg>
    </span>
</template>

<script>
export default {
	name: 'BaseIconSprite',
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
