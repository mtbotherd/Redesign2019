<template>
    <div class="form-group">
        <label for="input">{{ label }}</label>
        <input
            type="text"
            id="input"
            name="input"
            class="form-control"
            @input="$emit('input', $event.target.value)"
        >
    </div>
</template>

<script>
export default {
	name: 'BaseInput',
	props: {
		label: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		attrs: {
			type: Object,
			default: function() {
				return {}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
</style>