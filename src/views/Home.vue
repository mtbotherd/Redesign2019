<template>
	<div id="home">
		<div class="hero-bg">
			<div class="container">
				<SearchSchedulesByRoute />
				<div class="pt-3 pt-md-0">
					<div class="cta-link-white text-center">
						<a href="#" class="btn btn-link stretched-link">
							View all Schedules &amp; Maps
						</a>
						<IconSprite name="icon-sm-right-arrow-white" />
					</div>
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
	display: flex;

	@media (min-width: 768px) {
		border: 0;
		display: block;
	}

	a {
		color: white;
		text-decoration: none;

		@media (min-width: 768px) {
			text-decoration: underline;
		}
	}

	.icon-wrapper {
		margin-left: auto;
		position: relative;
		top: 0.8rem;
		right: 0.5rem;

		@media (min-width: 768px) {
			margin-left: 0.5rem;
			top: 0.3rem;
		}
	}
}

#homeContent {
	position: relative;
	top: -75px;

	@media (min-width: 1200px) {
		top: -53px;
	}
}
</style>
