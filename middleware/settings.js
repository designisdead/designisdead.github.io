/*
  Load site settings.
  F.e: primary navigation
 */
export default function ({ store }) {
  if(process.server && !store.state.settings) {
    return store.dispatch('loadSettings');
  }
}
