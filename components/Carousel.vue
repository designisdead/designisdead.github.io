<template>
  <div>
    <h1>This is my carousel component</h1>

    <div
    style="display: flex; flex-wrap: wrap">
      <img
        v-for="image in blok.images"
        :key="image.name"
        v-lazy="lazyImage(image.filename)"
        :alt="image.name"
        width="50%"
      />
    </div>
  </div>
</template>

<script>
import supportsWebP from 'supports-webp';

export default {
  props: {
    blok: {
      type: Object, default: function () {
        return {}
      }
    }
  },
  mounted() {
    console.log(this.blok.images)
  },
  methods: {
    lazyImage(filename) {
      /*
        * If webp is supported by the client, serve a large webp image
        * https://www.storyblok.com/docs/image-service
        */
      const filters = supportsWebP ? '/filters:format(webp)' : '';
      return this.$options.filters.imageApi({src: filename, size: '', filters: filters});
    },
  }
}
</script>

<style>

</style>