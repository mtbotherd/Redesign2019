<template>
	<div id="app">
		<header>
			<NavBar />
		</header>
		<section>
			<router-view />
		</section>
		<footer></footer>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
	// register component for use in this view.
	components: {
		NavBar
	}
}
</script>
<style>
@import 'https://use.typekit.net/tev0qmq.css';
</style>
<style lang="scss">
@import './assets/scss/app.scss';
</style>
