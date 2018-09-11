import Vuex from 'vuex';
import moment from 'moment';


import storyblokSettings from '~/plugins/storyblokSettings';

const store = () => {
  return new Vuex.Store({
    state: {
      settings: {},
      posts: [],
      post: {}
    },
    actions: {
      /*
      async nuxtServerInit ({commit}, context) {
        if(process.server) {
          // Load page slug from the API
          const slug = context.route.path == '/' || context.route.path == '' ? '/home' : context.route.path;
          console.log(`${slug} is a valid slug. Rendering page from nuxtServerInit`)
          return await context.app.$storyapi.get(`cdn/stories${slug}`, {
            cv: moment().format('YYYYMMDDHHmm'),
            version: process.env.NODE_ENV == 'production' ? 'published' : 'draft',
          }).then((res) => {
            return res.data
          }).catch((res) => {
            context.error({ statusCode: res.response.status, message: res.response.data.error })
          });
        }
      },
      */
      async loadSettings ({ commit }) {
        return this.$storyapi.get(`cdn/stories/_settings`, {
          cv: storyblokSettings.cv,
          version: storyblokSettings.version
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        })
      },

      async getEmployees ({commit}) {
        if(process.server) {
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

      async getPosts ({commit}) {
        if(process.server) {
          return this.$storyapi.get('cdn/stories', {
            cv: storyblokSettings.cv,
            starts_with: 'blog/',
            version: 'draft'
          }).then((res) => {
            commit('setPosts', res.data.stories)
          })
        }
      },

      async getPost ({commit}, id) {
        const post = await this.$storyapi.get('cdn/stories/blog/${id}', {
          cv: storyblokSettings.cv,
          version: storyblokSettings.version
        })
        commit('setPost', post.data.story)
      },
    },
    mutations: {
      setSettings (state, settings) {
        console.log('SET SETTINGS')
        state.settings = settings
      },
      setEmployees: (state, posts) => {
        console.log('SET EMPLOYEES')
        state.employees = posts
      },
      setPosts: (state, posts) => {
        state.posts = posts
      },
      setPost: (state, post) => {
        state.post = post
      },
    }
  })
}

export default store
