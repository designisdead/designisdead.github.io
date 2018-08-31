/*
  Load site settings.
  F.e: primary navigation
 */
export default function ({ store }) {
  if(process.server && !store.state.settings.primary_navigation) {
    return store.dispatch('loadSettings');
  }
}
