<template>
  <div
    v-editable="blok"
    :class="[
      'Grid--tiny' + blok.tiny,
      'Grid--small' + blok.small,
      'Grid--medium' + blok.medium,
      'Grid--large' + blok.large,
      'Grid--huge' + blok.huge,
    ]"
    class="Grid">
    <div
      v-for="blok in blok.columns"
      :key="blok._uid">
      <component
        :blok="blok"
        :is="blok.component"/>
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
      }
    },
  }
</script>

<style lang="scss">
  .Grid {
    display: grid;
    margin: 0 -#{$spacer/2};
  }

  @for $i from 1 through 16 {
    .Grid--tiny#{$i} {
      grid-template-columns: repeat($i, 1fr);
    }
  }

  @media screen and (min-width: size('small')) {
    @for $i from 1 through 16 {
      .Grid--small#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Grid--small {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: size('medium')) {
    @for $i from 1 through 16 {
      .Grid--medium#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Grid--medium {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: size('large')) {
    @for $i from 1 through 16 {
      .Grid--large#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Grid--large {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: size('huge')) {
    @for $i from 1 through 16 {
      .Grid--huge#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Grid--huge {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

</style>
