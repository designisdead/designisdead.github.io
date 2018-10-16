<template>
  <div v-html="html" />
</template>

<script>
  import marked    from 'marked';

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
    mounted() {
      // @todo: only run setInterval when we are in edit mode
      setInterval(() => {
        this.createHTML();
      }, 250);
    },
    created() {
      this.createHTML();
    },
    beforeMount() {
      this.createHTML();
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
  };
</script>
