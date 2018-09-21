<template>
  <div
    v-editable="Blok"
    :class="[Blok.size, size]"
    class="Spacer"/>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        default: function() {
          return {}
        }
      },
      size: {
        type: String,
        default: null
      }
    },
    computed: {
      Blok() {
        return this.blok || {};
      }
    }
  }
</script>

<style lang="scss">
.Spacer {
  @each $key, $value in $sizes {
    &.#{$key} {
      padding: ceil($value/66);
    }
  }
}
</style>
