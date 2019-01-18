<template>
  <div
    v-editable="blok"
    :style="'height: ' + imageHeight + ';'"
    class="Image">
      <img
        v-lazy="lazyImage"
        :width="blok.width"
        :alt="blok.alt"
        :title="blok.alt"
        :class="{
        'u-centered' : blok.alignment == 'center',
        'u-floatRight' : blok.alignment == 'right',
        'ImageUpload--stretched' : !blok.width
      }"
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
    computed: {
      lazyImage() {
        /*
         * If webp is supported by the client, serve a large webp image
         * https://www.storyblok.com/docs/image-service
         */
        const filters = supportsWebP ? '/filters:format(webp)' : '';
        return this.$options.filters.imageApi({src: this.blok.image, size: '', filters: filters});
      },
      imageHeight() {
        let imageHeight = 'auto';
        if (typeof this.blok.height !== 'undefined') {
          imageHeight = this.blok.height + 'px';
        }

        return imageHeight;
      }
    }
  }
</script>

<style lang="scss">
  .Image {
    display: flex;
    align-items: center;
  }

  .Image::after {
    content: "";
    clear: both;
    display: table;
  }

  .ImageUpload--stretched {
    max-width: 100%;
    display: block;
    margin-bottom: $spacer;
  }
</style>
