/*
  Load site settings.
  F.e: primary navigation
 */
export default function ({store}) {
  if (!store.state.cacheVersion) {
    store.dispatch('loadCacheVersion')
  }
  /*
  // @todo: what's the difference between middleware and nuxtServerInit?
  if (!store.state.employees) {
    store.dispatch('getEmployees');
  }

  if (!store.state.settings.primary_navigation) {
    store.dispatch('loadSettings');
  }
  */
}
