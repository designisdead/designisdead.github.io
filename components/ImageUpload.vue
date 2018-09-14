<template>
  <div 
    v-editable="blok" 
    class="Image">
    <img
      v-lazy="blok.image"
      :src="$options.filters.imageApi(blok.image, 'nano')"
      :width="blok.width"
      :alt="blok.alt"
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
    props: {      blok: {        type: Object,        default: function () {          return {}        }      }    },
  }
</script>

<style lang="scss">
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
