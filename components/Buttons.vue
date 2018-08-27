<template>
  <div class="Buttons" v-editable="blok"
    :style="{justifyContent: blok.alignment}">
    <component :key="blok._uid" v-for="blok in blok.buttons" :blok="blok" :is="'vue-' + blok.component"></component>
  </div>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

<style lang="scss">
  .Buttons {
    display: flex;
    margin: 0 -#{$spacer/4};

    .Button {
      display: flex;
      align-items: center;
    }
  }
</style>
