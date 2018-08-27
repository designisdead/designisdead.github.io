<template>
  <pre>
    {{ Posts }}
  </pre>
</template>

<script>
  export default {
    head () {
      return {
        title: 'Posts Listing'
      }
    },
    async fetch ({store}) {
      await store.dispatch('getPosts')
    },
    computed: {
      Posts () {
        return this.$store.state.posts
      }
    }
  }
</script>
