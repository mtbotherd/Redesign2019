import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap - This imports bootstrap.js.  Refer to app.scss for bootstrap styles import.
import 'bootstrap'

// Vue Nav Tabs (based on Bootstrap 4)
// To install run: npm install --save vue-nav-tabs
// import VueTabs from 'vue-nav-tabs'
// import 'vue-nav-tabs/themes/vue-tabs.css'
// Vue.use(VueTabs)

// Font Awesome
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
// import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add([faGlobeAmericas, faExclamationTriangle, faSearch])

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// End Font Awesome

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
