<template>
  <section id="page-home">
    <ul>
      <li v-for="post in pages" :key="post.slug">
        <nuxt-link :to="post.slug">{{ post.name }}</nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    asyncData(context) {
      return context.app.$storyapi.get('cdn/links', {
        version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
      }).then(res => {
        var pages = [];

        for (var key in res.data.links) {
          // skip loop if the property is from prototype
          if (!res.data.links.hasOwnProperty(key)) continue;

          var obj = res.data.links[key];
          if(obj.hasOwnProperty('slug') && obj.slug.substr(0,1) !== '_' && !obj.is_folder) {
            pages.push(obj)
          }
        }

        return {
          pages: pages
        };
      });
    }
  }
</script>
