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
					<BaseIconSprite
						name="icon-sm-right-arrow-white"
						class="flex-fill"
					/>
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
@import '../assets/scss/mixins.scss';
.hero-bg {
	background-color: #000000;
	background-image: url('../assets/img/lrt.png');
	background-position: top center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: 102% 70%;
	height: 9.5rem;

	@media (min-width: 768px) {
		background-size: 102% 90%;
		height: 15rem;
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
		@include fontSize(17);
		//font-size: 17px;
		font-weight: 700;
		margin-right: auto;
		text-decoration: none;

		@media (min-width: 768px) {
			@include fontSize(23);
			//font-size: 23px;
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

		// @media (min-width: 992px) {
		// 	width: 1rem;
		// 	height: 1rem;
		// 	padding: 0;
		// }

		// @media (min-width: 1200px) {
		// 	top: 0.25rem;
		// }
	}
}

#homeContent {
	position: relative;
	top: -4.93rem;

	@media (min-width: 768px) {
		top: -4.2rem;
	}

	@media (min-width: 1200px) {
		top: -5.12rem;
	}
}
</style>
