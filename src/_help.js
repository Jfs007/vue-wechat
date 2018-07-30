import Vue from 'vue';
import Message from './util/message';
let message = new Message();
let { mergeMessage } = message;
Vue.prototype.$mergeMessage = mergeMessage.bind(message);
