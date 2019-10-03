import settings from './settings';
import employees from './employees';

export default {
  actions: {
    // Prepare the store with data from the server-side
    async nuxtServerInit({dispatch, commit}, { query, req }) {
      // check if we are in editMode
      dispatch('settings/loadEditMode', { query, req });

      // load cv, employees and settings
      dispatch('settings/loadCacheVersion');
      await dispatch('employees/getEmployees');
    },
  },
  modules: {
    settings,
    employees
  }
}
