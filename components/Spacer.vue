<template>
  <div class="Spacer"
    v-editable="Blok"
    v-bind:class="[Size]">
  </div>
</template>

<script>
  export default {
    props: {
      blok: Object,
      size: String
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
  @each $key, $value in $sizes {
    &.#{$key} {
      padding: ceil($value/20);
    }
  }
}
</style>
