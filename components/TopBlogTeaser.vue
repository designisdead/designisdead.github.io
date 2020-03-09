<template>
  <div class="center">
    <component
          :key="blok.full_slug"
          :post="blok"
          :is="card"/>
    <div v-if="topBlogSlug" class="content">
      <h2>{{ topBlogSlug }}</h2>
      <p>author: {{ blok.content.author }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      topBlogSlug: {
        type: String,
        default: function () {
          return "";
        }
      },
      blok: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    mounted() {
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
