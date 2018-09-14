<!--
Page.vue
This component is used to render the Page content type on Storyblok
-->

<template>
  <div>
    <div
      v-editable="blok"
      class="page">
      <component
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
        :is="blok.component"/>
    </div>
    <doormat/>
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        default: function () {
          return {}
        }
      },
      pagetitle: {
        type: String,
        default: 'Design is Dead - Default page title'
      }
    },
  }
</script>
