<template>
    <b-card no-body>
        <b-tabs>
            <b-tab title-item-class="trip-planner-tab mr-2" title-link-class="p-md-3" active>
                <template slot="title">
                    <BaseIconSprite
                        name="icon-lg-directions-color"
                        width="37"
                        height="32"
                        class="svg-active mx-auto"
                    />
                    <BaseIconSprite
                        name="icon-lg-directions-white"
                        width="37"
                        height="32"
                        class="svg-inactive mx-auto"
                    />Trip Planner
                </template>
                <div
                    class="tt-trip-planner tab-pane fade show active"
                    role="tabpanel"
                    aria-labelledby="trip-planner-tab"
                >
                    <TripPlanner/>
                </div>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
export default {
	name: 'TabsTest',
	props: ['tabLabel'],
	template: `
		<b-tab title-item-class="trip-planner-tab mr-2" title-link-class="p-md-3" active>
			<template slot="title">
				<BaseIconSprite
					name="icon-lg-directions-color"
					width="37"
					height="32"
					class="svg-active mx-auto"
				/>
				<BaseIconSprite
					name="icon-lg-directions-white"
					width="37"
					height="32"
					class="svg-inactive mx-auto"
				/>{{ tabLabel }}
			</template>
			<div
				class="tt-trip-planner tab-pane fade show active"
				role="tabpanel"
				aria-labelledby="trip-planner-tab"
			>
				<TripPlanner/>
			</div>
		</b-tab>
	`
}
</script>

<style lang="scss" scoped>
</style>