<template>
  <div
    class="cmp-carousel__container">
    <img
      class="cmp-carousel__side-image"
      v-lazy="leftImage.filename"
      :alt="leftImage.name"
    />
    <img
      class="cmp-carousel__main-image"
      v-lazy="lazyImage(blok.images[currentImageCursor].filename)"
      :alt="blok.images[currentImageCursor].name"
    />
    <img
      class="cmp-carousel__side-image"
      v-lazy="rightImage.filename"
      :alt="rightImage.name"
    />
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
  data() {
    return {
      currentImageCursor: 1
    }
  },
  mounted() {
    console.log(this.leftImage)
    console.log(this.rightImage)
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
    getSideImages() {
      return {
        left: this.blok.images[this.currentImageCursor - 1],
        right: this.blok.images[this.currentImageCursor + 1]
      }
    }
  },
  computed: {
    rightImage() {
      return this.blok.images[this.currentImageCursor + 1]
    },
    leftImage() {
      return this.blok.images[this.currentImageCursor - 1]
    }
  }
}
</script>

<style>
.cmp-carousel__container {
  position: relative;
  display: flex; 
  justify-content: center;
  align-items: center;
  height: 350px;
}

.cmp-carousel__main-image {
  width: 60%;
}

.cmp-carousel__side-image {
  object-fit: cover;
  position: relative;
  width: 160px;
  height: 70%;
}

</style>