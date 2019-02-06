<template>
	<div id="app">
		<header>
			<NavBar />
		</header>
		<div class="container">
			<router-view />
		</div>
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
<style lang="scss">
@import './assets/scss/app.scss';
</style>
