<template>
  <div
    v-editable="blok"
    :style="'height: ' + imageHeight + ';'"
    class="Image">
    <img
      v-lazy="blok.image"
      :src="$options.filters.imageApi(blok.image, 'nano')"
      :width="blok.width"
      :alt="blok.alt"
      :title="blok.alt"
      :class="{
        'u-centered' : blok.alignment == 'center',
        'u-floatRight' : blok.alignment == 'right',
        'ImageUpload--stretched' : !blok.width
      }"
    >
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object, default: function () {
          return {}
        }
      }
    },
    computed: {
      imageHeight() {
        let imageHeight = 'auto';
        if(typeof this.blok.height !== 'undefined') {
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
