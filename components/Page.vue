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
        v-for="b in blok.body"
        :key="b._uid"
        :blok="b"
        :is="b.component" />
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
