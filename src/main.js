//################################################
//  Core Vue Framework
//################################################
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

//  Include jQuerey
const $ = require('jquery')
window.$ = $
require('jquery-confirm')

//  Bootstrap - This imports bootstrap.js.  Refer to app.scss for bootstrap styles import.
import 'bootstrap'

// BootstrapVue - This imports bootstrap-vue.
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

//  JS Mixins
//  Change page title (mixin)
import TitleMixin from './assets/js/TitleMixin'
Vue.mixin(TitleMixin)

//################################################
//  Automatically Register Components Globally
//  Component names must start with "Base, App or V"
//################################################
const requireComponent = require.context(
	'./components',
	false,
	/Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
	const componentConfig = requireComponent(fileName)

	const componentName = upperFirst(
		camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
	)

	Vue.component(componentName, componentConfig.default || componentConfig)
})

//  Manually Register Components Globally
//  Find schedules by route component
import FindSchedulesByRoute from '@/components/FindSchedulesByRoute'
Vue.component('FindSchedulesByRoute', FindSchedulesByRoute)

//  Trip tools module
//  Trip tools tabs component
import TriptoolsTabs from '@/components/TriptoolsTabs'
Vue.component('TriptoolsTabs', TriptoolsTabs)

//  Trip Planner component
import TripPlanner from '@/components/TripPlanner'
Vue.component('TripPlanner', TripPlanner)

//  NexTrip component
import NexTrip from '@/components/NexTrip'
Vue.component('NexTrip', NexTrip)

//  Alerts component
import ServiceAlerts from '@/components/ServiceAlerts'
Vue.component('ServiceAlerts', ServiceAlerts)

//################################################
//  Custom scripts (jQuery)
//################################################
$(function() {
	// Trip Planner
	// Location switcher
	var inputs = $('.tp-from-location, .tp-to-location'),
		tmp
	$('.tp-location-toggler .icon-wrapper').click(function() {
		tmp = inputs[0].value
		inputs[0].value = inputs[1].value
		inputs[1].value = tmp
	})

	// Show time/date selectors
	$('#tpSelectTime').change(function() {
		if ($(this).val() != 'tp-leave-now') {
			$('.tp-time-elements')
				.fadeIn('slow')
				.css('display', 'flex')
		} else {
			$('.tp-time-elements').fadeOut('fast')
		}
	})
})

Vue.config.productionTip = false

//################################################
//  Vue instance - This MUST come last.
//################################################
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
