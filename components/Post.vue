<!--
Post.vue
This component is used to render the Post content type on Storyblok
-->
<template>
  <div>
    <main>
      <article class="Post">
        <header
          class="Post-header Wrapper u-backgroundColor--black u-color--light"
          data-parallax="0.5">
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
                    <span v-if="index < tags.length - 1">,</span>
                  </strong> |
                </span>
                <time :datetime="dataTime">{{ formattedDate }}</time>
                <br>
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
            v-lazy:background-image="headerImage"
            class="Post-headerBackground"/>
        </header>
        <div class="Post-content">
          <spacer size="medium"/>

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
              <div
                class="Buttons"
                style="justify-content: center;">
                <nuxt-link
                  :to="'/blog'"
                  class="Button">
                  View all posts
                </nuxt-link>
              </div>
            </wrapper>
          </footer>

          <spacer size="small"/>

          <doormat/>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
  import moment from 'moment';
  import supportsWebP from 'supports-webp';

  export default {
    props: {
      blok: {
        type: Object,
        default: function () {
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
      },
      headerImage() {
        const filters = supportsWebP ? '/filters:format(webp)' : '';
        return this.$options.filters.imageApi({src: this.blok.primaryimage, size: 'large', filters: filters});
      }
    }
  }
</script>

<style lang="scss">
  .Post-header {
    margin-left: -6px; // Why?
    position: relative;
    vertical-align: top;
    height: calc(100vh - 70px);
    @media screen and (min-width: 600px) and (min-height: 600px) {
      height: 50vh;
    }
  }

  .Post-content {
    min-height: 200vh;
    background: white;
    transform: translateZ(0);
    padding: 10px 0;
  }

  .Post-headerContent {
    width: 100%;
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
  }
</style>
