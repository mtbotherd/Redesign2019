import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap - This imports bootstrap.js.  Refer to app.scss for bootstrap styles import.
import 'bootstrap'

// BootstrapVue - This import bootstrap-vue and styles.
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

// Icons
import IconSprite from '@/components/IconSprite' // Import component
Vue.component('IconSprite', IconSprite) // Globally Register component

// Automatic Global Registration of Components
// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'

// const requireComponent = require.context(
// 	'./components',
// 	false,
// 	/Base[A-Z]\w+\.(vue|js)$/
// )

// requireComponent.keys().forEach(fileName => {
// 	const componentConfig = requireComponent(fileName)

// 	const componentName = upperFirst(
// 		camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
// 	)

// 	Vue.component(componentName, componentConfig.default || componentConfig)
// })
// End Automatic Global Registration of Components

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
