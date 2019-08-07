<template>
  <li class="Card">
    <nuxt-link
      :key="post.full_slug"
      :to="'/' + post.full_slug"
      @mouseover.native="preloadHeader()">
      <article>
        <div
          v-lazy:background-image="lazyImage"
          v-if="post.content.primaryimage"
          class="Card-image"/>
        <div class="Card-content">
          <header class="Card-header">
            <p
              v-if="post.content.author"
              class="Card-author">
              <author :id="post.content.author"/>
            </p>
            <h2
              v-if="post.content.published"
              class="Card-meta micro uppercase">
              <span
                v-if="tags.length > 0"
                class="Post-tags">
                <strong
                  v-for="(tag, index) in tags"
                  :key="'tag' + index">
                  {{ tag }}
                </strong> |
              </span>
              <time :datetime="dataTime">{{ formattedDate }}</time>
            </h2>
            <h1 class="medium uppercase Title Card-title">{{ post.name }}</h1>
          </header>
        </div>
      </article>
    </nuxt-link>
  </li>
</template>

<script>
  import moment from 'moment';
  import supportsWebP from 'supports-webp';

  const filters = supportsWebP ? '/filters:format(webp)' : '';

  export default {
    props: {
      post: {
        type: Object, default: function () {
          return {}
        }
      }
    },
    computed: {
      dataTime() {
        return moment(this.post.content.published).format('YYYY-MM-DD HH:mm');
      },
      formattedDate() {
        return moment(this.post.content.published).format('dddd MMMM D, YYYY');
      },
      tags() {
        return this.post.content.tags ? this.post.content.tags : [];
      },
      lazyImage() {
        return this.$options.filters.imageApi({src: this.post.content.primaryimage, size: 'small', filters: filters});
      },
    },
    methods: {
      preloadHeader() {
        let img = new Image();
        const url = this.$options.filters.imageApi({src: this.post.content.primaryimage, size: 'large', filters: filters});
        img.src = url;
      }
    },
  }
</script>

<style lang="scss" scoped>

  .Card {
    background: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    padding: 0;
    margin: 0 $spacer/2 $spacer;
    list-style-type: none;
    overflow: hidden;
    > a:hover {
      text-decoration: none;
    }
  }

  .Card-title {
    letter-spacing: 1.25px;
  }

  .Card-meta {
    padding-bottom: 10px;
  }

  p.Card-author {
    padding-bottom: 10px;
    font-size: 10px;
    text-transform: uppercase;
  }

  .Card-content {
    padding: $spacer/2;
    background-color: white;
    z-index: 1;
    position: relative;
  }

  .Card-image {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center center;
    filter: blur(15px);
    &[lazy=loaded] {
      filter: blur(0px);
    }
  }

</style>
