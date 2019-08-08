<template>
  <div class="timeline--container">
    <searchbar
      @sendSearchInput="getSearchInput"
      @sendSelectedTags="getSelectedTags"
      :searchType="'event'"></searchbar>

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
        Sorry, no event was found...
      </h2>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
      filteredPosts: this.blok.listcontent,
      searchInput: '',
      selectedTags: []
    }
  },
  methods: {
    getSearchInput(input) {
      console.log(input)
      this.searchInput = input
      this.filterEvents()
    },
    getSelectedTags(tags) {
      console.log(tags)
      this.selectedTags = tags
      this.filterEvents()
    },
    filterEvents() {
      this.filteredPosts = this.blok.listcontent.filter(event => {
        if (this.selectedTags.length > 0) {
          return this.inputFilter(event) && this.tagsFilter(event)
        } else {
          return this.inputFilter(event)
        }
      })
    },
    inputFilter(event) {
      return this.formatString(event.name).includes(this.searchInput)
        || this.formatString(event.content.location).includes(this.searchInput)
        || this.formatString(this.formatDate(event.content.date)).includes(this.searchInput)
        || this.checkTags([...event.content.tags])
    },
    tagsFilter(event) {
      let matchSelectedTags = false
      this.selectedTags.forEach(tag => event.content.tags.includes(tag.value) ? matchSelectedTags = true : null)
      return matchSelectedTags
    },
    formatString(string) {
      return typeof(string) !== undefined ? string.replace(' ', '').toLowerCase() : null
    },
    checkTags(tagsArray) {
      // used for the input filter, if input match tags
      let containSearchInput = false
      tagsArray.forEach(tag => {
        tag.includes(this.searchInput) ? containSearchInput = true : null
      })
      return containSearchInput
    },
    formatDate(date) {
      return moment(date).format('dddd MMMM D, YYYY')
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
