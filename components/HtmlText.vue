<template>
  <div v-html="blok.html" />
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
  }
</script>
