import axios from './axios'
import gdConf from '@/conf/gd-conf';
const { GD_KEY, GD_URL } = gdConf;
// 

export let getCity = (params) => {
  return axios.get(GD_URL + '/ip', {
    params: {
      ...params,
      key: GD_KEY
    }
  })
}
export let getWeather = (params) => {
  return axios.get(GD_URL + '/weather/weatherInfo', {
    params: {
      ...params,
      key: GD_KEY
    }
  })
}


