<template>
	<div id="tripToolsTabs">
		<b-card no-body>
			<b-tabs>
				<b-tab
					title-item-class="trip-planner-tab mr-2"
					title-link-class="p-md-3"
					active
				>
					<template slot="title">
						<IconSprite
							name="icon-lg-directions-color"
							width="37"
							height="32"
							class="svg-active mx-auto"
						/>
						<IconSprite
							name="icon-lg-directions-white"
							width="37"
							height="32"
							class="svg-inactive mx-auto"
						/>
						Trip Planner
					</template>
					<TripPlanner />
				</b-tab>
				<b-tab title-item-class="mr-2" title-link-class="p-md-3">
					<template slot="title">
						<IconSprite
							name="icon-lg-clock-color"
							width="32"
							height="32"
							class="svg-active d-block d-md-inline-block ml-auto mr-auto"
						/>
						<IconSprite
							name="icon-lg-clock-white"
							width="32"
							height="32"
							class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
						/>
						NexTrip
					</template>
					<NexTrip />
				</b-tab>
				<b-tab title-link-class="p-md-3">
					<template slot="title">
						<IconSprite
							name="icon-lg-triangle-exclamation-color"
							width="37"
							height="32"
							class="svg-active d-block d-md-inline-block ml-auto mr-auto"
						/>
						<IconSprite
							name="icon-lg-triangle-exclamation-white"
							width="37"
							height="32"
							class="svg-inactive d-block d-md-inline-block ml-auto mr-auto"
						/>
						Alerts
					</template>
					<Alerts />
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
