<template>
  <div
    class="cmp-carousel">
    <div class="cmp-carousel__container">
      <div 
      class="cmp-carousel__side-image"
      @click="changeImage">
      <img
        id="cmp-carousel__left-side-image"
        :src="leftImage.url"
        :alt="leftImage.name">
       <img 
        src="/chevron.svg" 
        alt="left chevron" 
        class="cmp-carousel__chevron"
        style="left: 10px; transform: rotate(180deg)">
      </div>
      <div class="cmp-carousel__main-image">
        <expendableImage 
          :currentImageCursor="currentImageCursor" 
          :imagesProperties="blok.images" 
          @changeImage="changeImageFromExpendable" 
          @selectThumbnailImage="selectThumbnailImage" />
      </div>
      <div 
        class="cmp-carousel__side-image"
        @click="changeImage">
        <img
          id="cmp-carousel__right-side-image"
          :src="rightImage.url"
          :alt="rightImage.name">
        <img 
          src="/chevron.svg" 
          alt="right chevron" 
          class="cmp-carousel__chevron"
          style="right: 10px">
      </div>
    </div>
    <p class="cmp-carousel__image-number">{{ currentImageCursor + 1 }} / {{ this.blok.images.length }}</p>
  </div>
</template>

<script>
import supportsWebP from 'supports-webp'

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
      currentImageCursor: 3
    }
  },
  methods: {
    changeImageFromExpendable(direction) {
      let event = null
      this.changeImage(event, direction)
    },
    changeImage(e, direction = null) {
      if (e ? e.target.id === 'cmp-carousel__right-side-image' : direction === 'right') {
        this.currentImageCursor === this.blok.images.length - 1 ? this.currentImageCursor = 0 : this.currentImageCursor += 1
      } else {    // left side image
        this.currentImageCursor === 0 ? this.currentImageCursor = this.blok.images.length - 1 : this.currentImageCursor -= 1
      }
    },
    selectThumbnailImage(cursorPos) {
      this.currentImageCursor = cursorPos
    }
  },
  computed: {
    rightImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : '';
      const image = this.currentImageCursor === this.blok.images.length - 1 ? this.blok.images[0] : this.blok.images[this.currentImageCursor + 1]
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: 'verticalSmall', filters: filters}),
        name: image.name
      }
    },
    leftImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : '';
      const image = this.currentImageCursor === 0 ? this.blok.images[this.blok.images.length - 1] : this.blok.images[this.currentImageCursor - 1]
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: 'verticalSmall', filters: filters}),
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
}

.cmp-carousel__side-image {
  position: relative;
  height: 70%;
  flex: 1;
  cursor: pointer;

  img:first-child {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: brightness(50%)
  }

  &:hover {
    .cmp-carousel__chevron {
      opacity: .7;
    }
  }
}

.cmp-carousel__chevron {
  transition: opacity .15s;
  opacity: 0;
  position: absolute; 
  pointer-events: none;
  top: 50%;
  margin-top: -25px; 
  z-index: 10; 
  width: 50px; 
  height: auto;
}

.cmp-carousel__image-number {
  text-align: center;
  padding-bottom: 0; 
}
</style>