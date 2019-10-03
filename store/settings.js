const state = () => ({
  primaryNavigation: [
    {title: 'Blog', link: 'blog'},
    {title: 'Services', link: 'services'},
    {title: 'Technologies', link: 'technologies'},
    {title: 'Team', link: 'team'},
    {title: 'Jobs', link: 'jobs'}
  ],
  cacheVersion: '',
  editMode: false,
  version: 'published'
});

const mutations = {
  setCacheVersion(state, version) {
    state.cacheVersion = version;
  },
  setEditMode(state, editMode) {
    state.editMode = editMode;
    state.version = editMode ? 'draft' : 'published';
  },
};

const actions = {
  loadEditMode({commit}, {query, req}) {
    commit('setEditMode', req.headers.host !== 'designisdead.com');
  },
  async loadCacheVersion({commit}) {
    await this.$storyapi.get(`cdn/spaces/me`).then((res) => {
      commit('setCacheVersion', process.client ? res.data.space.version : Date.now());
    })
  }
};

export default {
  state,
  mutations,
  actions
};
