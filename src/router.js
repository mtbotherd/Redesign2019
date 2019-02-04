import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import TripPlanner from "./views/TripPlanner.vue";
import NexTrip from "./views/NexTrip.vue";
import FindStops from "./views/FindStops.vue";
import Alerts from "./views/Alerts.vue";
import MapsSchedules from "./views/MapsSchedules.vue";
import RideCosts from "./views/RideCosts.vue";
import GoToCard from "./views/GoToCard.vue";
import TransitAssistanceProgram from "./views/TransitAssistanceProgram.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/trip-planner",
      name: "trip-planner",
      component: TripPlanner
    },
    {
      path: "/nextrip",
      name: "nextrip",
      component: NexTrip
    },
    {
      path: "/find-stops",
      name: "find-stops",
      component: FindStops
    },
    {
      path: "/alerts",
      name: "alerts",
      component: Alerts
    },
    {
      path: "/maps-schedules",
      name: "maps-schedules",
      component: MapsSchedules
    },
    {
      path: "/ride-costs",
      name: "ride-costs",
      component: RideCosts
    },
    {
      path: "/goto-card",
      name: "goto-card",
      component: GoToCard
    },
    {
      path: "/transit-assistance-program",
      name: "tap",
      component: TransitAssistanceProgram,
      alias: ["/tap", "/pta"] // Creates an alias for the path.
    }
  ]
});
