<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :pagetitle="story.name"
      :blok="story.content"
      :is="story.content.component"></component>
  </section>
</template>

<script>
  import moment from 'moment';

  export default {
    data () {
      return { story: { content: {} } }
    },
    mounted () {
      this.$storyblok.init()
      this.$storyblok.on('change', () => {
        location.reload(true)
      })
      this.$storyblok.on('published', () => {
        location.reload(true)
      })
    },
    head () {
      let story = this.story
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
    },
    asyncData (context) {
      // Load the JSON from the API
      return context.app.$storyapi.get(`cdn/stories/${context.params.folder}/${context.params.subslug}`, {
        cv: moment().format('YYYYMMDDHHmm'),
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.error({ statusCode: res.response.status, message: res.response.data })
      })
    }
  }
</script>
