<template>
	<div id="home">
		<div class="hero-bg pt-3 pt-md-0">
			<div class="container">
				<SearchSchedulesByRoute />
				<div class="position-relative cta-link-white text-center">
					<router-link
						class="d-inline-flex nav-link stretched-link"
						:to="{ name: 'schedules-maps' }"
					>
						View all Schedules &amp; Maps
					</router-link>
					<IconSprite name="icon-sm-right-arrow-white" />
				</div>
			</div>
		</div>
		<div id="homeContent" class="container">
			<TriptoolsTabs />
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
	background-color: #000000;
	background-image: url('../assets/img/lrt.png');
	background-position: top center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: 102% 70%;
	height: 10.143rem;

	@media (min-width: 768px) {
		background-size: 102% 60%;
		height: 16.667rem;
	}
}

.cta-link-white {
	border: 1px solid #ffffff;

	.nav-link {
		font-weight: 700;
	}

	@media (min-width: 768px) {
		border: 0;
		display: block;
		font-size: 1.26rem;
	}

	a {
		color: white;
		text-decoration: none;

		@media (min-width: 768px) {
			text-decoration: underline;
		}
	}

	.icon-wrapper {
		//margin-left: auto;
		position: relative;
		top: 0.2rem;
		right: 0.5rem;

		@media (min-width: 768px) {
			margin-left: 0.5rem;
			width: 1.1112rem;
			height: 0.834rem;
			//top: 0.3rem;
		}
	}
}

#homeContent {
	position: relative;
	top: -75px;

	@media (min-width: 992px) {
		top: -54px;
	}

	@media (min-width: 1200px) {
		top: -53px;
	}
}
</style>
