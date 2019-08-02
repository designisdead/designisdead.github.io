<template>
  <div v-editable="blok">
    <h1>This is my super timeline</h1>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
}
</script>

<style>

</style>
