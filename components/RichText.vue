<template>
  <div
    v-editable="blok"
    :class="{
      'u-textAlignCenter' : blok.textalignment == 'center',
      'u-textAlignRight' : blok.textalignment == 'right'
    }"
    class="Text">
    <markdown>{{ blok.richtext }}</markdown>
  </div>
</template>

<script>
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
    mounted() {
      let targets = this.$el.querySelectorAll('code')
      targets.forEach((target) => {
        hljs.highlightBlock(target)
      });
    },
  }
</script>

<style lang="scss">
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
