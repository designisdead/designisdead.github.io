<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :pagetitle="story.name"
      :blok="story.content"
      :is="story.content.component"/>
  </section>
</template>

<script>
  import storyblokSettings from '../plugins/storyblokSettings';

  /*
   * Get data for list components
   */
  async function getListContent(listObject, storyApi) {
    return await storyApi.get('cdn/stories', {
      version: storyblokSettings.version,
      cv: storyblokSettings.cv,
      starts_with: listObject.contenttype,
      sort_by: listObject.sortby ? listObject.sortby : 'created_at:desc',
      per_page: listObject.perpage ? listObject.perpage : '50',
      page: '1',
      is_startpage: false, // exclude start pages (fe: blog list)
    }).then(data => {
      return data.data.stories;
    });
  }

  /*
   * Recursively loop through page components (hero, teaser,...)
   * Enrich list component data ~ blogposts, employees,... (for server side rendering)
   */
  async function enrichJsonObject(obj, storyApi) {
    let richObj = [];
    for (var i in obj) {
      // loop trough elements tree
      if (obj[i].hasOwnProperty('elements')) {
        obj.elements = await enrichJsonObject(obj[i].elements, storyApi);
      }
      else if (obj[i].component == 'list') {
        obj[i].listcontent = await getListContent(obj[i], storyApi);
      }
      richObj.push(obj[i]);
    }

    return richObj;
  }

  export default {
    data() {
      return {
        story: {
          content: {}
        }
      }
    },
    created() {
      // Load page slug from the API
      const slug = this.$route.fullPath == '/' || this.$route.fullPath == '' ? '/home' : this.$route.fullPath;
      console.log(`Update content for ${slug}`);
      this.$storyapi.get(`cdn/stories${slug}`, {
        version: storyblokSettings.version,
        cv: storyblokSettings.cv,
      }).then((page) => {
        console.log('page', page);
        if (page.data.story.content.body) {
          var richBody = enrichJsonObject(page.data.story.content.body, this.$storyapi);
          richBody.then((res) => {
            page.data.story.content.body = res;
            console.log('richpage', page);
            this.story = page.data.story;
          });
        }
      });
    },
    mounted() {
      if (typeof this.$storyblok !== 'undefined') {
        this.$storyblok.init();
        this.$storyblok.on(['input', 'published', 'change'], (event) => {
          if (event.action == 'input') {
            if (event.story.id === this.story.id) {
              this.story.content = event.story.content;
            }
          }
          else {
            window.location.reload(true);
          }
        });
      }
    },
    head() {
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
    async asyncData(context) {

      // Load page slug from the API
      const slug = context.route.path == '/' || context.route.path == '' ? '/home' : context.route.path;
      let page = await context.app.$storyapi.get(`cdn/stories${slug}`, {
        version: storyblokSettings.version,
        cv: storyblokSettings.cv,
      }).then((res) => {
        return res.data
      }).catch((res) => {
        context.error({statusCode: res.response.status, message: res.response.data.error})
      });

      if (page && page.story.content.body) {
        page.story.content.body = await enrichJsonObject(page.story.content.body, context.app.$storyapi);
      }

      return page;

    }
  }
</script>
