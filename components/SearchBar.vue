<template>
  <div>
    <h1>I'm the search bar</h1>
    <button @click="sendSearch">Hi, it's me</button>
    <form @submit="sendSearch">
      <input type="text" @keyup="sendSearch" v-model="searchInput">
      <div class="search-bar--tags-container">
        <!-- <span v-for=""> -->

        <!-- </span> -->
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      publicToken: 'O2r6aDSsF6m26lYt5NNMzQtt',
      tags: []
    }
  },
  methods: {
    sendSearch(e) {
      e.preventDefault()
      this.$emit('sendSearchInput', this.searchInput)
      console.log(this.searchInput)
    }
  },
  mounted() {
    this.$storyapi.get(`cdn/datasource_entries?datasource=tags&token=${this.publicToken}`)
    .then(res => {
      this.tags = res.data.datasource_entries.map(tag => tag.value)
      console.log(this.tags)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>

</style>
