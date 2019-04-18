<template>
    <b-card-group deck>
        <b-card
            title="Title"
            :img-src="require('../Data/sites/1/media/web-ads/allianz-field/06-28-71113-19_webad.png')"
            img-alt="Image"
            img-top
        >
            <b-card-text>
                This is a wider card with supporting text below as a natural lead-in to additional content.
                This content is a little bit longer.
            </b-card-text>
            <div slot="footer">
                <BaseCtaYellow to="/allianz-field" value="Learn more"/>
            </div>
        </b-card>
        <b-card
            title="Title"
            :img-src="require('../Data/sites/1/media/web-ads/hiring/34499_homepage_ad.png')"
            img-alt="Image"
            img-top
        >
            <b-card-text>This card has supporting text below as a natural lead-in to additional content.</b-card-text>
            <div slot="footer">
                <BaseCtaYellow to="/allianz-field" value="Learn more"/>
            </div>
        </b-card>
        <b-card
            title="Title"
            :img-src="require('../Data/sites/1/media/web-ads/riders-club/60551-ridersclubad_300x270.png')"
            img-alt="Image"
            img-top
        >
            <b-card-text>
                This is a wider card with supporting text below as a natural lead-in to additional content.
                This card has even longer content than the first to show that equal height action.
            </b-card-text>
            <div slot="footer">
                <BaseCtaYellow to="/allianz-field" value="Learn more"/>
            </div>
        </b-card>
        <b-card
            title="Title"
            :img-src="require('../Data/sites/1/media/web-ads/placeholders/rideralert_ad.png')"
            img-alt="Image"
            img-top
        >
            <b-card-text>
                This is a wider card with supporting text below as a natural lead-in to additional content.
                This card has even longer content than the first to show that equal height action.
            </b-card-text>
            <div slot="footer">
                <BaseCtaYellow to="/allianz-field" value="Learn more"/>
            </div>
        </b-card>
    </b-card-group>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.card-deck {
	.card-footer {
		background-color: transparent;
		border-top: 0;
	}
}
</style>