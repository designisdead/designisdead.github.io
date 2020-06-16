<template>
  <div v-editable="Blok" :data-parallax="Parallax">
    <div
      :class="[Blok.backgroundcolor, Blok.textcolor, Height, { 'wrapper--shrinked' : blok.layout == 'shrinked'}]"
      :id="blok.id"
      class="Wrapper"
      :style="{ padding: blok.size === 'full' && 0 }">
      <div
        :class="[Blok.size, size]"
        class="Wrapper-content">
        <component
          v-for="Blok in Blok.elements"
          :key="Blok._uid"
          :blok="Blok"
          :is="Blok.component"/>
        <slot/>
      </div>
      <div
        v-lazy:background-image="BackgroundImage"
        v-if="Blok.backgroundimage && !Blok.backgroundvideosrc"
        :class="[
          `u-backgroundPosition--${Blok.backgroundposition}`,
          Blok.backgroundsize == 'cover' && 'u-backgroundSizeCover',
          Blok.backgroundsize == 'contain' && 'u-backgroundSizeContain',
          Blok.backgroundfixed == 'fixed' && 'u-backgroundAttachmentFixed'
        ]"
        class="Wrapper-background"/>
      <particles v-if="Blok.backgroundeffect == 'particles'"/>
      <video-background
        v-if="Blok.backgroundvideosrc && Blok.backgroundimage"
        :src="Blok.backgroundvideosrc"
        :poster="Blok.backgroundimage"/>
    </div>
  </div>
</template>

<script>
  import supportsWebP from 'supports-webp';

  export default {
    props: {
      blok: {
        type: Object,
        default: function () {
          return {}
        }
      },
      size: {
        type: String,
        default: null
      },
      height: {
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
      },
      Parallax() {
        if(this.blok.parallax && Number(this.blok.parallax) !== 0) {
          return Number(this.blok.parallax);
        }
        else {
          return false;
        }
      },
      Height() {
        if(this.height) {
          return this.height;
        }
        else if(this.blok && this.blok.wrapperheight) {
          return this.blok.wrapperheight;
        }
        else {
          return '100vh';
        }
      },
      BackgroundImage() {
        const filters = supportsWebP ? '/filters:format(webp)' : '';
        return this.$options.filters.imageApi({src: this.Blok.backgroundimage, size: 'large', filters: filters});
      }
    }
  }
</script>

<style lang="scss">
  .Wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    will-change: min-height;
    transition: 0.4s min-height ease-out;
    padding: $spacer 0;

    &.quarterscreen {
      min-height: 25vh;
    }

    &.halfscreen {
      min-height: 50vh;
    }

    &.threequarterscreen {
      min-height: 75vh;
    }

    &.fullscreen {
      min-height: 100vh;
    }

    &.fullscreenMinusHeader {
      min-height: calc(100vh - 70px);
    }
  }

  .Wrapper-content {
    position: relative;
    margin: 0 auto;
    padding: 0 $spacer/2;
    z-index: 1;
    width: 100%;
    will-change: max-width;
    transition: 0.25s max-width ease-out;

    @each $key, $value in $sizes {
      &.#{$key} {
        max-width: $value;
      }
    }

    &.full {
      padding: 0;
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

  .wrapper--shrinked {
    margin: 0 50px;
  }
</style>
