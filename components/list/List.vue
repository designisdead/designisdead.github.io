<template>
  <div v-editable="blok">
    <!-- If list type is masonry -->
    <masonry
      v-if="blok.listtype == 'masonry'"
      :cols="{default: 3, 1400: 3, 700: 2, 400: 1}"
      :gutter="0">
      <div
        v-for="(post, index) in blok.listcontent"
        :key="index">
        <brick :post="post" />
      </div>
    </masonry>

    <!-- else -->
    <ul
      v-else
      :class="['List--' + blok.listtype]"
      class="List">
      <component
        v-for="post in blok.listcontent"
        :key="post.full_slug"
        :post="post"
        :is="blok.listtype" />
    </ul>

    <div
      v-if="showMoreButton"
      class="u-textAlignCenter">
      <button
        :disabled="loading"
        class="Button"
        @click="nextPage">Load more</button>
    </div>
  </div>
</template>

<script>
  import storyblokSettings from '~/plugins/storyblokSettings';

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
        nextContent: []
      }
    },
    computed: {
      showMoreButton() {
        return this.nextContent.length > 0;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.nextPage();
      })
    },
    methods: {
      nextPage: function () {
        this.loading = true;
        this.page += 1;

        if(this.blok.listcontent) {
          this.blok.listcontent = [
            ...this.blok.listcontent,
            ...this.nextContent
          ];
        }
        else {
          alert('listcontent was not rendered on page load!');
        }

        return this.$storyapi.get('cdn/stories', {
          version: storyblokSettings.version,
          cv: storyblokSettings.cv,
          starts_with: this.blok.contenttype,
          sort_by: this.blok.sortby ? this.blok.sortby : 'created_at:desc',
          page: this.page,
          per_page: this.blok.perpage,
          is_startpage: false, // exclude start pages (fe: blog list)
        }).then(data => {
          this.nextContent = data.data.stories;
          this.loading = false;
        })
      }
    },
  }
</script>

<style lang="scss">
  .List {
    position: relative;
  }

  .List--loading {
    min-height: 300px;
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0.9;
    }
  }

  .List--card {
    margin: 0 (-$spacer/2);
    // grid-auto-rows: repeat(2, 1fr);
    @media screen and (min-width: size('medium')) {
      display: grid;
      // grid-gap: $spacer * 0.75;
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: size('large')) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>

