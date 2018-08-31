<!--
Page.vue
This component is used to render the Page content type on Storyblok
-->

<template>
  <div>
    <div v-editable="blok" class="page">
      <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
    </div>
    <doormat />
  </div>
</template>

<script>
  export default {
    props: {
      blok: Object,
      pagetitle: String
    },
  }
</script>
