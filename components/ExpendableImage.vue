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
      <div class="cmp-expendable-image__close-wrapper">
        <img
        src="/close-icon-contact-form.svg"
        alt="Close expended images"
        class="cmp-expendable-image__close-icon"
        @click="closeExpendedImage">
      </div>
      <div class="cmp-expendable-image__expended-main-image-wrapper">
        <img 
          src="/chevron.svg" 
          chevronType="left"
          alt="left chevron" 
          class="cmp-expendable-image__chevron cmp-expendable-image__chevron--left"
          @click="changeImage">
        <img
          class="cmp-expendable-image__expended-main-image"
          :src="expendedImage.url"        
          :alt="expendedImage.name">
        <p class="cmp-expendable-image__image-number">{{ currentImageCursor + 1 }} / {{ this.imagesProperties.length }}</p>
        <img 
          src="/chevron.svg"
          chevronType="right"
          alt="right chevron" 
          class="cmp-expendable-image__chevron cmp-expendable-image__chevron--right"
          @click="changeImage">
      </div>
      <div 
        class="cmp-expendable-image__thumbnails-container"
        v-if="imagesProperties.length >= 3">
        <img 
          src="/chevron.svg"
          alt="left chevron" 
          class="cmp-expendable-image__chevron cmp-expendable-image__chevron--left"
          chevronType="left"
          @click="shiftThumbnails">
        <div 
          class="cmp-expendable-image__thumbnail-wrapper"
          v-for="image in thumbnailListOrdered"
          :key="image.name"
          @click="selectThumbnailImage">
          <img
            class="cmp-expendable-image__thumbnail"
            :class="{ 'cmp-expendable-image__thumbnail-center': image.isMainImage }"
            :src="getSingleThumbnailSrc(image.filename)"
            :alt="image.name"
            :position="image.position">
        </div>
        <img 
          src="/chevron.svg"
          alt="right chevron"
          chevronType="right"
          class="cmp-expendable-image__chevron cmp-expendable-image__chevron--right"
          @click="shiftThumbnails">
      </div>
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
      numberDisplayedThumbnails: 0,
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
          return {...target[prop], position: prop}
        }
      }),
      currentThumbnailOffset: 0,
      expendendImageIsLoading: false
    }
  },
  computed: {
    mainImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : ''
      const image = this.imagesProperties[this.currentImageCursor]
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: 'medium', filters: filters}),
        name: image.name,
        filename: image.filename
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
      let orderedList = []
      switch(this.numberDisplayedThumbnails) {
        case 3:
          for (let i = this.currentImageCursor + this.currentThumbnailOffset - 1; i <= this.currentImageCursor + this.currentThumbnailOffset + 1; i++) {
            orderedList.push({...this.thumbnailList[i], isMainImage: this.mainImage.filename === this.thumbnailList[i].filename ? true : false})
          }
          return orderedList
        case 5:
          for (let i = this.currentImageCursor + this.currentThumbnailOffset - 2; i <= this.currentImageCursor + this.currentThumbnailOffset + 2; i++) {
            orderedList.push({...this.thumbnailList[i], isMainImage: this.mainImage.filename === this.thumbnailList[i].filename ? true : false})
          }
          return orderedList
        case 7:
          for (let i = this.currentImageCursor + this.currentThumbnailOffset - 3; i <= this.currentImageCursor + this.currentThumbnailOffset + 3; i++) {
            orderedList.push({...this.thumbnailList[i], isMainImage: this.mainImage.filename === this.thumbnailList[i].filename ? true : false})
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
        if (screenSize >= 800 && this.imagesProperties.length >= 7) {
          return 7
        } else if (screenSize >= 620 && this.imagesProperties.length >= 5) {
          return 5
        } else if (this.imagesProperties.length >= 3) {
          return 3
        } else {
          return 0
        }
      }
    },
    expendImage(e) {
      this.numberDisplayedThumbnails = this.getNumberDisplayedThumbnails()
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
      this.currentThumbnailOffset = 0
      e.target.getAttribute('chevronType') === 'left' ? this.$emit('changeImage', 'left') : this.$emit('changeImage', 'right')
    },
    selectThumbnailImage(e) {
      this.$emit('selectThumbnailImage', +e.target.getAttribute('position'))
      this.currentThumbnailOffset = 0
    },
    shiftThumbnails(e) {
      e.target.getAttribute('chevronType') === 'left' ? this.currentThumbnailOffset -= 1 : this.currentThumbnailOffset += 1
      if (this.currentThumbnailOffset >= this.imagesProperties.length) {
        this.currentThumbnailOffset = 0
      } else if (this.currentThumbnailOffset < 0) {
        this.currentThumbnailOffset = this.imagesProperties.length - 1
      }
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
  justify-content: space-between;
  left: 0;
  top: 0;
  z-index: 999;
  padding: 20px;
  width: 100%;
  height: 100vh;
  background-color: #000;

  .cmp-expendable-image__close-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
  }

  .cmp-expendable-image__close-icon {
  cursor: pointer;
  transition: transform .15s;
  opacity: .7;
  box-sizing: content-box;
  width: 30px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  padding: 6px;

  &:hover {
    transform: scale(1.08);
  }
}

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
    max-height: calc(100vh - 222px);
    display: block;
    margin: auto;
  }

  .cmp-expendable-image__image-number {
    text-align: center;
    color: #c4c4c4;
    padding-bottom: 10px;
  }

  .cmp-expendable-image__chevron {
    cursor: pointer;
    transition: opacity .15s, transform .15s;
    opacity: 0;
    position: absolute; 
    top: 50%;
    margin-top: -25px; 
    z-index: 999;
    width: 50px; 
    height: auto;

    &--left {
      left: 10px;
      transform: rotate(180deg);

      &:hover {
        transform: rotate(180deg) scale(1.08);
      }
    }

    &--right {
      right: 10px;

      &:hover {
        transform: scale(1.08);
      }
    }
  }
}

.cmp-expendable-image__thumbnails-container {
  display: flex;
  justify-content: center;
  position: relative;

  &:hover {
    .cmp-expendable-image__chevron {
      opacity: .5;
    }
  }

  .cmp-expendable-image__thumbnail-wrapper {
    cursor: pointer;
    transition: width .15s;
    width: 106px;
    display: flex;
    justify-content: center;

    &:hover {
      width: 112px;

      .cmp-expendable-image__thumbnail {
        transform: scale(1.07);
      }
    }
  }

  .cmp-expendable-image__thumbnail {
    transition: transform .15s;
    width: 100px;
    height: 80px;
    object-fit: cover;
  }

  .cmp-expendable-image__thumbnail-center {
    border: solid 1px #cecece;
    transform: scale(1.03)
  }
}
</style>