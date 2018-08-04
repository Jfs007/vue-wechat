import Vue from 'vue';
import Message from './util/message';
import { dateFormat } from './util/misc';
let message = new Message();
let { mergeMessage } = message;

const bus = new Vue();

// 合并消息的辅助函数
Vue.prototype.$mergeMessage = mergeMessage.bind(message);
// 时间转化的辅助函数
Vue.prototype.$dateFormat = dateFormat;


Vue.prototype.$bus = bus;







// Vue.filter('tformat', (value) => { return dateFormat(typeof value === 'number' ? new Date(value) : new Date(), 'hh:mm') })
