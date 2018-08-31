<template>
  <li class="Card">
    <nuxt-link
      :key="post.full_slug"
      :to="'/' + post.full_slug"
      @mouseover.native="preloadHeader($options.filters.imageApi(post.content.primaryimage, 'large'))">
      <article>
        <div class="Card-image"
          v-if="post.content.primaryimage"
          v-lazy:background-image="$options.filters.imageApi(post.content.primaryimage, 'small')">
        </div>
        <div class="Card-content">
          <header class="Card-header">
            <p class="Card-author" v-if="post.content.author">
              <author :id="post.content.author"></author>
            </p>
            <h2 class="Card-meta micro uppercase" v-if="post.content.published">
              <span class="Post-tags" v-if="tags.length > 0">
                <strong v-for="tag in tags">
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

  export default {
    props: ['post'],
    methods: {
      preloadHeader(url) {
        var img=new Image();
        img.src=url;
      }
    },
    computed: {
      dataTime() {
        return moment(this.post.content.published).format('YYYY-MM-DD HH:mm');
      },
      formattedDate() {
        return moment(this.post.content.published).format('dddd MMMM D, YYYY');
      },
      fromNow() {
        return moment(this.post.content.published).fromNow();
      },
      tags() {
        return this.post.content.tags && this.post.content.tags.tags ? this.post.content.tags.tags : {};
      }
    }
  }
</script>

<style lang="scss" scoped>

  .Card {
    background: white;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.05);
    padding: 0;
    margin: 0 $spacer/2 $spacer;
    list-style-type: none;
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
  }

  .Card-image {
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center center;
  }

</style>
