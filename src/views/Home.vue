<template>
    <div id="home">
        <div class="hero-bg pt-3 pt-lg-0">
            <div class="container">
                <FindSchedulesByRoute class="d-none d-md-block"/>
                <div class="cta-link-white mt-md-2">
                    <router-link
                        class="d-inline-flex nav-link stretched-link"
                        :to="{ name: 'schedules-maps' }"
                    >View all Schedules &amp; Maps</router-link>
                    <BaseIconSprite name="icon-sm-right-arrow-white" class="flex-fill"/>
                </div>
            </div>
        </div>
        <div id="homeContent">
            <div class="container">
                <TriptoolsTabs/>
            </div>
            <hr>
            <div class="container">
                <BaseCta class="text-center mt-md-3">
                    <router-link
                        class="stretched-link"
                        :to="{ name: 'how-to-ride-guide' }"
                    >How to Ride</router-link>
                </BaseCta>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	title: 'Metro Transit | Home'
}
</script>

<style lang="scss" scoped>
.hero-bg {
	background-color: $black;
	background-image: url('../assets/img/lrt.png');
	background-position: top center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: 102% 70%;
	height: 10rem;

	@include media-breakpoint-up(md) {
		background-size: 102% 90%;
		height: 15rem;
	}
	@include media-breakpoint-up(lg) {
		height: 16rem;
	}
	@include media-breakpoint-up(xl) {
		background-size: contain;
		height: 17rem;
	}
}

.cta-link-white {
	position: relative;
	border: 1px solid #ffffff;

	.nav-link {
		color: white;
		@include fontSize(17);
		font-weight: 700;
		margin-right: auto;
		text-decoration: none;

		@include media-breakpoint-up(md) {
			@include fontSize(23);
			margin-right: 0;
			text-decoration: underline;
		}
	}

	@include media-breakpoint-up(md) {
		border: 0;
		display: block;
		text-align: center;
	}

	.icon-wrapper {
		position: absolute;
		top: 0.7rem;
		right: 0.75rem;

		@include media-breakpoint-up(md) {
			position: relative;
			top: 0.25rem;
			left: 0;
		}
	}
}

#homeContent {
	position: relative;
	top: -4.93rem;

	@include media-breakpoint-up(md) {
		top: -4.2rem;
	}

	@include media-breakpoint-up(xl) {
		top: -5.12rem;
	}
}
</style>
