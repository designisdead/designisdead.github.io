<template>
  <div v-editable="Blok">
    <div class="Wrapper" :class="[Blok.backgroundcolor, Blok.textcolor]">
      <div class="Wrapper-content" :class="[Size]">
        <component :key="Blok._uid" v-for="Blok in Blok.elements" :blok="Blok" :is="Blok.component"></component>
        <slot></slot>
      </div>
      <div class="Wrapper-background"
        v-if="Blok.backgroundimage && !Blok.backgroundvideosrc"
        v-lazy:background-image="$options.filters.imageApi(Blok.backgroundimage, 'large')"
        :class="{
          'u-backgroundTopRight': Blok.backgroundposition == 'top right',
          'u-backgroundCenterCenter': Blok.backgroundposition == 'center center',
          'u-backgroundTopLeft': Blok.backgroundposition == 'top left',
          'u-backgroundSizeCover': Blok.backgroundsize == 'cover',
          'u-backgroundSizeContain': Blok.backgroundsize == 'contain',
        }">
      </div>

      <video-background :src="Blok.backgroundvideosrc" :poster="Blok.backgroundimage" v-if="Blok.backgroundvideosrc && Blok.backgroundimage"></video-background>
    </div>
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

  .Wrapper {
    position: relative;
  }

  .Wrapper-content {
    position: relative;
    margin: 0 auto;
    padding: 0 $spacer/2;
    z-index: 1;

    @each $key, $value in $sizes {
      &.#{$key} {
        max-width: $value;
      }
    }
  }

  .Wrapper-background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
  }
</style>
