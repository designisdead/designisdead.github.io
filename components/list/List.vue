<template>
  <div v-editable="blok">
    <!-- If list type is masonry -->
    <div v-if="blok.listtype === 'masonry'">
      <equalcolumns :cols="{default: 4, 1400: 3, 700: 2, 400: 1}">
        <div
          v-for="(post, index) in blok.listcontent"
          :key="index">
          <brick :post="post"/>
        </div>
      </equalcolumns>
    </div>
    <!-- else if list type is eventcard -->
    <div v-else-if="blok.listtype === 'eventcard'">
      <searchbar
      @emitSearchFields="getSearchField"
      :searchType="'event'"></searchbar>

      <timeline :listContent="blok.listcontent"></timeline>
    </div>
    <!-- else -->
    <div v-else>
      <searchbar
      v-if="blok.contenttype === 'blog/'"
      @emitSearchFields="getSearchField"
      :searchType="'blog'"></searchbar>

      <ul
        :class="['List--' + blok.listtype]"
        class="List">
        <component
          v-for="post in blok.listcontent"
          :key="post.full_slug"
          :post="post"
          :is="blok.listtype"/>
      </ul>
    </div>

    <div
      v-if="showMoreButton"
      class="u-textAlignCenter">
      <button
        :disabled="loading"
        class="Button"
        @click="nextPage">Load more
      </button>
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
      page: 1,
      perPage: this.blok.perpage,
      stories: this.blok.listcontent,
      loading: false,
      nextContent: [],
      searchInput: '',
      searchTags: ''
    };
  },
  computed: {
    showMoreButton() {
      return this.nextContent.length > 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.nextPage()
    })
  },
  methods: {
    nextPage() {
      this.loading = true
      this.page += 1

      this.blok.listcontent ? this.blok.listcontent = [...this.blok.listcontent, ...this.nextContent] : console.log('no list content found')

      return this.$storyapi
      .get("cdn/stories", {
        version: this.$store.state.settings.version,
        cv: this.$store.state.settings.cacheVersion,
        starts_with: this.blok.contenttype,
        sort_by: this.blok.sortby ? this.blok.sortby : "created_at:desc",
        with_tag: this.searchTags,
        search_term: this.searchInput,
        page: this.page,
        per_page: this.blok.perpage,
        is_startpage: false // exclude start pages (fe: blog list)
      })
      .then(data => {
        this.nextContent = data.data.stories
        this.loading = false
      })
    },
    getNewSearchData() {
      this.loading = true
      this.page = 1

      return this.$storyapi
      .get('cdn/stories', {
        version: this.$store.state.settings.version,
        cv: this.$store.state.settings.cacheVersion,
        starts_with: this.blok.contenttype,
        sort_by: this.blok.sortby ? this.blok.sortby : "created_at:desc",
        with_tag: this.searchTags,
        search_term: this.searchInput,
        page: this.page,
        per_page: this.blok.perpage,
        is_startpage: false // exclude start pages (fe: blog list)
      })
      .then(data => {
        this.loading = false
        this.blok.listcontent = data.data.stories
        this.page = 1
        this.nextPage()
      })
    },
    getSearchField(input, tags) {
      console.log('search fields received: ', input, tags)
      this.searchInput = input
      this.searchTags = tags
      this.nextContent = []
      this.getNewSearchData()
    }
  }
}
</script>

<style lang="scss">
.List {
  position: relative;
}

.List--loading {
  min-height: 300px;
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.9;
  }
}

.List--list-image,
.List--card {
  margin: 0 (-$spacer/2);
  // grid-auto-rows: repeat(2, 1fr);
  @media screen and (min-width: size("medium")) {
    display: grid;
    // grid-gap: $spacer * 0.75;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: size("large")) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

