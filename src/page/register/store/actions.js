import { socketEmit } from '@/socket/socket'
export default {
  register({commit, state}) {
    let info = { nickname: state.nickname, password: state.password };
    return socketEmit('register', info).then(_ => {
      commit('setField', {
        name: 'account',
        value: _.data.account
      })
      return Promise.resolve(_)
    }).catch(err => {
      console.log(err, 'err')
      return Promise.reject(err)
    })
  }
}