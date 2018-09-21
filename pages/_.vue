<template>
  <section v-if="Page">
    <component
      v-if="Page.story.content.component"
      :key="Page.story.content._uid"
      :pagetitle="Page.story.name"
      :blok="Page.story.content"
      :is="Page.story.content.component"/>
  </section>
</template>

<script>
  export default {
    computed: {
      Page() {
        return this.$store.state.post[this.$route.fullPath];
      },
    },
    mounted() {
      if (typeof this.$storyblok !== 'undefined') {
        this.$storyblok.init();
        this.$storyblok.on(['input', 'published', 'change'], (event) => {
          if (event.action == 'input') {
            if (event.story.id === this.Page.story.id) {
              this.Page.story.content = event.story.content;
            }
          }
          else {
            this.$store.dispatch('getPost', this.$route.fullPath);
          }
        });
      }
    },
    head() {
      if(typeof this.Page !== 'undefined') {
        let story = this.Page.story
        return {
          title: story.name,
          meta: [
            {
              hid: `description`,
              name: 'description',
              content: story.content.metadescription
            }, {
              hid: 'canonical',
              name: 'canonical',
              content: 'https://www.designisdead.com' + this.$route.path
            },
          ]
        }
      }
      else {
        return {}
      }
    },
    async asyncData(context) {
      return await context.store.dispatch('getPost', context.route.path)
        .catch(() => {
          // @todo: find a way to return the correct statusCode & message
          // getting an error on createError in axios
          context.error({statusCode: '404', message: 'Page not found'})
        });
    },
  }
</script>
