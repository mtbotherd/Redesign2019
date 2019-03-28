<template>
	<div id="home" class="hero-bg d-flex align-items-end">
		<div class="container">
			<h1 class="sr-only">Metro Transit home page</h1>
			<ul class="nav nav-tabs nav-justified d-flex align-items-end">
				<li class="nav-item mr-2">
					<a class="nav-link align-middle active" href="#">
						Trip Planner
					</a>
				</li>
				<li class="nav-item mr-2">
					<a class="nav-link align-middle" href="#">NexTrip</a>
				</li>
				<li class="nav-item">
					<a class="nav-link align-middle" href="#">Alerts</a>
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
	background-image: url('../assets/img/lrt.png');
	background-position: top center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
	height: 300px;
}
.nav-tabs {
	.nav-link {
		position: relative;
		font-weight: 700;
		font-size: 1.5rem;
	}
}
</style>
