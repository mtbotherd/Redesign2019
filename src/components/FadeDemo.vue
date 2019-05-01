<template>
    <div>
        <p v-if="errors.length">
    		<b>Please correct the following error(s):</b>
    		<ul>
      			<li v-for="error in errors">{{ error }}</li>
    		</ul>
        </p>

        <p>
            <label for="name">Name</label>
            <input id="name" v-model="name" type="text" name="name">
        </p>

        <p>
            <label for="age">Age</label>
            <input id="age" v-model="age" type="number" name="age" min="0">
        </p>

        <p>
            <label for="movie">Favorite Movie</label>
            <select id="movie" v-model="movie" name="movie">
                <option>Star Wars</option>
                <option>Vanilla Sky</option>
                <option>Atomic Blonde</option>
            </select>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>
    </div>
</template>

<script>
export default {
	data: function() {
		return {
			errors: [],
			name: null,
			age: null,
			movie: null
		}
	},
	methods: {
		checkForm: function(e) {
			if (this.name && this.age) {
				return true
			}

			this.errors = []

			if (!this.name) {
				this.errors.push('Name required.')
			}
			if (!this.age) {
				this.errors.push('Age required.')
			}

			e.preventDefault()
		}
	}
}
</script>

<style lang="scss" scoped>
</style>