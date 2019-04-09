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
							class="svg-active d-block d-md-inline-block mx-auto"
						/>
						<IconSprite
							name="icon-lg-directions-white"
							width="37"
							height="32"
							class="svg-inactive d-block d-md-inline-block mx-auto"
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
// import JQuery from 'jquery'
// let $ = JQuery

// $('.nav-tabs li').click(function() {
// 	$(this).toggleClass('strike')
// 	var icon = 'icon-'
// 	icon += !$(this).hasClass('strike')
// 		? 'icon-lg-directions-white'
// 		: 'icon-lg-directions-color'

// 	$('svg', this).attr('class', icon)
// 	$('svg use', this).attr('xlink:href', '#' + icon)
// })

export default {}
</script>

<style lang="scss" scoped></style>

<!-- 
// Normal Bootstrap markup. 
    <ul
			id="tripTools"
			role="tablist"
			class="nav nav-tabs nav-justified d-flex align-items-end"
		>
			<li class="nav-item mr-2 active">
				<IconSprite
					name="icon-lg-directions-color"
					width="37"
					height="32"
				/>
				<IconSprite
					name="icon-lg-directions-white"
					width="37"
					height="32"
				/>
				<a
					id="trip-planner-tab"
					class="nav-link align-middle pt-0 pt-lg-2 stretched-link active"
					data-toggle="tab"
					href="#trip-planner"
					role="tab"
					aria-controls="trip-planner"
					aria-selected="true"
				>
					Trip Planner
				</a>
			</li>
			<li class="nav-item mr-2">
				<IconSprite name="icon-lg-clock-white" width="32" height="32" />
				<a
					id="nextrip-tab"
					class="nav-link align-middle pt-0 pt-lg-2 stretched-link"
					data-toggle="tab"
					href="#nextrip"
					role="tab"
					aria-controls="nextrip"
					aria-selected="false"
				>
					NexTrip
				</a>
			</li>
			<li class="nav-item">
				<IconSprite
					name="icon-lg-triangle-exclamation-white"
					width="34"
					height="32"
				/>
				<a
					id="alerts-tab"
					class="nav-link align-middl pt-0 pt-lg-2 stretched-link"
					data-toggle="tab"
					href="#alerts"
					role="tab"
					aria-controls="alerts"
					aria-selected="false"    
				>
					Alerts
				</a>
			</li>
    </ul>-->
