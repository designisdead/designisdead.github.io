<template>
  <div
    v-editable="blok"
    class="Teaser">
    <div
      v-lazy:background-image="backgroundImage"
      class="Teaser-image">
      <div
        v-if="blok.icon"
        class="Teaser-icon">
        <img :src="blok.icon">
      </div>
    </div>
    <div class="Teaser-content">
      <markdown>{{ blok.text }}</markdown>
    </div>
  </div>
</template>

<script>
  import supportsWebP from 'supports-webp';

  export default {
    props: {
      blok: {
        type: Object, default: function () {
          return {}
        }
      }
    },
    computed: {
      backgroundImage() {
        const filters = supportsWebP ? '/filters:format(webp)' : '';
        return this.$options.filters.imageApi({src: this.blok.image, size: 'large', filters: filters});
      }
    }
  }
</script>

<style lang="scss">
  $teaserIconSize: 120px;

  .Teaser {
    position: relative;
    font-family: 'Arial';

    @media screen and (min-width: size('medium')) {
      min-height: 400px;
      height: 50vh;
      display: flex;
      align-items: center;

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }

  .Teaser-image {
    display: flex;
    position: relative;
    background: color('dark') center center / cover;
    width: 100%;
    height: 260px;

    @media screen and (min-width: size('medium')) {
      min-width: 50%;
      max-width: 50%;
      height: 100%;
      margin-bottom: 0;
    }
  }

  .Teaser-icon {
    position: absolute;
    top: 50%;
    right: 50%;
    color: color('light');
    width: $teaserIconSize;
    height: $teaserIconSize;
    transform: translate3d(calc(50%), -50%, 0);
    display: flex;
    align-items: center;

    > img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .Teaser-content {
    padding: $spacer $spacer/2;
    max-width: 550px;
    margin: 0 auto;

    p:last-child {
      padding-bottom: 0;
    }
  }

</style>
