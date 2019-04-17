<template>
    <div id="app">
        <form>
            <HeaderSection/>
            <section id="mainContent">
                <router-view/>
            </section>
            <footerSection/>
        </form>
    </div>
</template>

<script>
// Import components into this view.
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'

export default {
	// Register imported components for use in this view.
	components: {
		HeaderSection,
		FooterSection
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
</style>
