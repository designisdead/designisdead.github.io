export default function ({ store }) {
  if(process.server) {
    return store.dispatch('getEmployees')
  }
}
