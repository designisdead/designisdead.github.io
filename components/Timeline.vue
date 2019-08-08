<template>
  <div class="timeline--container">
    <searchbar
      @returnMatchingPosts="getMatchingPosts"
      :searchType="'event'"
      :posts="blok.listcontent"></searchbar>

    <ul
      class="timeline--ulist"
      v-if="filteredPosts.length > 0">
      <eventcard
        v-for="post in filteredPosts"
        :key="post.full_slug"
        :is="blok.listtype"
        :post="post"
      ></eventcard>
    </ul>
    <div
      v-else
      class="timeline--no-match-found">
      <h2>
        Sorry, no events were found that match the specified selection criteria...
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      filteredPosts: this.blok.listcontent
    }
  },
  methods: {
    getMatchingPosts(posts) {
      this.filteredPosts = posts
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

  .timeline--no-match-found {
    text-align: center;
    height: 42vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: size('medium')) {
    .timeline--ulist {
      margin-left: 0;
    }
  }

</style>
