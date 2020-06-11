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
    <!-- else if list type is event -->
    <div v-else-if="blok.contenttype === 'events/'">
      <!-- Not enough events to justify the search bar here atm -->
      <!-- <search-bar
      @emitSearchFields="getSearchField"
      :searchType="'event'"></search-bar> -->

      <timeline :listContent="blok.listcontent"></timeline>
    </div>
    <!-- else -->
    <div v-else>
      <search-bar
      v-if="blok.contenttype === 'blog/'"
      @emitSearchFields="getSearchField"
      :searchType="'blog'"></search-bar>
      <div
        v-if="blok.contenttype === 'blog/'"
        class="list__mobile-top-spacer blog-list__container"></div>

      <ul
        v-if="blok.listcontent.length > 0"
        :class="['List--' + blok.listtype]"
        :id="blok.id"
        class="List">
        <component
          v-for="post in blok.listcontent"
          :key="post.full_slug"
          :post="post"
          :is="blok.listtype"/>
      </ul>

      <div
        v-else-if="blok.contenttype === 'blog/'"
        class="timeline--no-match-found">
        <h2>
          Sorry, no blogs were found that match the specified selection criteria...
        </h2>
      </div>
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
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar
  },
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

.blog-list__container {
  // padding-top: 20px;
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

@media screen and (max-width: size("medium")-1) {
  .list__mobile-top-spacer {
    height: 40px;
  }
}
</style>

