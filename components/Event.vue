<!--
Event.vue
This component is used to render the Event content type on Storyblok
-->
<template>
  <div>
    <main>
      <article class="Event">
        <header
          class="Event-header Wrapper u-backgroundColor--black u-color--light"
          data-parallax="0.5">
          <div class="Event-headerContent">
            <wrapper size="medium">
              <div class="Title tiny uppercase">
                <span
                  v-if="tags.length > 0"
                  class="Event-tags">
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

              <h1 class="Event-title">{{ pagetitle }}</h1>

              <div
                class="Title tiny uppercase">
                <img src="/location-icon.svg" alt="Location icon" width="16px" style="vertical-align: text-top;">
                <a
                  v-if="hasGoogleMap()"
                  href="#gmapAnchor">{{ blok.content.location }}</a>
                <span v-else>{{ blok.content.location }}</span>
              </div>
            </wrapper>
          </div>
          <div
            v-lazy:background-image="headerImage"
            class="Event-headerBackground"/>
        </header>

        <div class="Event-content">
          <spacer size="medium"/>

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
            <wrapper size="medium">
              <div
                class="Buttons"
                style="justify-content: center;">
                <nuxt-link
                  :to="'/events'"
                  class="Button">
                  View all events
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
    mounted() {
      console.log(this.hasGoogleMap())
    },
    props: {
      blok: {
        type: Object,
        default: function () {
          return {};
        }
      },
      pagetitle: {
        type: String,
        default: 'Design is Dead Events'
      }
    },
    computed: {
      dataTime() {
        return moment(this.blok.content.date).format('YYYY-MM-DD HH:mm');
      },
      formattedDate() {
        return moment(this.blok.content.date).format('dddd MMMM D, YYYY');
      },
      fromNow() {
        return moment(this.blok.content.date).fromNow();
      },
      tags() {
        return this.blok.tag_list ? this.blok.tag_list : [];
      },
      headerImage() {
        const filters = supportsWebP ? '/filters:format(webp)' : '';
        return this.$options.filters.imageApi({src: this.blok.content.primaryimage, size: 'large', filters: filters});
      }
    },
    methods: {
      hasGoogleMap() {
        let hasGoogleMap = false
        this.blok.content.body.forEach(el => {
          el.elements.forEach(subEl => {
            subEl.component === 'googlemap' ? hasGoogleMap = true : null
          })
        })
        return hasGoogleMap
      }
    }
  }
</script>

<style lang="scss">
  .Event-header {
    margin-left: -6px;
    position: relative;
    vertical-align: top;
    height: calc(100vh - 70px);
    @media screen and (min-width: 600px) and (min-height: 600px) {
      height: 50vh;
    }
  }

  .Event-content {
    min-height: 200vh;
    background: white;
    transform: translateZ(0);
    padding: 10px 0;
  }

  .Event-headerContent {
    width: 100%;
  }

  .Event-headerBackground {
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
