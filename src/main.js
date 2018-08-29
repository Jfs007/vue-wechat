// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './router/auth'
import './util/rem.js';
import './_help';
import { createAPI, Picker, DatePicker, CascadePicker } from 'cube-ui'
Vue.component(CascadePicker.name, CascadePicker)
createAPI(Vue, Picker, ['select'], true)
createAPI(Vue, CascadePicker, ['select'], false)
createAPI(Vue, DatePicker, ['select'], false)

import { socket } from './socket/socket';


console.notice = function (msg) {
  console.log('%c%s', "color: rgb(115, 182, 133)", msg)
}
socket.on('friendRequest', (res) => {
  console.notice('friendRequest')
  store.dispatch('user/initRequestList');
  store.commit('user/addUnReadrequest');
});
socket.on('agreeFriend', (res) => {
  console.notice('agreeFriend')
  router.push({name: 'messages'});
  store.dispatch('user/initRequestList');
  
})
socket.on('rejectFriend', (res) => {
  console.notice('rejectFriend')
  store.dispatch('user/initRequestList');
  store.commit('user/addUnReadrequest');
  // router.push({name: 'messages'})
})
socket.on('message.private', (info) => {
  console.notice('message.private')
  store.dispatch('user/receiveMessage', { ...info.data, chatType: 'private' })
  // store.dispatch('user/createRoom')
});
socket.on('message.room', (info) => {
  console.notice('message.room')
  store.dispatch('user/receiveMessage', { ...info.data, chatType: 'group' })
})


socket.on('disconnect', () => {
  console.notice('disconnect')
})
socket.on('close', () => {
  console.notice('close');
})
socket.on('offline', (res) => {
  console.notice(`该用户${res.userid}下线了`)
})
socket.on('reconnect', () => {
  console.notice('reconnect')
})







// console.log(browser.versions)
Vue.config.productionTip = false
import FastClick from 'fastclick'
FastClick.attach(document.body);

import ProgressBar from './components/progress-bar.vue'

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
