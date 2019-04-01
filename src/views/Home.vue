<template>
	<div id="home" class="hero-bg d-flex align-items-end">
		<div class="container">
			<h1 class="sr-only">Metro Transit home page</h1>
			<ul class="nav nav-tabs nav-justified d-flex align-items-end">
				<li class="nav-item mr-2">
					<IconSprite
						name="icon-sm-circle-location-pin-color"
						width="32"
						height="32"
					/>
					<a
						class="nav-link stretched-link align-middle active"
						href="#"
					>
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
	background-size: 100% 50%;
	height: 86px;
}
@media (min-width: 1200px) {
	.hero-bg {
		background-image: url('../assets/img/lrt.png');
		background-position: top center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: contain;
		height: 300px;
	}
	.nav-tabs {
		.nav-item {
			position: relative;
			.icon-wrapper {
				position: absolute;
				top: 54px;
				left: 30px;
				width: 3rem;
				height: 3rem;
			}
		}
		.nav-link {
			position: relative;
			font-weight: 700;
			font-size: 1.5rem;

			// .trip-planner {
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;
			// 	width: 3.3rem;
			// 	height: 3.3rem;
			// }
			// .nextrip {
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;
			// 	width: 32px;
			// 	height: 32px;
			// }
		}
	}
}
</style>
