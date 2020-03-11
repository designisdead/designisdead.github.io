<template>
  <div class="center">
    <card v-if="blok"
          :key="blok.full_slug"
          :post="blok"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        topBlogSlug: null,
        blok: {
          content: {}
        }
      }
    },
    created() {
      this.fetchTopBlog();
    },
    methods: {
      fetchTopBlog() {
        return this.$storyapi.get(`cdn/stories/_settings`, {
          version: this.$store.state.settings.version
        }).then((res) => {
          this.topBlogSlug = res.data.story.content.blog_page;
          return this.topBlogSlug;
        }).then((topBlogSlug) => {
          return this.$storyapi.get(`cdn/stories/` + topBlogSlug, {
            version: this.$store.state.settings.version
          });
        }).then((res) => {
          this.blok = res.data.story;
          return res.data.story;
        });
      }
    }
  };
</script>

<style>
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
