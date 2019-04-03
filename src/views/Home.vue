<template>
	<div id="home">
		<div class="hero-bg">
			<div class="container">
				<SearchSchedulesByRoute />
				<div class="row">
					<div class="col col-md-4 offset-md-4">
						<div class="cta-link-white text-center">
							<a href="#" class="btn btn-link stretched-link">
								View all Schedules &amp; Maps
							</a>
							<IconSprite
								name="icon-sm-right-arrow-white"
								width="20"
								height="15"
								class="align-middle"
							/>
						</div>
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
.cta-link-white a {
	color: white;
}

@media (min-width: 1200px) {
	.cta-link-white {
		.icon-wrapper {
			width: 20px;
			height: 15px;
		}
	}
}
</style>
