import settings from './settings';
import employees from './employees';

export default {
  actions: {
    // Prepare the store with data from the server-side
    async nuxtServerInit({dispatch, commit}, {query}) {
      // check if we are in editMode
      await dispatch('settings/loadEditMode', query);

      // load cv, employees and settings
      await dispatch('settings/loadCacheVersion');
      await dispatch('settings/loadSettings');

      await dispatch('employees/getEmployees');
    },
  },
  modules: {
    settings,
    employees,
  }
}
