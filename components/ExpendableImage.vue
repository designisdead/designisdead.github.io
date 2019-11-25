<template>
  <div class="cmp-expendable-image">
    <img
      class="cmp-expendable-image__main-image"
      @click="expendImage"
      :src="mainImage.url"        
      :alt="mainImage.name">
    <div 
      class="cmp-expendable-image__expended-container"
      v-if="isExpended">
      <div class="cmp-expendable-image__expended-main-image-wrapper">
        <img 
          src="/chevron.svg" 
          chevron="left"
          alt="left chevron" 
          class="cmp-expendable-image__chevron"
          style="left: 10px; transform: rotate(180deg)"
          @click="changeImage">
        <img
          class="cmp-expendable-image__expended-main-image"
          :src="expendedImage.url"        
          :alt="expendedImage.name">
        <img 
          src="/chevron.svg"
          chevron="right"
          alt="right chevron" 
          class="cmp-expendable-image__chevron"
          style="right: 10px"
          @click="changeImage">
      </div>
      <div class="cmp-expendable-image__thumbnails-container">
        <img
          class="cmp-expendable-image__thumbnail"
          v-for="image in thumbnailListOrdered"
          :key="image.name"
          :src="getSingleThumbnailSrc(image.filename)"
          :alt="image.name">
      </div>
      <img
        src="/close-icon-contact-form.svg"
        alt="Close expended images"
        class="cmp-expendable-image__close"
        @click="closeExpendedImage">
    </div>
  </div>
  
</template>

<script>
import supportsWebP from 'supports-webp'

export default {
  props: {
    currentImageCursor: Number,
    imagesProperties: Array
  },
  data() {
    return {
      isExpended: false,
      currentScrollPos: 0,
      numberDisplayedThumbnails: this.getNumberDisplayedThumbnails(),
      thumbnailList: new Proxy(this.imagesProperties, {
        get(target, prop) {
          if (!isNaN(prop)) {
            prop = parseInt(prop, 10)
            if (prop < 0) {
              prop += target.length
            } else if (prop >= target.length) {
              prop -= target.length
            }
          }
          return target[prop]
        }
      })
    }
  },
  mounted() {
    console.log(this.mainImageProperties)
    console.log(this.imagesProperties)
    console.log(window.innerWidth > 0 ? window.innerWidth : screen.width)
  },
  computed: {
    mainImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : ''
      const image = this.imagesProperties[this.currentImageCursor]
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: 'medium', filters: filters}),
        name: image.name
      }
    },
    expendedImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : ''
      const image = this.imagesProperties[this.currentImageCursor]
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: this.getMainImageSize(), filters: filters}),
        name: image.name
      }
    },
    thumbnailListOrdered() {
      const orderedList = []
      switch(this.numberDisplayedThumbnails) {
        case 3:
          for (let i = this.currentImageCursor - 1; i <= this.currentImageCursor + 1; i++) {
            orderedList.push(this.thumbnailList[i])
          }
          return orderedList
        case 5:
          for (let i = this.currentImageCursor - 2; i <= this.currentImageCursor + 2; i++) {
            orderedList.push(this.thumbnailList[i])
          }
          return orderedList
        case 7:
          for (let i = this.currentImageCursor - 3; i <= this.currentImageCursor + 3; i++) {
            orderedList.push(this.thumbnailList[i])
          }
          return orderedList
      }
      return this.imagesProperties
    }
  },
  methods: {
    getMainImageSize() {
      if (process.client) {
        let screenSize = window.innerWidth > 0 ? window.innerWidth : screen.width
        if (screenSize <= 400) {
          return 'small'
        } else if (screenSize <= 800) {
          return 'medium'
        } else if (screenSize <= 1200) {
          return 'large'
        } else {
          return 'huge'
        }
      }
    },
    getSingleThumbnailSrc(filename) {
      const filters = supportsWebP ? '/filters:format(webp)' : ''
      return this.$options.filters.imageApi({src: filename, size: 'thumbnails', filters: filters})
    },
    getNumberDisplayedThumbnails() {
      if (process.client) {
        let screenSize = window.innerWidth > 0 ? window.innerWidth : screen.width
        if (screenSize >= 800) {
          return 7
        } else if (screenSize >= 620) {
          return 5
        } else {
          return 3
        }
      }
    },
    expendImage(e) {
      this.isExpended = true

      this.currentScrollPos = window.scrollY
      window.scrollTo(top)

      document.querySelector('.Page-header').style.display = 'none'
      document.querySelector('.Page-content').style.paddingTop = '0'
      document.querySelector('.Event-header').style.display = 'none'
      document.body.style.overflow = 'hidden'
    },
    closeExpendedImage() {
      this.isExpended = false

      window.scrollTo(0, this.currentScrollPos)

      document.querySelector('.Page-header').style.display = 'block'
      document.querySelector('.Page-content').style.paddingTop = '70px'
      document.querySelector('.Event-header').style.display = 'flex'
      document.body.style.overflow = 'auto'
    },
    changeImage(e) {
      if (e.target.getAttribute('chevron') === 'left') {
        this.$emit('changeImage', 'left')
      } else {    // left side image
        this.$emit('changeImage', 'right')
      }
      console.log(this.currentImageCursor)
    }
  }
}
</script>

<style lang="scss">
.cmp-expendable-image__main-image {
  cursor: pointer;
  object-fit: cover;
  max-height: 500px;
  width: 100%;
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

.cmp-expendable-image__expended-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  left: 0;
  top: 0;
  z-index: 999;
  padding: 88px 20px 20px 20px;
  width: 100%;
  height: 100vh;
  background-color: #000;

  .cmp-expendable-image__expended-main-image-wrapper {
    position: relative;

    &:hover {
      .cmp-expendable-image__chevron {
        opacity: .7;
      }
    }
  }
  
  .cmp-expendable-image__expended-main-image {
    width: auto;
    max-width: 100%;
    max-height: calc(100vh - 120px);
    display: block;
    margin: auto;
  }

  .cmp-expendable-image__chevron {
    cursor: pointer;
    transition: opacity .15s;
    opacity: 0;
    position: absolute; 
    top: 50%;
    margin-top: -25px; 
    z-index: 999;
    width: 50px; 
    height: auto;
  }
}

.cmp-expendable-image__thumbnails-container {
  display: flex;
  justify-content: center;

  .cmp-expendable-image__thumbnail {
    margin: 0;
    width: 100px;
    height: 80px;
    object-fit: cover;
  }
}

.cmp-expendable-image__close {
  cursor: pointer;
  position: fixed;
  transition: transform .15s;
  opacity: .7;
  box-sizing: content-box;
  width: 30px;
  z-index: 3;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  border: 3px solid #DDD;
  padding: 6px;

  &:hover {
    transform: scale(1.05);
  }
}
</style>