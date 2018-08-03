import axios from './axios'
let prefix = 'api/upload'
let avatarUrl = '/avatar';
let fileUrl = '/file';

let commonHeader = () => ({ 'Content-Type': 'multipart/form-data', _token: localStorage.getItem('_token') });
export let avatarUpload = (params) => {
  return axios.post(prefix + avatarUrl, params, {
    headers: commonHeader()
  })
}
// 图片文件上传
export let fileUpload = (params) => {
  return axios.post(prefix + fileUrl, params, {
    headers: commonHeader()
  })
}


