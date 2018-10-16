/*
  Load site settings.
  F.e: primary navigation
 */
export default function ({ store }) {
  // only load settings (primary navigation etc) on a SSR
  if(process.server) {
    return store.dispatch('loadSettings');
  }
}
