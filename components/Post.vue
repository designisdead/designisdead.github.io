<!--
Post.vue
This component is used to render the Post content type on Storyblok
-->
<template>
  <div>
    <main>
      <article class="Post">
        <header class="Post-header Wrapper u-backgroundColor--black u-color--light">
          <div class="Post-headerContent">
            <wrapper size="medium">
              <div class="Title tiny uppercase">
                <span
                  v-if="tags.length > 0"
                  class="Post-tags">
                  <strong
                    v-for="(tag, index) in tags"
                    :key="index">
                    {{ tag }}
                  </strong> |
                </span>
                <time :datetime="dataTime">{{ formattedDate }}</time><br>
              </div>

              <h1 class="Post-title">{{ pagetitle }}</h1>

              <div
                v-if="blok.published"
                class="Title tiny uppercase">
                <author
                  v-if="blok.author"
                  :id="blok.author"/>
              </div>
            </wrapper>
          </div>
          <div
            :style="{ backgroundImage: 'url(' + $options.filters.imageApi(blok.primaryimage, 'large') + ')' }"
            class="Post-headerBackground"/>
        </header>
        <div class="Post-content">
          <spacer size="small"/>

          <div
            v-editable="blok"
            class="page">
            <component
              v-for="blok in blok.body"
              :key="blok._uid"
              :blok="blok"
              :is="blok.component"/>
          </div>

          <footer>
            <wrapper size="medium">
              <nuxt-link :to="'/blog'">View all posts</nuxt-link>
            </wrapper>
          </footer>

          <spacer size="small"/>

          <doormat />
        </div>
      </article>
    </main>


  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    props: {
      blok: {
        type: Object,
        default: function(){
          return {};
        }
      },
      pagetitle: {
        type: String,
        default: 'Design is Dead Blogpost'
      }
    },
    computed: {
      dataTime() {
        return moment(this.blok.published).format('YYYY-MM-DD HH:mm');
      },
      formattedDate() {
        return moment(this.blok.published).format('dddd MMMM D, YYYY');
      },
      fromNow() {
        return moment(this.blok.published).fromNow();
      },
      tags() {
        return this.blok.tags && this.blok.tags.tags ? this.blok.tags.tags : {};
      }
    }
  }
</script>

<style lang="scss">
  $background: #333;
  $scroll-factor : .5;
  .Post {
    height: calc(100vh - 70px);
    perspective: 1px;
    perspective-origin: center top;
    transform-style: preserve-3d;
    overflow-x: hidden;
    // -webkit-overflow-scrolling: touch;
  }

  .Post-header {
    margin-left: -6px; // Why?
    position: relative;
    vertical-align: top;
    transform-origin: center top;
    transform:
      translateZ(-#{$scroll-factor * 2}px)
      scale(1 + $scroll-factor * 2);

    height: calc(100vh - 70px);
    @media screen and (min-width: 600px) and (min-height: 600px)     {
      height: 50vh;
    }
  }

  .Post-content {
    min-height: 200vh;
    background: white;
    transform: translateZ(0);
    padding: 10px 0;
  }

  .Post-headerBackground {
    position: absolute;
    top: 0vh;
    left: 0vw;
    width: 100%;
    height: 100%;
    background-size: cover;
    opacity: 0.4;
    background-position: center center;
    // filter: blur(1px);
  }

  .Post-title {
    font-size: 8vw;
    @media screen and (min-width: 400px) and (min-height: 360px) {
      font-size: 6vw;
    }
    @media screen and (min-width: 600px) and (min-height: 600px) {
      font-size: 2.5rem;
    }
  }
</style>
