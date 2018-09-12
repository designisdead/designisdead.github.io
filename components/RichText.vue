<template>
  <div class="Text" v-editable="blok"
    v-bind:class="{
      'u-textAlignCenter' : blok.textalignment == 'center',
      'u-textAlignRight' : blok.textalignment == 'right'
    }">
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
    props: ['blok'],
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
 p {
   opacity: 0.8;
 }

 a {
   position: relative;
   display: inline-block;
   font-weight: bold;
   &:hover {
     text-decoration: none;
     &:after {
       width: 80%;
       will-change: width;
     }
   }
   &:after {
     content: ' ';
     position: absolute;
     bottom: 0;
     left: 50%;
     height: 2px;
     background: currentColor;
     width: 100%;
     transition: width 0.15s ease-out;
     transform: translateX(-50%);
   }
 }
}
</style>
