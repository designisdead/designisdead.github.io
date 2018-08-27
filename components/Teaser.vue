<template>
  <div class="Teaser" v-editable="blok">
    <div class="Teaser-image"
         v-lazy:background-image="$options.filters.imageApi(blok.image, 'large')">
    </div>
    <div class="Teaser-content">
      <markdown>{{ blok.text }}</markdown>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['blok']
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
    }
  }

  .Teaser-image {
    display: flex;
    position: relative;
    background: color('dark') center center / cover;
    width: 100%;
    height: 200px;
    margin-bottom: $spacer/2;

    @media screen and (min-width: size('medium')) {
      width: 50%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      margin-bottom: 0;
      .Teaser:nth-child(even) & {
        left: auto;
        right: 0;
      }
    }
  }

  .Teaser-icon {
    position: absolute;
    top: 50%;
    right: 50%;
    color: color('light');
    border: 2px solid color('light');
    border-radius: 50%;
    padding: 10px;
    width: $teaserIconSize;
    height: $teaserIconSize;
    transform: translate3d(calc(50% + 10px), -50%, 0);

    > svg {
      width: 100%;
      height: 100%;

    }
  }

  .Teaser-content {
    padding: $spacer/2;

    @media screen and (min-width: size('medium')) {
      max-width: size('large')/2;
      margin: 0 auto;
      transform: translateX(50%);
      width: 50%;
      .Teaser:nth-child(even) & {
        transform: translateX(-50%);
      }
    }

    @media screen and (min-width: size('huge')) {
      padding-left: $spacer*2;
      .Teaser:nth-child(even) & {
        padding-left: $spacer/2;
        padding-right: $spacer*2;
      }
    }
  }

</style>
