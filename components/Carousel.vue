<template>
  <div
    class="cmp-carousel">
    <div class="cmp-carousel__container">
      <div 
      class="cmp-carousel__side-image"
      @click="changeImage"
      :style="leftImageStyle">
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
          @selectThumbnailImage="selectThumbnailImage"
          @showSideImage="showSideImage"
          @stopDrag="stopDrag" />
      </div>
      <div 
        class="cmp-carousel__side-image"
        @click="changeImage"
        :style="rightImageStyle">
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
      currentImageCursor: 0,
      mainImageOffset: 0,
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
    },
    showSideImage(offset) {
      this.mainImageOffset = offset
    },
    stopDrag() {
      this.mainImageOffset = 0
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
    rightImageStyle() {
      if (process.client) { 
        let screenSize = window.innerWidth > 0 ? window.innerWidth : screen.width
        return this.mainImageOffset >= 0 || screenSize >= 800 ? {
          'display': 'block',
        } : { 
          'display': 'none' 
        }
      }
      return null
    },
    leftImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : '';
      const image = this.currentImageCursor === 0 ? this.blok.images[this.blok.images.length - 1] : this.blok.images[this.currentImageCursor - 1]
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: 'verticalSmall', filters: filters}),
        name: image.name
      }
    },
    leftImageStyle() {
      if (process.client) { 
        let screenSize = window.innerWidth > 0 ? window.innerWidth : screen.width
        return this.mainImageOffset <= 0 || screenSize >= 800 ? {
          'display': 'block',
        } : { 
          'display': 'none' 
        }
      }
      return null
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
  flex: 7;
  padding: 0 20px;
  height: 100%;
  overflow-y: hidden;
}

.cmp-carousel__side-image {
  position: relative;
  height: 80%;
  flex: 1;
  cursor: pointer;

  img:first-child {
    transition: filter .2s;
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: brightness(40%);
  }

  &:hover {
    img:first-child {
      filter: brightness(45%);
    }

    .cmp-carousel__chevron {
      opacity: .8;
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

@media screen and (max-width: size('large')) {
  .cmp-carousel__container {
    height: 400px;
  }
}

@media screen and (max-width: size('medium')) {
  .cmp-carousel__container {
    display: flex;
    overflow: hidden;
  }

  .cmp-carousel__side-image {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    
    img:first-child {
      filter: none;
    }
  }

  .cmp-carousel__chevron {
    display: none;
  }

  .cmp-carousel__main-image {
    padding: 0;
  }
}

@media screen and (max-width: size('small')) {
  .cmp-carousel__container {
    max-height: 300px;
  }
}
</style>