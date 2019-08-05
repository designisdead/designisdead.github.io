<template>
  <div class="timeline--container">
    <ul class="timeline--ulist">
      <eventcard
        v-for="post in blok.listcontent"
        :key="post.full_slug"
        :is="blok.listtype"
        :post="post"
      ></eventcard>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
}
</script>

<style>
  .timeline--ulist {
    list-style: none;
    position: relative;
    margin-left: 200px;
  }

  /* Dashed line on the left */
  .timeline--ulist:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border: 1px dashed #999;
  }

</style>
