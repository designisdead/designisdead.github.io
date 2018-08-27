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
        </wrapper>
        <div class="Title tiny uppercase" v-if="blok.published">
          <small>Posted <time :datetime="dataTime">{{ fromNow }}</time> by <em><author v-if="blok.author" :id="blok.author"></author></em></small>
        </div>
        <spacer size="medium"></spacer>
      </header>

      <wrapper size="medium">
        <div class="Post-primaryImage">
          <img class="Image stretch"
               :alt="blok.title"
               :src="$options.filters.imageApi(blok.primaryimage, 'large')" />
        </div>
      </wrapper>

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
    },
    computed: {
      dataTime() {
        return moment(this.blok.published).format('YYYY-MM-DD HH:mm');
      },
      fromNow() {
        return moment(this.blok.published).fromNow();
      }
    }
  }
</script>

<style lang="scss">
  .Post-primaryImage {
    padding-bottom: $spacer;
  }
</style>
