<template>
    <footer class="section">
        <div class="container">
            <BaseLink href="contact-us">Contact us</BaseLink>

            <div class="footer d-none d-md-block pt-5">
                <b-card-group deck>
                    <b-card title="About Metro Transit" class="border-0">
                        <b-nav vertical>
                            <b-nav-item active>Mission &amp; Impact</b-nav-item>
                            <b-nav-item>Transit Initiatives</b-nav-item>
                            <b-nav-item>Facilities</b-nav-item>
                        </b-nav>
                    </b-card>
                    <b-card title="Media Relations" class="border-0">
                        <b-nav vertical>
                            <b-nav-item active>Contacts</b-nav-item>
                            <b-nav-item>Press Releases</b-nav-item>
                            <b-nav-item>Awards</b-nav-item>
                        </b-nav>
                    </b-card>
                    <b-card title="Careers" class="border-0">
                        <b-nav vertical>
                            <b-nav-item active>Available Job Opportunities</b-nav-item>
                            <b-nav-item>Become a Bus Driver</b-nav-item>
                            <b-nav-item>Join the Transit Police</b-nav-item>
                            <b-nav-item>Career Fairs</b-nav-item>
                        </b-nav>
                    </b-card>
                    <b-card title="Policies" class="border-0">
                        <b-nav vertical>
                            <b-nav-item active>Social Media Policy</b-nav-item>
                            <b-nav-item>Privacy Policy</b-nav-item>
                            <b-nav-item>Code of Conduct</b-nav-item>
                            <b-nav-item>Title VI: Commitment to Fairness</b-nav-item>
                        </b-nav>
                    </b-card>
                </b-card-group>
            </div>
            <p class="text-center pt-5">
                <small>
                    Metro Transit is a service of the Metropolitan Council.
                    <span
                        class="d-block d-md-none"
                    >
                        <br>
                    </span>&copy; 2019 Metro Transit
                </small>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
	name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
footer.section {
	background-color: $gray-100;

	.card-title {
		@include fontSize(16);
		font-weight: $font-weight-bold;
		margin-bottom: 0.25rem;
		text-transform: uppercase;
	}

	.card-body {
		padding: 0;
	}

	.nav-link {
		@include fontSize(16);
		font-weight: $font-weight-bold;
		text-decoration: none;
		padding: 0.25rem 0;
	}
}
</style>