<template>
  <div
    v-editable="blok"
    class="Column">
    <div class="Column-header">
      <component
        v-for="blok in blok.columnheader"
        :key="blok._uid"
        :blok="blok"
        :is="blok.component"/>
    </div>
    <div
      class="Column-content"
      :class="{
        'u-flexCenter': blok.contentalignment == 'center',
        'u-flexEnd': blok.contentalignment == 'bottom'
      }">
      <component
        v-for="blok in blok.blocks"
        :key="blok._uid"
        :blok="blok"
        :is="blok.component"/>
    </div>
    <div class="Column-footer">
      <component
        v-for="blok in blok.columnfooter"
        :key="blok._uid"
        :blok="blok"
        :is="blok.component"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {      blok: {        type: Object,        default: function () {          return {}        }      }    },
  }
</script>

<style lang="scss">
  .Column {
    padding: 0 $spacer/2;
    display: flex;
    flex-direction: column;
  }

  .Column-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .Column-footer {
    margin-top: auto;
  }
</style>
