<template>
  <div 
    v-editable="Blok"
    class="Spacer"
    :class="{
      [Size] : true,
      'Spacer__separator-line-top' : blok.separatorline && blok.separatorlineposition === 'top',
      'Spacer__separator-line-bottom' : blok.separatorline && blok.separatorlineposition === 'bottom',
    }" />
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

.Spacer__separator-line-top {
  border-top: solid 1px color('medium');
}

.Spacer__separator-line-bottom {
  border-bottom: solid 1px color('medium');
}
</style>
