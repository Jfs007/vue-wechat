import axios from 'axios';
axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
  return config;
}, err => {
  return Promise.reject(err);
});
export default axios;
