<template>
    <header>
        <b-navbar toggleable="xl">
            <div class="container">
                <b-navbar-brand href="/">
                    <img
                        alt="metro transit logo"
                        src="/img/MetroTransitLogo.svg"
                        class="logo d-inline-block"
                    >
                </b-navbar-brand>
                <b-navbar-toggle target="navCollapse"></b-navbar-toggle>
                <b-collapse id="navCollapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2 pl-2 pl-md-0">Trip Tools</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="svg-inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="svg-active"/>
                            </template>
                            <b-dropdown-item href="imap/map.aspx">Trip Planner</b-dropdown-item>
                            <b-dropdown-item href="nextrip">NexTrip</b-dropdown-item>
                            <b-dropdown-item href="alerts">Alerts</b-dropdown-item>
                            <b-dropdown-item href="find-park-n-ride">Find a Park &amp; Ride</b-dropdown-item>
                            <b-dropdown-item href="stops-stations">Find a Stop or Station</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item href="schedules-maps" class="pl-2 pl-md-0">Schedules &amp; Maps</b-nav-item>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2 pl-2 pl-md-0">Fares</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="svg-inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="svg-active"/>
                            </template>
                            <b-dropdown-item href="fares">Fares</b-dropdown-item>
                            <b-dropdown-item href="go-to-card">Go-To Card</b-dropdown-item>
                            <b-dropdown-item href="passes">Pass Programs</b-dropdown-item>
                            <b-dropdown-item href="https://store.metrotransit.org/">Store</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2 pl-2 pl-md-0">More</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="svg-inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="svg-active"/>
                            </template>
                            <b-dropdown-item href="/">Carpool &amp; Vanpool</b-dropdown-item>
                            <b-dropdown-item href="transit-link">Transit Link</b-dropdown-item>
                            <b-dropdown-item href="guaranteed-ride-home">Guaranteed Ride Home</b-dropdown-item>
                            <b-dropdown-item href="bicycle">Bicycle</b-dropdown-item>
                            <b-dropdown-item href="news-room">News &amp; Events</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="dropdown-text mr-2 pl-2 pl-md-0">Help</span>
                                <BaseIconSprite name="icon-chevron-down-gray" class="svg-inactive"/>
                                <BaseIconSprite name="icon-chevron-down-white" class="svg-active"/>
                            </template>
                            <b-dropdown-item href="how-to-ride">How to Ride Guide</b-dropdown-item>
                            <b-dropdown-item href="contact-us">Contact Us</b-dropdown-item>
                            <b-dropdown-item href="lost-found">Lost &amp; Found</b-dropdown-item>
                            <b-dropdown-item href="accessibility">Accessibility</b-dropdown-item>
                            <b-dropdown-item href="languages">Languages</b-dropdown-item>
                            <b-dropdown-item href="police">Transit Police</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <span class="pl-2 pl-md-0">
                                    <BaseIconSprite name="icon-globe-gray"/>
                                    <span class="dropdown-text mr-2 ml-1">En</span>
                                    <BaseIconSprite
                                        name="icon-chevron-down-gray"
                                        class="svg-inactive"
                                    />
                                    <BaseIconSprite
                                        name="icon-chevron-down-white"
                                        class="svg-active"
                                    />
                                </span>
                            </template>
                            <b-dropdown-item href="how-to-ride">How to Ride Guide</b-dropdown-item>
                            <b-dropdown-item href="contact-us">Contact Us</b-dropdown-item>
                            <b-dropdown-item href="lost-found">Lost &amp; Found</b-dropdown-item>
                            <b-dropdown-item href="accessibility">Accessibility</b-dropdown-item>
                            <b-dropdown-item href="languages">Languages</b-dropdown-item>
                            <b-dropdown-item href="police">Transit Police</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                    <b-navbar-nav class="utilities">
                        <b-nav-item href="https://store.metrotransit.org/">
                            <div class="pl-2 pl-md-0">
                                <BaseIconSprite
                                    name="icon-shopping-cart-green"
                                    class="shopping-cart inactive"
                                />
                                <BaseIconSprite
                                    name="icon-shopping-cart-white"
                                    class="shopping-cart active"
                                />
                            </div>
                        </b-nav-item>
                        <b-nav-item href="/">
                            <div class="pl-2 pl-md-0">
                                <BaseIconSprite
                                    name="icon-magnifying-glass-gray"
                                    class="svg-inactive"
                                />
                                <BaseIconSprite
                                    name="icon-magnifying-glass-white"
                                    class="svg-active"
                                />
                            </div>
                        </b-nav-item>
                        <b-nav-item href="/">
                            <div class="pl-2 pl-md-0">
                                <BaseIconSprite name="icon-avatar-gray" class="svg-inactive"/>
                                <BaseIconSprite name="icon-avatar-white" class="svg-active"/>
                            </div>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </header>
</template>

<script>
//  Components with the prefix "Base" are already registered globally in main.js
export default {
	name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
// Refer to "src/assets/scss/_header.scss" for styles.
</style>
