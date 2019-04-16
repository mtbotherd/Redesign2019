<template>
    <div>
        <b-button variant="outline-primary" size="lg" class="cta-link-primary position-relative">
            <slot>CTA Link</slot>
        </b-button>
        <BaseIconSprite name="icon-sm-arrow-right-blue"/>
    </div>
</template>

<script>
export default {
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
.cta-link-primary {
	color: $body-color;
	border-width: 2px;

	// .icon-wrapper {
	// 	top: 0.75rem;
	// 	right: 0.5rem;

	// 	@include media-breakpoint-up(md) {
	// 		top: 1.25rem;
	// 		width: 20px;
	// 		height: 15px;
	// 	}
	// }
}
</style>