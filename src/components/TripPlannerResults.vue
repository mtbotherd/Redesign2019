<template>
    <div id="tripPlannerResults" class="tt-trip-planner-results">
        <h2>Suggested trips</h2>
        <p class="mb-0">
            <strong>Start:&nbsp;</strong>225 Farrington
            <abbr title="street">St.</abbr>,
            <abbr title="Saint Paul">St.</abbr> Paul, MN 55102
        </p>
        <p>
            <strong>End:&nbsp;</strong>560 6th
            <abbr title="avenue">Ave.</abbr> N, Minneapolis, MN 55411
        </p>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.tt-trip-planner-results {
	p {
		@include fontSize(16);
	}
}
</style>