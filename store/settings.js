const state = () => ({
  primaryNavigation: [],
  cacheVersion: '',
  editMode: false,
  version: 'published'
});

const mutations = {
  setSettings(state, settings) {
    state.primaryNavigation = settings.primary_navigation;
  },
  setCacheVersion(state, version) {
    state.cacheVersion = version;
  },
  setEditMode(state, editMode) {
    state.editMode = editMode;
    state.version = editMode ? 'draft' : 'published';
  },
};

const actions = {
  loadEditMode({ commit }, {query, req}) {
    commit('setEditMode', req.headers.host !== 'designisdead.com');
  },
  async loadCacheVersion({ commit }) {
    await this.$storyapi.get(`cdn/spaces/me`).then((res) => {
      commit('setCacheVersion', process.client ? res.data.space.version : Date.now());
    })
  },
  async loadSettings({ commit }, { req }) {
    await this.$storyapi.get(`cdn/stories/_settings`, {
      version: req.headers.host === 'designisdead.com' ? 'published' : 'draft'
    }).then((res) => {
      commit('setSettings', res.data.story.content);
    })
  }
};

export default {
  state,
  mutations,
  actions
};
