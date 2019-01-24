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
    display: flex;
    flex-wrap: wrap;
    margin: 0 -#{$spacer/2};
    justify-content: center;
    > div {
      padding: 0 $spacer/2 $spacer/2 $spacer/2;
    }
  }

  @for $i from 1 through 16 {
    .Grid--tiny#{$i} {
      > div {
        min-width: 100% / $i;
      }
    }
  }

  @media screen and (min-width: size('small')) {
    @for $i from 1 through 16 {
      .Grid--small#{$i} {
        > div {
          min-width: 100% / $i;
        }
      }
    }
  }

  @media screen and (min-width: size('medium')) {
    @for $i from 1 through 16 {
      .Grid--medium#{$i} {
        > div {
          min-width: 100% / $i;
        }
      }
    }
  }

  @media screen and (min-width: size('large')) {
    @for $i from 1 through 16 {
      .Grid--large#{$i} {
        > div {
          min-width: 100% / $i;
        }
      }
    }
  }

  @media screen and (min-width: size('huge')) {
    @for $i from 1 through 16 {
      .Grid--huge#{$i} {
        > div {
          min-width: 100% / $i;
        }
      }
    }
  }

</style>
