<!-- Usage:
	<baseLink :to="{ name: 'router-link-name' }">button label</baseLink>
-->
<template>
    <div class="text-center">
        <b-link class="btn btn-outline-primary" :href="href">
            <slot>{{ buttonLabel }}</slot>
            <BaseIconSprite name="icon-arrow-right-blue" class="state-normal"/>
            <BaseIconSprite name="icon-arrow-right-white" class="state-hover"/>
        </b-link>
    </div>
</template>

<script>
export default {
	name: 'BaseLink',
	props: {
		href: {
			required: true,
			type: String
		}
	},
	data() {
		return {
			buttonLabel: 'Click me' // default button label
		}
	}
}
</script>

<style lang="scss" scoped>
.btn-outline-primary {
	font-weight: $font-weight-bold;
	color: $body-color;
	position: relative;
	border: 2px solid $primary;
	width: 14.063rem;

	&:hover,
	&:focus {
		background-color: $blue;
		color: $white;
		border: 2px solid $blue;

		.state-normal {
			display: none;
		}
		.state-hover {
			display: inline-flex;
		}
	}

	.state-normal {
		display: inline-flex;
	}

	.state-hover {
		display: none;
	}

	@include media-breakpoint-up(md) {
		width: 17.5rem;
		padding: 0.75rem;
	}

	.icon-wrapper {
		position: absolute;
		top: 0.65rem;
		right: 0.75rem;

		@include media-breakpoint-up(md) {
			top: 1.25rem;
			right: 0.75rem;
		}
	}
}
</style>