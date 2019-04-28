<template>
    <div class="row">
        <div class="col-6 col-md-3">
            <b-card
                title="Allianz Field"
                :img-src="require('../Data/sites/1/media/web-ads/allianz-field/06-28-71113-19_webad.png')"
                img-alt="Image"
                img-top
            >
                <div slot="footer">
                    <BaseCtaYellow to="/allianz-field" value="Learn more"/>
                </div>
            </b-card>
        </div>
        <div class="col-6 col-md-3">
            <b-card
                title="Bus Driver Hiring"
                :img-src="require('../Data/sites/1/media/web-ads/hiring/34499_homepage_ad.png')"
                img-alt="Image"
                img-top
            >
                <div slot="footer">
                    <BaseCtaYellow to="/allianz-field" value="Learn more"/>
                </div>
            </b-card>
        </div>
        <div class="col-6 col-md-3">
            <b-card
                title="Riders Club"
                :img-src="require('../Data/sites/1/media/web-ads/riders-club/60551-ridersclubad_300x270.png')"
                img-alt="Image"
                img-top
            >
                <div slot="footer">
                    <BaseCtaYellow to="/allianz-field" value="Learn more"/>
                </div>
            </b-card>
        </div>
        <div class="col-6 col-md-3">
            <b-card
                title="Rider Alerts"
                :img-src="require('../Data/sites/1/media/web-ads/placeholders/rideralert_ad.png')"
                img-alt="Image"
                img-top
            >
                <div slot="footer">
                    <BaseCtaYellow to="/allianz-field" value="Learn more"/>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.row:first-child .col-6 {
	padding-bottom: 1.5rem;

	@include media-breakpoint-up(md) {
		padding-bottom: 0;
	}
}

.card-deck {
	.card {
		// margin-right: 0;
		// margin-left: 0;
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