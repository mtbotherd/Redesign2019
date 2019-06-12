<template>
    <div id="app">
        <TheHeader/>
        <section id="mainContent">
            <!-- <Home/> -->
            <router-view/>
        </section>
        <TheFooter/>
    </div>
</template>

<script>
// Import components into this view.
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'

export default {
	name: 'app',
	components: {
		TheHeader,
		TheFooter
	}
}
</script>
<style>
/*	Imports Proxima-nova font from typekit  */
@import 'https://use.typekit.net/tev0qmq.css';
</style>
<style lang="scss">
// Imports all styles used in the application
@import './assets/scss/app.scss';

// @include media-breakpoint-up(md) {
// 	.container {
// 		padding-right: 0 !important;
// 		padding-left: 0 !important;
// 	}
// }
</style>
