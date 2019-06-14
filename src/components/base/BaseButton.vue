<!-- Usage:
	<BaseButton type="type" name="name">Button label</BaseButton>
-->
<template>
    <b-btn variant="warning" @click.native="$emit('click', $event)" class="mt-2">
        <slot>{{ buttonLabel }}</slot>
    </b-btn>
</template>

<script>
export default {
	name: 'BaseButton',
	prop: {
		name: String,
		type: String
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
	font-weight: $font-weight-bold;
	color: $body-color;
	width: 14.063rem;

	@include media-breakpoint-up(md) {
		@include fontSize(23);
		width: 17.5rem;
		padding: 0.75rem;
	}
}
</style>