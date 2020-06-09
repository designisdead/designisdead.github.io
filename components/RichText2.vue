<template>
  <div
    class="RichText2" 
    v-editable="blok">
    <div v-html="richtext"></div>
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object, default: function () {
          return {}
        }
      }
    },
    computed: {
      richtext() {
        return this.blok.text ? this.$storyapi.richTextResolver.render(this.blok.text) : ''
      }
    },
    mounted() {
      console.log(this.$storyapi.richTextResolver)
    },
  }
</script>

<style lang="scss">

</style>