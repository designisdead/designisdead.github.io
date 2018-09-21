import Vue from 'vue';
import Vuex from 'vuex';
import storyblokSettings from '~/plugins/storyblokSettings';


const store = () => {
  return new Vuex.Store({
    state: {
      settings: {},
      posts: [],
      post: {}
    },
    actions: {
      async getPost(context, slug) {
        if(slug == '/') {
          slug = '/home'
        }

        var page = await this.$storyapi.get(`cdn/stories${slug}`, {
          cv: storyblokSettings.cv,
          version: storyblokSettings.version,
        }).then(res => {
          return res.data
        });

        let getListContent = (obj) => {
          // console.log(`Get ${obj.perpage} items for ${obj.contenttype}`);
          return this.$storyapi.get('cdn/stories', {
            version: storyblokSettings.version,
            cv: storyblokSettings.cv,
            starts_with: obj.contenttype,
            sort_by: obj.sortby ? obj.sortby : 'created_at:desc',
            per_page: obj.perpage ? obj.perpage : '50',
            page: '1',
            is_startpage: false, // exclude start pages (fe: blog list)
          }).then((res) => {return res.data.stories});
        }

        const tasks = [];
        let enrichJsonObject = (obj) => {
          let richObj = [];
          for (var i in obj) {
            // loop trough elements tree
            if (obj[i].hasOwnProperty('elements')) {
              // console.log('has child elements');
              obj[i].elements = enrichJsonObject(obj[i].elements);
            }
            else if (obj[i].component == 'list') {
              obj[i].listcontent = 'listcontent_' + i;
              // console.log(`List found: get ${obj[i].contenttype}`, obj[i])
              tasks.push(getListContent(obj[i]));
            }
            richObj.push(obj[i]);
          }

          return richObj;
        }
        page.story.content.body = enrichJsonObject(page.story.content.body);

        let findAndReplace = (obj, stories) => {
          let richObj = [];
          for (var i in obj) {
            // loop trough elements tree
            if (obj[i].hasOwnProperty('elements')) {
              obj[i].elements = findAndReplace(obj[i].elements, stories);
            }
            else if (obj[i].component == 'list') {
              obj[i].listcontent = stories;
            }
            richObj.push(obj[i]);
          }
          return richObj;
        }

        return Promise.all(tasks).then(results => {
          // loop trough all lists on a page
          for(var i in results) {
            // console.log(results[i])
            page.story.content.body = findAndReplace(page.story.content.body, results[i]);
          }

          if(slug == '/home') {
            slug = '/'
          }

          context.commit('setPost', {
            slug: slug,
            content: page
          });

          return page;
        });
      },
      async loadSettings({commit}) {
        return this.$storyapi.get(`cdn/stories/_settings`, {
          cv: storyblokSettings.cv,
          version: storyblokSettings.version
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        })
      },
      async getEmployees({commit}) {
        if (process.server) {
          return this.$storyapi.get('cdn/stories', {
            cv: storyblokSettings.cv,
            starts_with: '_employees/',
            per_page: '100',
            version: storyblokSettings.version
          }).then((res) => {
            commit('setEmployees', res.data.stories)
          })
        }
      },
    },
    mutations: {
      setPost(state, post) {
        state.post[post.slug] = post.content
      },
      setSettings(state, settings) {
        console.log('SET SETTINGS')
        state.settings = settings
      },
      setEmployees: (state, employees) => {
        console.log('SET EMPLOYEES')
        state.employees = employees
      },
    }
  })
}

export default store
