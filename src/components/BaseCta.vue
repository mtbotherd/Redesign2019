<template>
    <div>
        <b-button variant="outline-primary" size="lg" class="cta-link-primary position-relative">
            <slot>Button</slot>
            <BaseIconSprite name="icon-sm-arrow-right-blue" class="position-absolute"/>
        </b-button>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cta-link-primary {
	color: #626462;
	border-width: 2px;

	.icon-wrapper {
		top: 0.75rem;
		right: 0.5rem;

		@media (min-width: 768px) {
			top: 1.25rem;
			width: 20px;
			height: 15px;
		}
	}
}
</style>