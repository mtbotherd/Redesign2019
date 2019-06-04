<template>
    <div class="row">
        <div class="col-6 col-md-3">
            <b-card
                title="Web Ad"
                :img-src="require('../../public/img/placeholder-300x300.png')"
                img-alt="CMS image"
                img-top
            >
                <div slot="footer">
                    <BaseCta to="/">Learn more</BaseCta>
                </div>
            </b-card>
        </div>
        <div class="col-6 col-md-3">
            <b-card
                title="Web Ad"
                :img-src="require('../../public/img/placeholder-300x300.png')"
                img-alt="CMS image"
                img-top
            >
                <div slot="footer">
                    <BaseCta to="/">Learn more</BaseCta>
                </div>
            </b-card>
        </div>
        <div class="col-6 col-md-3">
            <b-card
                title="Web Ad"
                :img-src="require('../../public/img/placeholder-300x300.png')"
                img-alt="CMS image"
                img-top
            >
                <div slot="footer">
                    <BaseCta to="/">Learn more</BaseCta>
                </div>
            </b-card>
        </div>
        <div class="col-6 col-md-3">
            <b-card
                title="Web Ad"
                :img-src="require('../../public/img/placeholder-300x300.png')"
                img-alt="CMS image"
                img-top
            >
                <div slot="footer">
                    <BaseCta to="/">Learn more</BaseCta>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
	name: 'WebAds'
}
</script>

<style lang="scss" scoped>
.row:first-child .col-6 {
	padding-bottom: 1.5rem;

	@include media-breakpoint-up(md) {
		padding-bottom: 0;
	}
}

.card-body,
.card-footer {
	text-align: center;
	padding: 0.75rem;
}
.card-footer {
	background-color: transparent;
	border-top: 0;
}

.icon-wrapper {
	top: 0.5rem;
	width: 0.5rem;

	@include media-breakpoint-up(md) {
		right: 0.75rem;
	}
}
</style>