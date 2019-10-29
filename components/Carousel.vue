<template>
  <div
    class="cmp-carousel__container">
    <div class="cmp-carousel__side-image">
      <img
        id="cmp-carousel__left-side-image"
        @click="changeImage"
        v-lazy="leftImage.filename"
        :alt="leftImage.name"
      />
    </div>
    <div class="cmp-carousel__main-image">
      <img
        v-lazy="lazyImage(blok.images[currentImageCursor].filename)"
        :alt="blok.images[currentImageCursor].name"
      />
    </div>
    <div class="cmp-carousel__side-image">
      <img
        id="cmp-carousel__right-side-image"
        @click="changeImage"
        v-lazy="rightImage.filename"
        :alt="rightImage.name"
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
  data() {
    return {
      currentImageCursor: 0
    }
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
    changeImage(e) {
      console.log(e.target.id)
      if (e.target.id === 'cmp-carousel__right-side-image') {
        this.currentImageCursor === this.blok.images[this.blok.images.length - 1] ? this.currentImageCursor = 0 : this.currentImageCursor += 1
      } else {
        this.currentImageCursor === 0 ? this.currentImageCursor = this.blok.images.length - 1 : this.currentImageCursor -= 1
      }
      
      console.log(this.currentImageCursor)
      console.log(this.leftImage)
      console.log(this.rightImage)
    }
  },
  computed: {
    rightImage() {
      return this.currentImageCursor === this.blok.images.length - 1 ? this.blok.images[0] : this.blok.images[this.currentImageCursor + 1]
    },
    leftImage() {
      return this.currentImageCursor === 0 ? this.blok.images[this.blok.images.length - 1] : this.blok.images[this.currentImageCursor - 1]
    }
  }
}
</script>

<style lang="scss">
.cmp-carousel__container {
  position: relative;
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
}

.cmp-carousel__main-image {
  flex: 4;

  img {
    width: 100%;
  }
}

.cmp-carousel__side-image {
  height: 70%;
  flex: 1;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: brightness(50%)
  }
}

</style>