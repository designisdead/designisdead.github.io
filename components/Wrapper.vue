<template>
  <div v-editable="Blok" :data-parallax="Parallax">
    <div
      :class="[Blok.backgroundcolor, Blok.textcolor, Height]"
      class="Wrapper">
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
        v-lazy:background-image="$options.filters.imageApi(Blok.backgroundimage, 'large')"
        v-if="Blok.backgroundimage && !Blok.backgroundvideosrc"
        :class="{
          'u-backgroundTopRight': Blok.backgroundposition == 'top right',
          'u-backgroundCenterCenter': Blok.backgroundposition == 'center center',
          'u-backgroundTopLeft': Blok.backgroundposition == 'top left',
          'u-backgroundBottomRight': Blok.backgroundposition == 'bottom right',
          'u-backgroundSizeCover': Blok.backgroundsize == 'cover',
          'u-backgroundSizeContain': Blok.backgroundsize == 'contain',
          'u-backgroundAttachmentFixed' : Blok.backgroundfixed == 'fixed'
        }"
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
