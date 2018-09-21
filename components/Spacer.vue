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
  $i: 0;
  @each $key, $value in $sizes {
    $i: $i + 1;
    &.#{$key} {
      padding: $i * 5px;
    }
  }
}
</style>
