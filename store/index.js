import Vuex from 'vuex';
import storyblokSettings from '~/plugins/storyblokSettings';

const store = () => {
  return new Vuex.Store({
    state: {
      settings: {},
      employees: {},
      posts: [],
      post: {}
    },
    actions: {
      async nuxtServerInit({ dispatch }) {
        await dispatch('getEmployees');
        await dispatch('loadSettings');
      },
      loadCacheVersion ({ commit }) {
        return this.$storyapi.get(`cdn/spaces/me`).then((res) => {
          commit('setCacheVersion', res.data.space.version)
        })
      },
      async loadSettings({commit}) {
        await this.$storyapi.get(`cdn/stories/_settings`, {
          cv: storyblokSettings.cv,
          version: storyblokSettings.version
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        })
      },
      async getEmployees({commit}) {
        await this.$storyapi.get('cdn/stories', {
          cv: storyblokSettings.cv,
          starts_with: '_employees/',
          per_page: '100',
          version: storyblokSettings.version
        }).then((res) => {
          commit('setEmployees', res.data.stories)
        })
      },
    },
    mutations: {
      setCacheVersion (state, version) {
        state.cacheVersion = version
      },
      setSettings(state, settings) {
        state.settings = settings
      },
      setEmployees: (state, posts) => {
        state.employees = posts
      },
    }
  })
}

export default store
