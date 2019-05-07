<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 18 18"
        :aria-labelledby="iconName"
        role="presentation"
    >
        <title :id="iconName" lang="en">{{ iconName }} icon</title>
        <g>
            <slot></slot>
        </g>
    </svg>
</template>

<script>
export default {
	props: {
		iconName: {
			type: String,
			default: 'box'
		},
		width: {
			type: [Number, String],
			default: 18
		},
		height: {
			type: [Number, String],
			default: 18
		}
	}
}
</script>

<style lang="scss" scoped>
</style>