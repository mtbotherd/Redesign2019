<template>
	<div id="home">
		<div class="hero-bg pt-3 pt-md-0">
			<div class="container">
				<SearchSchedulesByRoute />
				<div class="cta-link-white">
					<router-link
						class="d-inline-flex nav-link stretched-link"
						:to="{ name: 'schedules-maps' }"
					>
						View all Schedules &amp; Maps
					</router-link>
					<IconSprite
						name="icon-sm-right-arrow-white"
						class="flex-fill"
					/>
					<!-- <router-link
								class="d-inline-flex nav-link mr-auto mr-md-0 stretched-link"
								:to="{ name: 'schedules-maps' }"
							>
								View all Schedules &amp; Maps
              </router-link>
          <IconSprite name="icon-sm-right-arrow-white" />-->
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
	height: 10rem;

	@media (min-width: 768px) {
		background-size: 102% 90%;
		height: 14rem;
	}
	@media (min-width: 992px) {
		height: 16rem;
	}
	@media (min-width: 1200px) {
		height: 17rem;
	}
}

.cta-link-white {
	position: relative;
	border: 1px solid #ffffff;

	.nav-link {
		color: white;
		font-weight: 700;
		margin-right: auto;
		text-decoration: none;

		@media (min-width: 768px) {
			margin-right: 0;
			text-decoration: underline;
		}
	}

	@media (min-width: 768px) {
		border: 0;
		display: block;
		text-align: center;
	}

	.icon-wrapper {
		position: absolute;
		top: 0.7rem;
		right: 0.75rem;

		@media (min-width: 768px) {
			position: relative;
			top: 0.25rem;
			left: 0;
		}

		@media (min-width: 992px) {
			width: 1rem;
			height: 1rem;
			padding: 0;
		}

		@media (min-width: 1200px) {
			top: 0.25rem;
		}
	}
}

#homeContent {
	position: relative;
	top: -5.53rem;

	@media (min-width: 768px) {
		top: -3.62rem;
	}

	@media (min-width: 992px) {
		top: -4.32rem;
	}

	@media (min-width: 1200px) {
		top: -4.33rem;
	}
}
</style>
