<template>
  <div 
    v-editable="Blok"
    :class="[Size]"
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
      },
      Size() {
        return this.size || this.blok.size;
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
