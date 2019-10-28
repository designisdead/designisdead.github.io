const state = () => ({
  primaryNavigation: [
    {title: 'Blog', link: 'blog'},
    // To add later
    // {title: 'Events', link: 'events'},
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
  loadCacheVersion({commit}) {
    commit('setCacheVersion', Math.floor(new Date() / 60000) * 60000);
  }
};

export default {
  state,
  mutations,
  actions
};
