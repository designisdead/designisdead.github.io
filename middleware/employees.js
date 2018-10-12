export default function ({ store }) {
  if(process.server && !store.state.employees) {
    return store.dispatch('getEmployees')
  }
}
