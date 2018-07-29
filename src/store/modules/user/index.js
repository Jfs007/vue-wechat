import mutations from './mutations'
import state from './state'
import actions from './actions'
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modulename: 'user'
}