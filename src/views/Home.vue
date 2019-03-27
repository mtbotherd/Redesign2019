<template>
	<div id="home" class="hero-bg">
		<div class="container">
			<h1 class="sr-only">Metro Transit home page</h1>
			<ul class="nav nav-tabs nav-justified">
				<li class="nav-item mr-2">
					<a class="nav-link align-middle active" href="#">
						<BaseIcon name="users" />
						Trip Planner
					</a>
				</li>
				<li class="nav-item mr-2">
					<a class="nav-link align-middle" href="#">
						<BaseIcon name="airplay" />
						NexTrip
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link align-middle" href="#">
						<BaseIcon name="alert-triangle" />
						Alerts
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.hero-bg {
	background-color: #777;
}
.nav-tabs {
	.nav-link {
		position: relative;
		font-weight: 700;
		font-size: 1.5rem;
	}
}
</style>
