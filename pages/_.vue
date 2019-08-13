<template>
  <div>
    <component
      v-if="story.content.component === 'event' || story.content.component === 'post'"
      :key="story.content._uid"
      :pagetitle="story.name"
      :blok="story"
      :is="story.content.component"
    />

    <component
      v-else
      :key="story.content._uid"
      :pagetitle="story.name"
      :blok="story.content"
      :is="story.content.component"
    />
  </div>
</template>

<script>
const loadData = function({ api, cacheVersion, errorCallback, version, path }) {
  return api
    .get(`cdn/stories/${path}`, {
      version: version,
      cv: cacheVersion
    })
    .then(res => {
      return res.data;
    })
    .catch(res => {
      if (!res.response) {
        errorCallback({
          statusCode: 404,
          message: "Failed to receive content from api"
        });
      } else {
        errorCallback({
          statusCode: res.response.status,
          message: res.response.statusText
        });
      }
    });
};

/*
 * Recursively loop through page components (hero, teaser,...)
 * Enrich list component data ~ blogposts, employees,... (for server side rendering)
 */
const enrichJsonObject = async function({
  elements,
  api,
  version,
  cacheVersion,
  errorCallback
}) {
  let richObj = [];

  for (var i in elements) {
    // loop trough elements tree
    if (elements[i].hasOwnProperty("elements")) {
      elements.elements = await enrichJsonObject({
        elements: elements[i].elements,
        api,
        version,
        cacheVersion,
        errorCallback
      });
    } else if (elements[i].component == "list") {
      elements[i].listcontent = await getListContent({
        elements: elements[i],
        api,
        version,
        cacheVersion,
        errorCallback
      });
    }
    richObj.push(elements[i]);
  }

  return richObj;
};

/*
 * Get data for list components
 */
const getListContent = async function({
  elements,
  api,
  version,
  cacheVersion
}) {
  console.log(elements.contenttype)
  return await api
    .get("cdn/stories", {
      version: version,
      cv: cacheVersion,
      starts_with: elements.contenttype,
      sort_by: elements.sortby ? elements.sortby : "created_at:desc",
      per_page: elements.perpage ? elements.perpage : "50",
      page: "1",
      is_startpage: false // exclude start pages (fe: blog list)
    })
    .then(data => {
      let stories = data.data.stories;
      return stories.filter(function(story) {
        return !story.content.hidden;
      });
    });
};

export default {
  data() {
    return {
      story: {
        content: {}
      }
    };
  },
  mounted() {
    this.$ga.require('GTM-5GFQJ4N'); //add google optimize
    this.$storybridge.on(["input", "published", "change"], event => {
      if (event.action == "input") {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content;
        }
      } else if (!event.slugChanged) {
        window.location.reload();
      }
    });
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
          content: "https://designisdead.com" + this.$route.path
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://designisdead.com" + this.$route.path
        },
        {
          hid: "og:image",
          property: "og:image",
          content: story.content.primaryimage || "/default.jpg"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: story.name
        },
        {
          hid: "og:description",
          property: "og:description",
          content: story.content.metadescription
        }
      ]
    };
  },
  async asyncData(context) {
    let path = context.route.path == "/" ? "home" : context.route.path;

    // Load the JSON from the API
    let page = await loadData({
      // version: context.store.state.settings.version,
      version: context.isDev ? 'draft' : 'published',
      api: context.app.$storyapi,
      cacheVersion: context.store.state.settings.cacheVersion,
      errorCallback: context.error,
      path: path
    });

    if (page) {
      // Enrich list components in body
      if (typeof page.story.content.body !== "undefined") {
        page.story.content.body = await enrichJsonObject({
          elements: page.story.content.body,
          api: context.app.$storyapi,
          version: context.store.state.settings.version,
          cacheVersion: context.store.state.settings.cacheVersion,
          errorCallback: context.error
        });
      }

      return page;
    }
  }
};
</script>
