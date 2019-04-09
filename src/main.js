import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Custom JS scripts
const $ = require('jquery')
window.$ = $
require('jquery-confirm')

//import './assets/js/scripts.js'

// Bootstrap - This imports bootstrap.js.  Refer to app.scss for bootstrap styles import.
import 'bootstrap'

// BootstrapVue - This imports bootstrap-vue.
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

// Change page title (mixin)
import TitleMixin from './assets/js/TitleMixing'
Vue.mixin(TitleMixin)

// Icons
import IconSprite from '@/components/IconSprite' // Import component
Vue.component('IconSprite', IconSprite) // Globally Register component

//  Search schedules by route
import SearchSchedulesByRoute from '@/components/SearchSchedulesByRoute'
Vue.component('SearchSchedulesByRoute', SearchSchedulesByRoute)

// Trip tools tabs
import TriptoolsTabs from '@/components/TriptoolsTabs'
Vue.component('TriptoolsTabs', TriptoolsTabs)

// Trip tools
// Trip Planner
import TripPlanner from '@/components/TripPlanner'
Vue.component('TripPlanner', TripPlanner)
// NexTrip
import NexTrip from '@/components/NexTrip'
Vue.component('NexTrip', NexTrip)
// Alerts
import Alerts from '@/components/Alerts'
Vue.component('Alerts', Alerts)

// JS
$(function() {
	var inputs = $('.tp-from-location, .tp-to-location'),
		tmp
	$('.icon-sm-switch-blue').click(function() {
		tmp = inputs[0].value
		inputs[0].value = inputs[1].value
		inputs[1].value = tmp
	})
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
