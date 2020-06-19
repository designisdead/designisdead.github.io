<!--
Post.vue
This component is used to render the Post content type on Storyblok
-->
<template>
  <div>
    <main>
      <article class="Post">
        <header class="Post-header">
          <wrapper
            size="large"
            :backgroundIsInShrinked=true
            class="Post-headerContent__background-wrapper"
            :blok="{
              layout: 'shrinked',
              backgroundimage: blok.content.primaryimage,
              backgroundposition: blok.content.primaryimageposition,
              backgroundsize: 'cover',
            }"
          />
          <wrapper
            size="large"
            class="Post-headerContent__wrapper"
            :blok="{ layout: 'shrinked', backgroundcolor: 'u-backgroundColor--textLight' }"
          >
            <div class="Post-headerContent">
              <div class="Title tiny uppercase">
                <span
                  v-if="tags.length > 0"
                  class="Post-tags-container">
                  <span
                    v-for="(tag, index) in tags"
                    :key="index"
                    class="Post-tag">
                    {{ tag }}
                  </span>
                </span>

                <time class="Post-date" :datetime="dataTime">{{ formattedDate }}</time>
              </div>

              <h1 class="Post-title">{{ pagetitle }}</h1>

              <p
                v-if="blok.content.published && blok.content.author"
                class="Post-author">
                <author :id="blok.content.author" :portrait="false" />
              </p>
            </div>
          </wrapper>
        </header>
        <div class="Post-content">
          <div
            v-editable="blok"
            class="page">
            <component
              v-for="blok in blok.content.body"
              :key="blok._uid"
              :blok="blok"
              :is="blok.component"/>
          </div>

          <footer>
            <wrapper
              size="medium"
              :blok="{
                backgroundcolor: 'u-backgroundColor--textLight',
                layout: 'shrinked'
              }"
            >
              <div
                class="Buttons"
                style="justify-content: center;">
                <nuxt-link
                  :to="'/blog'"
                  class="Button outlinePrimary">
                  &#8592; To all blogs
                </nuxt-link>
              </div>
            </wrapper>
          </footer>

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
        return moment(this.blok.content.published).format('YYYY-MM-DD HH:mm');
      },
      formattedDate() {
        // return moment(this.blok.content.published).format('dddd MMMM D, YYYY');
        return moment(this.blok.content.published).format('DD-MM-YYYY');
      },
      fromNow() {
        return moment(this.blok.content.published).fromNow();
      },
      tags() {
        return this.blok.tag_list ? this.blok.tag_list : [];
      },
    }
  }
</script>

<style lang="scss">
  .Post {
    padding-top: 120px;

    p, li {
      line-height: 1;
    }
  }

  .Post-header {
    position: relative;
    vertical-align: top;
  }

  .Post-headerContent__background-wrapper {
    height: 300px;
  }

  .Post-headerContent__wrapper {
    > .Wrapper {
      padding: 0;
    }
  }

  .Post-headerContent {
    width: 100%;
    background: color('snowColor');
    padding: 20px 24px;
    margin-top: -100px;
  }

  .Post-tags-container {
    margin-bottom: 14px;
  }

  .Post-tag {
    font-size: 10px;
    padding: 4px 8px;
    margin-right: 8px;
    color: color('light');
    background-color: color('primaryColor');
  }

  .Post-date {
    font-size: 14px;
    color: color('primaryColor');
    margin-bottom: 14px;
  }

  .Post-title {
    letter-spacing: 0;
    line-height: 1;
    margin-bottom: 14px;
    padding: 0 90px;
    font-size: 40px;
    text-align: center;
    color: color('secondaryColor');
    text-transform: uppercase;
    
    &:first-line {
      color: color('primaryColor');
    }
  }

  .Post-author {
    font-size: 16px;
    text-transform: uppercase;
    color: color('primaryColor');
    padding: 0;

    span {
      margin: 0 auto;
    }
  }

  .Post-content {
    background: color('primaryColor');
  }

  @media screen and (max-width: size('smedium')) {
    .Post {
      padding-top: 0;
    }
    
    .Post-title {
      font-size: 37px;
    }
  }

  @media screen and (max-width: size('medium')) {
    .Post-title {
      padding: 0;
    }
  }
</style>
