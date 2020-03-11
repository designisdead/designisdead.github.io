import consola from 'consola';

const state = () => ({
  all: {}
})

const mutations = {
  setEmployees: (state, employees) => {
    state.all = employees;
  }
}

const actions = {
  async getEmployees({commit}) {
    await this.$storyapi.get('cdn/stories', {
      cv: this.state.cacheVersion,
      starts_with: '_employees/',
      per_page: '100',
      version: this.state.version
    }).then((res) => {
      consola.info('These are the employees', res.data.stories)
      commit('setEmployees', res.data.stories)
    })
  },
}

export default {
  state,
  mutations,
  actions
};

