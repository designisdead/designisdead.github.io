<template>
  <div class="Image" v-editable="blok">
    <img
      :src="blok.image"
      :width="blok.width"
      :alt="blok.alt"
      :class="{
       'u-centered' : blok.alignment == 'center',
       'u-floatRight' : blok.alignment == 'right',
       'ImageUpload--stretched' : !blok.width
      }"
    />
  </div>
</template>

<script>
  export default {
    props: ['blok']
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
