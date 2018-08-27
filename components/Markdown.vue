<template>
  <div v-html="html" />
</template>

<script>
  import marked    from 'marked';
  import { VNode } from 'vue';

  marked.setOptions({
    renderer:    new marked.Renderer(),
    gfm:         true,
    tables:      true,
    breaks:      true,
    pedantic:    false,
    sanitize:    false,
    smartLists:  true,
    smartypants: false,
    xhtml:       false,
  });

  export default {
    name:    'Markdown',
    data() {
      return {
        html: '',
      };
    },
    methods: {
      createHTML() {
        let text = '';

        if (this.$slots.default) {
          this.$slots.default.forEach(node => {
            text += `${node.text}\n`;
          });
        }

        text = text.trim().replace(/\n /g, '\n');

        this.html = marked(text);
      },
    },
    created() {
      this.createHTML();
    },
    beforeMount() {
      this.createHTML();
    },
  };
</script>
