import settings from './settings'
import employees from './employees'

export default {
  actions: {
    // Prepare the store with data from the server-side
    async nuxtServerInit({dispatch, commit}, { query, req }) {
      // check if we are in editMode
      await dispatch('settings/loadEditMode', { query, req });

      // load cv, employees and settings
      await dispatch('settings/loadCacheVersion');
      await dispatch('settings/loadSettings', { req });

      await dispatch('employees/getEmployees');
    },
  },
  modules: {
    settings,
    employees,
  }
}
