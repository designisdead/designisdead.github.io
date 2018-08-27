<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :pagetitle="story.name"
      :blok="story.content"
      :is="story.content.component" />
  </section>
</template>

<script>
import moment from 'moment';
import storyblokSettings from '~/plugins/storyblokSettings';

export default {
  data () {
    return {
      story: {
        content: {}
      }
    }
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
  async asyncData (context) {

    /*
     * Get data for list components
     */
    async function getListContent(listObject) {
      console.log('listObject');
      // console.log(listObject);
      return await context.app.$storyapi.get('cdn/stories' , {
        version: storyblokSettings.version,
        cv: storyblokSettings.cv,
        starts_with: listObject.contenttype,
        sort_by: listObject.sortby ? listObject.sortby : 'created_at:desc',
        per_page: listObject.perpage ? listObject.perpage : '50',
        page: '1',
        is_startpage: false, // exclude start pages (fe: blog list)
      }).then(data => {
        // console.log(`${moment().format('YYYYMMDDHHmm')}: Get list content for ${listObject.contenttype}`);
        return data.data.stories;
      });
    }

    /*
     * Recursively loop through page components (hero, teaser,...)
     * Enrich list component data ~ blogposts, employees,... (for server side rendering)
     */
    async function enrichJsonObject(obj) {
      let richObj = [];
      for(var i in obj) {
        // loop trough elements tree
        if(obj[i].hasOwnProperty('elements')) {
          obj.elements = await enrichJsonObject(obj[i].elements);
        }
        else if(obj[i].component == 'list'){
          obj[i].listcontent = await getListContent(obj[i]);
        }
        richObj.push(obj[i]);
      }

      return richObj;
    }

    // Load page slug from the API
    const slug = context.params.slug ? context.params.slug : '/home';
    let page = await context.app.$storyapi.get(`cdn/stories/${slug}`, {
      cv: moment().format('YYYYMMDDHHmm'),
      version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    });

    page.story.content.body = await enrichJsonObject(page.story.content.body);

    return page;
  }
}
</script>
