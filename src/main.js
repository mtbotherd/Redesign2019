//################################################
//  Core Vue Framework
//################################################
import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import VueFloatLabel from 'vue-float-label'

Vue.use(VueFloatLabel)

//  Include jQuerey
const $ = require('jquery')
window.$ = $
require('jquery-confirm')

//  Bootstrap - This imports bootstrap.js.  Refer to app.scss for bootstrap styles import.
import 'bootstrap'

//  Vue Float Labels plugin for form elements
// import FloatingLabel from 'vue-simple-floating-labels'
// Vue.use(FloatingLabel)

// BootstrapVue - This imports bootstrap-vue.
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

//  JS Mixins
//  Change page title (mixin)
import TitleMixin from './assets/js/TitleMixin'
Vue.mixin(TitleMixin)

//##########################################################
//  Automatically Register Components Globally
//  Component names must start with "Base, App or V"
//  Component names must be either PascalCase or kebab-case.
//##########################################################
const requireComponent = require.context(
	'./components/base',
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

//################################################
//  Custom scripts (jQuery)
//################################################
$(function() {
	// Trip Planner
	// Location switcher
	var inputs = $('.from-location, .to-location'),
		tmp
	$('.location-toggler .icon-wrapper').click(function() {
		tmp = inputs[0].value
		inputs[0].value = inputs[1].value
		inputs[1].value = tmp
	})
})

Vue.config.productionTip = false

//################################################
//  Vue instance - This MUST come last.
//################################################
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
