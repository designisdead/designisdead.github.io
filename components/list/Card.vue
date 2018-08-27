<template>
  <li class="Card">
    <nuxt-link :key="post.full_slug" :to="'/' + post.full_slug">
      <article>
        <div class="Card-image"
          v-if="post.content.primaryimage"
          v-lazy:background-image="$options.filters.imageApi(post.content.primaryimage, 'small')">
        </div>
        <div class="Card-content">
          <header class="Card-header">
            <h2 class="tiny">
              <span v-if="post.content.published">Posted <time :datetime="dataTime">{{ fromNow }}</time></span><br />
              <author v-if="post.content.author" :id="post.content.author"></author>
            </h2>
            <h1 class="medium">{{ post.name }}</h1>
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
    computed: {
      dataTime() {
        return moment(this.post.content.published).format('YYYY-MM-DD HH:mm');
      },
      fromNow() {
        return moment(this.post.content.published).fromNow();
      }
    }
  }
</script>

<style lang="scss" scoped>

  .Card {
    background: white;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.15);
    padding: 0;
    margin: 0 $spacer/2 $spacer;
    list-style-type: none;
    > a:hover {
      text-decoration: none;
    }
  }

  .Card-content {
    padding: $spacer/2 $spacer/2 0 $spacer/2;
  }

  .Card-image {
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center center;
  }

</style>
