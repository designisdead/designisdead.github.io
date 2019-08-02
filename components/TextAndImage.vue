<template>
  <div class="TextAndImage" v-editable="blok">
    <!-- Image -->
    <figure
      class="TextAndImage-figure"
      :class="{
        'TextAndImage-figure--left' : blok.alignment === 'left',
        'TextAndImage-figure--right' : blok.alignment === 'right',
      }">
      <div
        class="TextAndImage-imageWrapper"
      >
        <img
          v-lazy="lazyImage"
          :width="blok.width"
          :height="blok.height === '' ? 'auto' : blok.height"
          :alt="blok.alt"
          :title="blok.alt"
          class="TextAndImage-image"
        />
      </div>
      <figcaption
        v-if="blok.title"
        class="TextAndImage-caption">
        {{ blok.title }}
      </figcaption>
    </figure>

    <!-- Rich Text -->
    <div
      :class="{
        'u-textAlignCenter' : blok.textalignment == 'center',
        'u-textAlignRight' : blok.textalignment == 'right'
      }"
      class="TextAndImage-text">
      <markdown>{{ blok.richtext }}</markdown>
    </div>
  </div>
</template>

<script>
  import supportsWebP from 'supports-webp';
  import hljs from 'highlight.js/lib/highlight';
  import config from '~/plugins/config';

  config.allowedLanguagesForHighlightJS.forEach((langName) => {
    // Using require() here because import() support hasn't landed in Webpack yet
    const langModule = require(`highlight.js/lib/languages/${langName}`);
    hljs.registerLanguage(langName, langModule);
  });

  export default {
    props: {
      blok: {
        type: Object, default: function () {
          return {}
        }
      }
    },
    computed: {
      lazyImage() {
        /*
          * If webp is supported by the client, serve a large webp image
          * https://www.storyblok.com/docs/image-service
          */
        const filters = supportsWebP ? '/filters:format(webp)' : '';
        return this.$options.filters.imageApi({src: this.blok.image, size: '', filters: filters});
      },
    },
    mounted() {
      let targets = this.$el.querySelectorAll('code')
      targets.forEach((target) => {
        hljs.highlightBlock(target)
      });
    },
  }
</script>

<style lang="scss">
  .TextAndImage-image {
    max-width: 100%;
    margin-bottom: 20px;
    @media screen and (max-width: size('medium')-1) {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  @media screen and (min-width: size('medium')) {
    .TextAndImage-figure--left {
      float: left;
      margin-right: 30px;
    }

    .TextAndImage-figure--right {
      float: right;
      margin-left: 30px;
    }
  }

  .TextAndImage-imageWrapper {
    display: flex;
    align-items: center;
  }

  .TextAndImage-imageWrapper::after {
    content: "";
    clear: both;
    display: table;
  }

  .TextAndImage-caption {
    display: block;
    text-align: center;
    font-size: 0.85rem;
    font-style: italic;
    padding-top: $spacer/4;
  }

  .Text {
    a {
      position: relative;
      display: inline-block;
      font-weight: bold;
      will-change: color;
      transition: 0.25s ease-out color;
      text-decoration: none;
      &:hover {
        color: (blue);
      }
    }
  }
</style>
