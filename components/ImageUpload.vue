<template>
  <figure
    v-editable="blok"
    class="ImageUpload inline-display"
    :style="'width:' + blok.blok_width + '%;'">
    <div
      class="ImageUpload-imageWrapper"
      :class="{
        'u-flexEnd': blok.alignment === 'right',
        'u-flexStart': blok.alignment === 'left',
        'u-flexCenter': blok.alignment === 'center',
      }"
    >
      <img
        v-lazy="lazyImage"
        :width="blok.width"
        :height="blok.height === '' ? 'auto' : blok.height"
        :alt="blok.alt"
        :title="blok.alt"
        class="ImageUpload-image"
        :class="{
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
    }
  }
</script>

<style lang="scss">
  .inline-display {
    display: inline-block;
    vertical-align: top;
  }

  @media screen and (max-width: map-get($sizes, "medium")) {
    .inline-display {
      display: block;
      width: 100%!important;
    }
  }

  .ImageUpload {
    margin-bottom: $spacer;
    // display: inline-block;
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
