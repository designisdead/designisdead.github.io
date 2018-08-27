<!--
Post.vue
This component is used to render the Post content type on Storyblok
-->
<template>
  <main>
    <article>
      <header class="Wrapper u-textAlignCenter u-backgroundColor--light">
        <spacer size="medium"></spacer>
        <wrapper size="large">
          <h1>{{ pagetitle }}</h1>
          <h2 class="small">{{ blok.metadescription }}</h2>
        </wrapper>
        <spacer size="medium"></spacer>
      </header>

      <div v-editable="blok" class="page">
        <component :key="blok._uid" v-for="blok in blok.body" :blok="blok" :is="blok.component"></component>
      </div>

      <footer>
        <wrapper size="medium">
          <nuxt-link :to="'/blog'">View all posts</nuxt-link>
        </wrapper>
      </footer>
    </article>
  </main>
</template>

<script>
  import moment from 'moment';
  export default {
    props: {
      blok: Object,
      pagetitle: String
    }
  }
</script>

<style lang="scss">
  .Post-primaryImage {
    padding-bottom: $spacer;
  }
</style>
