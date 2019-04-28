<template>
    <div class="text-center">
        <component :is="type" class="btn btn-outline-primary" :to="to">
            {{ value }}
            <BaseIconSprite name="icon-sm-arrow-right-blue" class="state-normal"/>
            <BaseIconSprite name="icon-sm-arrow-right-white" class="state-hover"/>
        </component>
    </div>
</template>

<script>
export default {
	name: 'BaseCta',
	computed: {
		type() {
			if (this.to) {
				return 'router-link'
			}

			return 'button'
		}
	},

	props: {
		to: {
			required: false
		},
		value: {
			type: String
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