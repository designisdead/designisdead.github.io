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
    }
  })
}

export default store
