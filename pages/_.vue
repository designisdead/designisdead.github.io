<template>
  <div>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :pagetitle="story.name"
      :blok="story.content"
      :is="story.content.component"/>
  </div>
</template>

<script>
  import storyblokSettings from "../plugins/storyblokSettings";

  const loadData = function ({api, cacheVersion, errorCallback, version, path}) {
    return api.get(`cdn/stories/${path}`, {
      version: version,
      cv: cacheVersion
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        errorCallback({statusCode: 404, message: 'Failed to receive content form api'})
      } else {
        console.error(res.response.data)
        errorCallback({statusCode: res.response.status, message: res.response.data})
      }
    })
  }


  /*
     * Get data for list components
     */
  async function getListContent(listObject, storyApi) {
    return await storyApi
      .get("cdn/stories", {
        version: storyblokSettings.version,
        cv: storyblokSettings.cv,
        starts_with: listObject.contenttype,
        sort_by: listObject.sortby ? listObject.sortby : "created_at:desc",
        per_page: listObject.perpage ? listObject.perpage : "50",
        page: "1",
        is_startpage: false // exclude start pages (fe: blog list)
      })
      .then(data => {
        let stories = data.data.stories;
        return stories.filter(function (story) {
          return !story.content.hidden;
        });
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
      if (obj[i].hasOwnProperty("elements")) {
        obj.elements = await enrichJsonObject(obj[i].elements, storyApi);
      } else if (obj[i].component == "list") {
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
    mounted() {
      this.$storybridge.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else if (!event.slugChanged) {
          window.location.reload()
        }
      })
    },
    head() {
      const story = this.story;
      return {
        title: story.name,
        meta: [
          {
            hid: `description`,
            name: "description",
            content: story.content.metadescription
          },
          {
            hid: "canonical",
            name: "canonical",
            content: "https://www.designisdead.com" + this.$route.path
          }
        ]
      };
    },
    async asyncData(context) {
      // Check if we are in the editing mode
      let editMode = false

      if (context.query._storyblok || context.isDev || (typeof window !== 'undefined' && window.localStorage.getItem('_storyblok_draft_mode'))) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('_storyblok_draft_mode', '1')
          if (window.location == window.parent.location) {
            window.localStorage.removeItem('_storyblok_draft_mode')
          }
        }

        editMode = true
      }

      // load employees
      /*
      if (!context.store.state.employees) {
        context.store.dispatch('getEmployees');
      }
      */


      let version = editMode ? 'draft' : 'published'
      let path = context.route.path == '/' ? 'home' : context.route.path

      // Load the JSON from the API
      let page = await loadData({
        version: version,
        api: context.app.$storyapi,
        cacheVersion: context.store.state.cacheVersion,
        errorCallback: context.error,
        path: path
      });

      // Enrich list components in body
      if (typeof page.story.content.body !== 'undefined') {
        page.story.content.body = await enrichJsonObject(
          page.story.content.body,
          context.app.$storyapi
        );
      }


      return page;
    }
  }
</script>
