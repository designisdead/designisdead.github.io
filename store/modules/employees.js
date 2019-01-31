const employees = {
  state: {
    all: {}
  },
  mutations: {
    setEmployees: (state, employees) => {
      state.all = employees;
    }
  },
  actions: {
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
  }
}

export default employees;
