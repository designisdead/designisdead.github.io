import Vuex from 'vuex';

import settings from './modules/settings';
import employees from './modules/employees';

const store = () => {
  return new Vuex.Store({
    actions: {
      // Prepare the store with data from the server-side
      async nuxtServerInit({dispatch, commit}, {query}) {
        // check if we are in editMode
        await dispatch('loadEditMode', query);

        // load cv, employees and settings
        await dispatch('loadCacheVersion');
        await dispatch('loadSettings');

        await dispatch('getEmployees');
      },
    },
    modules: {
      settings,
      employees,
    }
  })
}

export default store;
