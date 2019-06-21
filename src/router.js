import Vue from 'vue'
import Router from 'vue-router'

// Imports views for Main Navigation links.
import HomeView from './views/HomeView.vue'
import TripPlanner from './views/TripPlanner.vue'
import TripPlan from './views/TripPlan.vue'
import NexTrip from './views/NexTrip.vue'
import FindStops from './views/FindStops.vue'
import SchedulesMaps from './views/SchedulesMaps.vue'
import RideCosts from './views/RideCosts.vue'
import GoToCard from './views/GoToCard.vue'
import DiscountPrograms from './views/DiscountPrograms.vue'
import ContactUs from './views/ContactUs.vue'
import TransitPolice from './views/TransitPolice.vue'
import HowToRideGuide from './views/HowToRideGuide.vue'

// Imports views for Footer Navigation links.

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/trip-planner',
			name: 'trip-planner',
			component: TripPlanner
		},
		{
			path: '/trip-plan',
			name: 'trip-plan',
			component: TripPlan
		},
		{
			path: '/nextrip',
			name: 'nextrip',
			component: NexTrip
		},
		{
			path: '/find-stops',
			name: 'find-stops',
			component: FindStops
		},
		{
			path: '/schedules-maps',
			name: 'schedules-maps',
			component: SchedulesMaps
		},
		{
			path: '/ride-costs',
			name: 'ride-costs',
			component: RideCosts
		},
		{
			path: '/goto-card',
			name: 'goto-card',
			component: GoToCard
		},
		{
			path: '/discount-programs',
			name: 'discount-programs',
			component: DiscountPrograms
		},
		{
			path: '/contact-us',
			name: 'contact-us',
			component: ContactUs
		},
		{
			path: '/transit-police',
			name: 'transit-police',
			component: TransitPolice
		},
		{
			path: '/how-to-ride-guide',
			name: 'how-to-ride-guide',
			component: HowToRideGuide
		}
		//  Footer navigation routes
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})
