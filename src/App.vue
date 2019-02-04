<template>
  <div id="app">
    <header>
      <!-- <b-navbar type="light" toggleable="lg">
<div class="container">
<b-navbar-brand :to="{ name: 'home' }">
<img
src="./assets/img/MetroTransitLogo.svg"
width="225"
height="53"
class="img-fluid d-inline-block aling-top"
alt="Metro Transit T logo"
>
</b-navbar-brand>
<b-collapse is-nav id="mainNav">
<b-navbar-nav>
<b-nav-item-dropdown text="Trip Tools">
<b-dropdown-item :to="{ name: 'trip-planner' }">Trip Planner</b-dropdown-item>
<b-dropdown-item :to="{ name: 'nextrip' }">NexTrip</b-dropdown-item>
<b-dropdown-item :to="{ name: 'find-stops' }">Find Stops</b-dropdown-item>
<b-dropdown-item :to="{ name: 'alerts' }">Alerts</b-dropdown-item>
</b-nav-item-dropdown>
<b-nav-item :to="{ name: 'maps-schedules' }">Maps &amp; Schedules</b-nav-item>
<b-nav-item-dropdown text="Fares">
<b-dropdown-item :to="{ name: 'ride-costs' }">Ride Costs</b-dropdown-item>
<b-dropdown-item :to="{ name: 'goto-card' }">Go-To Card</b-dropdown-item>
<b-nav-item-dropdown text="Discount Passes">
<b-dropdown-item :to="{ name: 'tap' }">Transit Assistance Program</b-dropdown-item>
</b-nav-item-dropdown>
</b-nav-item-dropdown>
<b-nav-toggle target="mainNav"></b-nav-toggle>
</b-navbar-nav>
</b-collapse>
</div>
      </b-navbar>-->
      <NavBar/>
    </header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  // register component for use in this view.
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
