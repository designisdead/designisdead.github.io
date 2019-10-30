<template>
  <div
    class="cmp-carousel__container">
    <div class="cmp-carousel__side-image">
      <img
        id="cmp-carousel__left-side-image"
        @click="changeImage"
        :src="leftImage.url"
        :alt="leftImage.name"
      />
    </div>
    <div class="cmp-carousel__main-image">
      <img
        :src="mainImage.url"        
        :alt="mainImage.name"
      />
    </div>
    <div class="cmp-carousel__side-image">
      <img
        id="cmp-carousel__right-side-image"
        @click="changeImage"
        :src="rightImage.url"
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
      currentImageCursor: 2
    }
  },
  methods: {
    changeImage(e) {
      if (e.target.id === 'cmp-carousel__right-side-image') {
        this.currentImageCursor === this.blok.images.length - 1 ? this.currentImageCursor = 0 : this.currentImageCursor += 1
      } else {    // left side image
        this.currentImageCursor === 0 ? this.currentImageCursor = this.blok.images.length - 1 : this.currentImageCursor -= 1
      }
      
      console.log(this.currentImageCursor)
      console.log(this.leftImage.name, ': ', this.leftImage.url)
      console.log(this.rightImage.name, ': ', this.rightImage.url)
    }
  },
  computed: {
    mainImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : '';
      const image = this.blok.images[this.currentImageCursor];
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: '', filters: filters}),
        name: image.name
      }
    },
    rightImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : '';
      const image = this.currentImageCursor === this.blok.images.length - 1 ? this.blok.images[0] : this.blok.images[this.currentImageCursor + 1];
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: '', filters: filters}),
        name: image.name
      }
    },
    leftImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : '';
      const image = this.currentImageCursor === 0 ? this.blok.images[this.blok.images.length - 1] : this.blok.images[this.currentImageCursor - 1];
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: '', filters: filters}),
        name: image.name
      }
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
    object-fit: cover;
    max-height: 500px;
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