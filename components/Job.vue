<!--
Post.vue
This component is used to render the Post content type on Storyblok
-->
<template>
  <main>
    <article>
      <header class="Wrapper halfscreen u-textAlignCenter u-backgroundColor--black u-color--light">
        <wrapper size="large">
          <h1>{{ pagetitle }}</h1>
          <h2 class="small">{{ blok.metadescription }}</h2>
        </wrapper>
      </header>

      <spacer size="huge" />

      <div
        v-editable="blok"
        class="page">
        <component
          v-for="blok in blok.body"
          :key="blok._uid"
          :blok="blok"
          :is="blok.component"/>
      </div>

      <footer>
        <spacer size="medium" />
        <wrapper size="medium">
          <nuxt-link :to="'/jobs'">View all jobs</nuxt-link>
        </wrapper>
      </footer>

      <spacer size="small"/>
      
      <doormat/>
    </article>
  </main>
</template>

<script>
import moment from "moment";
export default {
  props: {
    blok: {
      type: Object,
      default: function() {
        return {};
      }
    },
    pagetitle: {
      type: String,
      default: "Design is Dead Jobs"
    }
  }
};
</script>

<style lang="scss">
.Post-primaryImage {
  padding-bottom: $spacer;
}
</style>
