export default function ({ store }) {
  if(!store.state.employees) {
    return store.dispatch('getEmployees')
  }
}
