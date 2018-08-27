<template>
  <div class="Columns" v-editable="blok"
    :class="[
      'Columns--tiny' + blok.tiny,
      'Columns--small' + blok.small,
      'Columns--medium' + blok.medium,
      'Columns--large' + blok.large,
      'Columns--huge' + blok.huge,
    ]">
    <component :key="blok._uid" v-for="blok in blok.columns" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

<style lang="scss">
  .Columns {
    display: grid;
    margin: 0 -#{$spacer/2};
  }

  @for $i from 1 through 16 {
    .Columns--tiny#{$i} {
      grid-template-columns: repeat($i, 1fr);
    }
  }

  @media screen and (min-width: size('small')) {
    @for $i from 1 through 16 {
      .Columns--small#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Columns--small {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: size('medium')) {
    @for $i from 1 through 16 {
      .Columns--medium#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Columns--medium {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: size('large')) {
    @for $i from 1 through 16 {
      .Columns--large#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Columns--large {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

  @media screen and (min-width: size('huge')) {
    @for $i from 1 through 16 {
      .Columns--huge#{$i} {
        grid-template-columns: repeat($i, 1fr);
      }
    }

    .Columns--huge {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }

</style>
