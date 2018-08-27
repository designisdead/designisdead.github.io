<template>
  <div class="Column" v-editable="blok">
    <div class="Column-header">
      <component :key="blok._uid" v-for="blok in blok.columnheader" :blok="blok" :is="blok.component"></component>
    </div>
    <div class="Column-content">
      <component :key="blok._uid" v-for="blok in blok.blocks" :blok="blok" :is="blok.component"></component>
    </div>
    <div class="Column-footer">
      <component :key="blok._uid" v-for="blok in blok.columnfooter" :blok="blok" :is="blok.component"></component>
    </div>
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
    display: flex;
    flex-direction: column;
  }

  .Column-footer {
    margin-top: auto;
  }
</style>
