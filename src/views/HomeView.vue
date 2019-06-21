<template>
    <div id="home">
        <div class="hero-bg pt-3 pt-md-0 pt-lg-3">
            <div class="container">
                <FindSchedulesByRoute class="d-none d-md-block"/>
                <div class="cta-link-white mt-md-2 mt-xl-4">
                    <b-link
                        class="d-inline-flex nav-link"
                        href="schedules-maps"
                    >View all Schedules &amp; Maps</b-link>
                    <BaseIconSprite name="icon-arrow-right-white" class="flex-fill"/>
                </div>
            </div>
        </div>
        <div id="homeContent">
            <main class="section pt-0 pb-4 pb-md-5">
                <div class="container">
                    <TriptoolsTabs/>
                </div>
            </main>
            <section class="section">
                <div class="container">
                    <HowToRide/>
                </div>
            </section>
            <section class="section">
                <div class="container">
                    <NewsEvents/>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import FindSchedulesByRoute from '../components/FindSchedulesByRoute'
import TriptoolsTabs from '../components/TriptoolsTabs'
import HowToRide from '../components/HowToRide'
import NewsEvents from '../components/NewsEvents'

export default {
	name: 'HomeView',
	components: {
		FindSchedulesByRoute,
		TriptoolsTabs,
		HowToRide,
		NewsEvents
	},
	title: 'Metro Transit | Home'
}
</script>

<style lang="scss" scoped>
.hero-bg {
	background-image: url('/img/mt-header-lrt-2000x457.jpg');
	background-size: cover;
	background-position: 90%;
	background-repeat: no-repeat;
	height: 10rem;

	@include media-breakpoint-up(md) {
		height: 15rem;
	}
	@include media-breakpoint-up(lg) {
		height: 17rem;
	}
	@include media-breakpoint-up(xl) {
		height: 20rem;
		//height: 17rem;
	}
}

.cta-link-white {
	position: relative;
	border: 2px solid #ffffff;

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
	top: -4.62rem;
	margin-bottom: -4.62rem;

	@include media-breakpoint-up(md) {
		top: -4.2rem;
	}

	@include media-breakpoint-up(xl) {
		top: -5.12rem;
	}
}
</style>
