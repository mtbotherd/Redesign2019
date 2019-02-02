<template>
  <div id="app">
    <header>
      <b-navbar variant="light" type="light" toggleable="lg">
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
              <b-nav-item to="/">Link 1</b-nav-item>
              <b-nav-item-dropdown text="Trip Tools">
                <b-dropdown-item to="#">Link 2.1</b-dropdown-item>
                <b-dropdown-item to="#">Link 2.2</b-dropdown-item>
                <b-dropdown-item to="#">Link 2.3</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
          <b-nav-toggle target="mainNav"></b-nav-toggle>
        </div>
      </b-navbar>
    </header>
    <!-- <router-view/> -->
  </div>
</template>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
