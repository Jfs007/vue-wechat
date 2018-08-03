import Vue from 'vue';
import Message from './util/message';
import { dateFormat } from './util/misc';
let message = new Message();
let { mergeMessage } = message;
Vue.prototype.$mergeMessage = mergeMessage.bind(message);
Vue.prototype.$dateFormat = dateFormat;


Vue.filter('tformat', (value) => { return dateFormat(typeof value === 'number' ? new Date(value) : new Date(), 'hh:mm') })
