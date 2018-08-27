<template>
  <svg class="Icon">
    <use v-bind:xlink:href="'#svg-' +type"
         v-bind:href="'#svg-' +type">
    </use>
  </svg>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        require: true
      }
    }
  }
</script>

<style lang="scss">
  .Icon {
    position: relative;
    width: 24px;
    height: 24px;
    display: inline-block;

    @each $key, $value in $sizes {
      &.#{$key} {
        height: ceil($value/26);
        width: ceil($value/26);
      }
    }

    > svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
</style>
