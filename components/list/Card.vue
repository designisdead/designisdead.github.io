<template>
  <li class="Card">
    <nuxt-link
      :key="post.full_slug"
      :to="'/' + post.full_slug"
      @mouseover.native="preloadHeader()">
      <article class="Card-container">
        <div class="Card-content">
          <header class="Card-header">
            <time
              v-if="post.content.published"
              class="Card-date"
              :datetime="dataTime">
              {{ formattedDate }}
            </time>

            <span
              v-if="tags.length > 0 && post.content.published"
              class="Card-tags-container">
              <span
                v-for="(tag, index) in tags"
                :key="'tag' + index"
                class="Card-tag">
                {{ tag }}
              </span>
            </span>

            <h1 class="Card-title">{{ post.name }}</h1>

            <p
              v-if="post.content.author"
              class="Card-author">
              <author :id="post.content.author" :portrait="false" :firstLetterStyle="true" />
            </p>
            
            <p
              v-if="post.content.location"
              class="card__location-content">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0C153.755 0 70.573 83.182 70.573 185.426c0 126.888 165.939 313.167 173.004 321.035 6.636 7.391 18.222 7.378 24.846 0 7.065-7.868 173.004-194.147 173.004-321.035C441.425 83.182 358.244 0 256 0zm0 278.719c-51.442 0-93.292-41.851-93.292-93.293S204.559 92.134 256 92.134s93.291 41.851 93.291 93.293-41.85 93.292-93.291 93.292z"/>
              </svg>
              {{ post.content.location }}
            </p>

            <span class="Card-cta">Read</span>
          </header>
        </div>
        <div
          v-lazy:background-image="lazyImage"
          v-if="post.content.primaryimage"
          class="Card-image"/>
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
        // return moment(this.post.content.published).format('dddd MMMM D, YYYY');
        return moment(this.post.content.published).format('DD-MM-YYYY');
      },
      tags() {
        return this.post.tag_list ? this.post.tag_list : [];
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
  p, li {
    line-height: 1;
  }

  .Card {
    background: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
    padding: 0;
    margin: 0 10px 24px;
    list-style-type: none;
    overflow: hidden;

    > a:hover {
      text-decoration: none;
    }
  }

  .Card-container {
    display: flex;
    height: 100%;
  }

  .Card-content {
    width: 66%;
    padding: $spacer/2;
    background-color: white;
    z-index: 1;
    position: relative;
  }

  .Card-header {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .Card-date {
    font-size: 14px;
    color: color('primaryColor');
    margin-bottom: 14px;
  }

  .Card-tags-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }

  .Card-tag {
    font-size: 10px;
    padding: 4px 8px;
    margin-right: 8px;
    color: color('light');
    background-color: color('primaryColor');
  }

  .Card-title {
    letter-spacing: 0;
    line-height: 1;
    margin-bottom: 14px;
    padding: 0;
    font-size: 24px;
    color: color('primaryColor');
    text-transform: uppercase;
    
    &:first-line {
      color: color('secondaryColor');
    }
  }

  .Card-author {
    font-size: 16px;
    text-transform: uppercase;
    color: color('primaryColor');
    padding: 0;
    margin-bottom: 36px;
  }

  .Card-cta {
    text-transform: uppercase;
    border: 1px solid color('primaryColor');
    color: color('primaryColor');
    font-size: 12px;
    padding: 12px 34px;
    margin-top: auto;
    align-self: start;
  }

  .card__location-content {
    color: color('primaryColor');
    padding: 0;
    margin-bottom: 36px;

    svg {
      fill: color('primaryColor');
      width: 16px;
    }
  }

  .Card-image {
    position: relative;
    z-index: 0;
    width: 34%;
    background-size: cover;
    background-position: center center;
    filter: blur(15px);
    &[lazy=loaded] {
      filter: blur(0px);
    }
  }

</style>
