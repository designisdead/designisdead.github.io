<template>
  <div class="timeline--container">
    <searchbar @sendSearchInput="getSearchInput" :searchType="'event'"></searchbar>

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
        return {
          searchInput: ''
        }
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
      this.searchInput = input
      this.filterEvents()
    },
    filterEvents() {
      this.filteredPosts = this.blok.listcontent.filter(event => {
        return this.formatString(event.name).includes(this.searchInput)
        || this.formatString(event.content.location).includes(this.searchInput)
        || this.formatString(event.content.date).includes(this.searchInput)
        || this.checkTags([...event.content.tags])
      })
    },
    formatString(string) {
      return typeof(string) !== undefined ? string.replace(' ', '').toLowerCase() : null
    },
    checkTags(tagsArray) {
      let containSearchInput = false
      tagsArray.forEach(tag => {
        tag.includes(this.searchInput) ? containSearchInput = true : null
      })
      return containSearchInput
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
