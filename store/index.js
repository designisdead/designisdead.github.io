import Vuex from 'vuex';
import editMode from '../middleware/editMode';

const store = () => {
  return new Vuex.Store({
    state: {
      editMode: false,
      version: 'published',
      cacheVersion: '',
      settings: {},
      employees: {},
      posts: [],
      post: {}
    },
    actions: {
      // Prepare the store with data from the server-side
      async nuxtServerInit({dispatch, commit}, context) {
        // check if we are in editMode
        commit('setEditMode', editMode(context));

        // load cv, employees and settings
        await dispatch('loadCacheVersion');
        await dispatch('getEmployees');
        await dispatch('loadSettings');
      },
      loadCacheVersion({commit}) {
        return this.$storyapi.get(`cdn/spaces/me`).then((res) => {
          commit('setCacheVersion', res.data.space.version);
        })
      },
      async loadSettings({commit}) {
        await this.$storyapi.get(`cdn/stories/_settings`, {
          cv: this.state.cacheVersion,
          version: this.state.version
        }).then((res) => {
          commit('setSettings', res.data.story.content)
        })
      },
      async getEmployees({commit}) {
        await this.$storyapi.get('cdn/stories', {
          cv: this.state.cacheVersion,
          starts_with: '_employees/',
          per_page: '100',
          version: this.state.version
        }).then((res) => {
          commit('setEmployees', res.data.stories)
        })
      },
    },
    mutations: {
      setEditMode(state, editMode) {
        state.editMode = editMode;
        state.version = editMode ? 'draft' : 'published';
      },
      setCacheVersion(state, version) {
        state.cacheVersion = version;
      },
      setSettings(state, settings) {
        state.settings = settings;
      },
      setEmployees: (state, employees) => {
        state.employees = employees;
      },
    }
  })
}

export default store
