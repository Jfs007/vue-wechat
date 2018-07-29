import router from './index';
import store from '../store/index'
import Vue from 'vue';
router.beforeEach((to, from ,next) => {
  let token = localStorage.getItem('_token');
  let requireSignin = to.meta.requireSignin;
  // 暂时处理凭证
  if (!token && requireSignin) { next({ name: 'login' }); return; };
  if (token && !requireSignin) { 
    next({name: 'messages'}); return;
  };
  store.dispatch('user/online');
  let bar = Vue.prototype.$bar;
  bar.start();
  next();
})
router.afterEach((to, from, next) => {
  let bar = Vue.prototype.$bar;
  bar.finish();
  // next();
})
