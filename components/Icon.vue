<template>
  <svg
    class="Icon"
    :class="size">
    <use
      :xlink:href="'#svg-' + type"
      :href="'#svg-' + type"/>
  </svg>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'knuckles',
        required: true
      },
      size: {
        type: String,
        default: 'medium',
        required: false
      },
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
