const state = () => ({
  primaryNavigation: [],
  cacheVersion: '',
  editMode: false,
  version: 'published',
})

const mutations = {
  setSettings(state, settings) {
    state.primaryNavigation = settings.primary_navigation
  },
  setCacheVersion(state, version) {
    state.cacheVersion = version
  },
  setEditMode(state, editMode) {
    state.editMode = editMode
    state.version = editMode ? 'draft' : 'published'
  },
}

const actions = {
  loadEditMode({ commit }, {query, req}) {
    let isEditMode = false

    if (req.headers.host !== 'designisdead.com') isEditMode = true

    if (query['_storyblok_tk[space_id]']) {
      // const validationString = context.query['_storyblok_tk[space_id]'] + ':AJwMQue3YmvF9GhvSrecTQtt:' + context.query['_storyblok_tk[timestamp]'];
      // const validationToken = crypto.createHash('sha1').update(validationString).digest('hex');
      isEditMode = true
    }

    commit('setEditMode', isEditMode)
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
      commit('setSettings', res.data.story.content)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
