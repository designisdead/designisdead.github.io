<template>
  <figure
    v-editable="blok"
    :style="'height: ' + imageHeight + ';'"
    class="ImageUpload">
    <div
      class="ImageUpload-imageWrapper"
      :class="{
        'u-flexEnd': blok.alignment === 'right'
      }"
    >
      <img
        v-lazy="lazyImage"
        :width="blok.width"
        :alt="blok.alt"
        :title="blok.alt"
        class="ImageUpload-image"
        :class="{
        'u-centered' : blok.alignment == 'center',
        'ImageUpload-image--stretched' : !blok.width
      }"
      />
    </div>
    <figcaption
      v-if="blok.title"
      class="ImageUpload-caption">
      {{ blok.title }}
    </figcaption>
  </figure>
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
  .ImageUpload {
    margin-bottom: $spacer;
  }

  .ImageUpload-imageWrapper {
    display: flex;
    align-items: center;
  }

  .ImageUpload-imageWrapper::after {
    content: "";
    clear: both;
    display: table;
  }

  .ImageUpload-image--stretched {
    max-width: 100%;
    display: block;
  }

  .ImageUpload-caption {
    display: block;
    text-align: center;
    font-size: 0.85rem;
    font-style: italic;
    padding-top: $spacer/4;
  }
</style>
