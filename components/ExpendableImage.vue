<template>
  <div>
    <img
      @click="expendImage"
      :src="mainImage.url"        
      :alt="mainImage.name">
    <div class="cmp-carousel__expended-image">
      <img
        v-if="expendedImage"
        :src="expendedImage.url"        
        :alt="expendedImage.name">
    </div>
  </div>
  
</template>

<script>
import supportsWebP from 'supports-webp'

export default {
  props: {
    mainImageProperties: Object
  },
  data() {
    return {
      expendedImage: null
    }
  },
  mounted() {
    console.log(this.mainImageProperties)
  },
  computed: {
    mainImage() {
      const filters = supportsWebP ? '/filters:format(webp)' : ''
      const image = this.mainImageProperties
      return {
        url: this.$options.filters.imageApi({src: image.filename, size: 'medium', filters: filters}),
        name: image.name
      }
    },
  },
  methods: {
    expendImage(e) {
      console.log('clicked')
      const filters = supportsWebP ? '/filters:format(webp)' : ''
      const image = this.mainImageProperties
      this.expendedImage = {
        url: this.$options.filters.imageApi({src: image.filename, size: 'medium', filters: filters}),
        name: image.name
      }
      var currentScrollPos = window.scrollY
      window.scrollTo(top)

      document.querySelector('.cmp-carousel__expended-image').style.display = 'block'
      console.log(process.client ? window.scrollY : 'server')
      document.querySelector('.Page-header').style.display = 'none'
      document.querySelector('.Page-content').style.paddingTop = '0'
    }
  }
}
</script>

<style lang="scss">
.cmp-carousel__expended-image {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background: #000000e5;
  
  img {
    width: auto;
    display: block;
    margin: auto;
  }
}
</style>