import axios from './axios'
let prefix = 'api/upload'
let avatarUrl = '/avatar';

export let avatarUplad = (params) => {
  return axios.post(prefix + avatarUrl, params, {
    headers: { 'Content-Type': 'multipart/form-data', _token: localStorage.getItem('_token') }
  })
}


