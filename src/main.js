// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './router/auth'
import './util/rem.js';
import './_help';
import { dateFormat } from './util/misc';
import { createAPI, Picker, DatePicker, CascadePicker, Sticky } from 'cube-ui'

console.log(Sticky.Ele, 'CubeSticky')
Vue.component(CascadePicker.name, CascadePicker)
createAPI(Vue, Picker, ['select'], true)
createAPI(Vue, CascadePicker, ['select'], false)
createAPI(Vue, DatePicker, ['select'], false)

import { socket } from './socket/socket';

console.notice = function (msg) {
  console.log('%c%s', "color: rgb(115, 182, 133)", msg)
}
socket.on('friendRequest', (res) => {
  console.notice('friend')
  store.dispatch('user/initRequestList');
  store.commit('user/addUnReadrequest');
});
socket.on('agreeFriend', (res) => {
  router.push({name: 'messages'});
  
  
})
socket.on('rejectFriend', (res) => {
  store.dispatch('user/initRequestList');
  store.commit('user/addUnReadrequest');
  // router.push({name: 'messages'})
})
socket.on('message', (info) => {
  console.notice('message')
  store.dispatch('user/newPrivateMessage', info.data)
  // store.dispatch('user/createRoom')
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

import ProgressBar from './components/progressBar.vue'

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)


Vue.filter('tformat', (value) => { return dateFormat(typeof value === 'string' ? new Date(value) : new Date(), 'hh:mm')})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
