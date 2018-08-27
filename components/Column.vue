<template>
  <div class="Column" v-editable="blok">
    <component :key="blok._uid" v-for="blok in blok.blocks" :blok="blok" :is="blok.component"></component>
  </div>
</template>

<script>
  export default {
    props: ['blok']
  }
</script>

<style lang="scss">
  .Column {
    padding: 0 $spacer/2;
  }
</style>
