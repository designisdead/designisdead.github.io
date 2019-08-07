<template>
  <div class="timeline--container">
    <searchbar @sendSearchInput="getSearchInput"></searchbar>

    <ul class="timeline--ulist">
      <eventcard
        v-for="post in filteredPosts"
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
  data() {
    return {
      filteredPosts: this.blok.listcontent
    }
  },
  methods: {
    getSearchInput(input) {
      if (process.client) {
        console.log(input)
      }
    }
  }
}
</script>

<style lang="scss">
  .timeline--ulist {
    list-style: none;
    position: relative;
    margin-left: 240px;
  }

  /* Dashed line on the left */
  .timeline--ulist:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border: 1px dashed #BBB;
  }

  @media screen and (max-width: size('medium')) {
    .timeline--ulist {
      margin-left: 0;
    }
  }

</style>
