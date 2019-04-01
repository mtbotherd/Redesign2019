<template>
	<div id="home" class="hero-bg d-flex align-items-end">
		<div class="container">
			<h1 class="sr-only">Metro Transit home page</h1>
			<ul class="nav nav-tabs nav-justified d-flex align-items-end">
				<li class="nav-item active mr-2">
					<IconSprite
						name="icon-lg-directions-color"
						width="37"
						height="32"
					/>
					<a
						class="nav-link align-middle stretched-link active"
						href="#"
					>
						Trip Planner
					</a>
				</li>
				<li class="nav-item mr-2">
					<IconSprite
						name="icon-lg-clock-white"
						width="32"
						height="32"
					/>
					<a class="nav-link align-middle stretched-link" href="#">
						NexTrip
					</a>
				</li>
				<li class="nav-item">
					<IconSprite
						name="icon-lg-triangle-exclamation-white"
						width="32"
						height="32"
					/>
					<a class="nav-link align-middle stretched-link" href="#">
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
	background-image: url('../assets/img/lrt.png');
	background-position: top center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: 100% 50%;
	height: 86px;
}

.nav-tabs {
	.nav-item {
		background-color: #0097d0;
	}
	.nav-item.active {
		background-color: #ffffff;
	}
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
			// .icon-wrapper {
			// 	position: absolute;
			// 	top: 54px;
			// 	left: 30px;
			// 	width: 3rem;
			// 	height: 3rem;
			// }
		}
		.nav-link {
			position: relative;
			font-weight: 700;
			font-size: 1.5rem;
		}
	}
}
</style>
