import Vuex from 'vuex';
import Vue from 'vue';
import User from './modules/user'
import System from './modules/system'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    [User.modulename]: User,
    [System.modulename]: System
    /* 
     模块 
     userInfo: {
       state: {},
       mutations: {},
       actions: {}
     }
    */
  }
});