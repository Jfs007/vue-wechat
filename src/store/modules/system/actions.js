import { getCity, getWeather } from '@/api/gdmap.js'
export default {
  async setWeather({commit}, params) {
    let rs = await getCity(params);
    let city = rs.data;
    let weatherrs = await getWeather({
      city: city.adcode,
      extensions: 'base'
    });
    commit('setWeather', weatherrs.data.lives[0]);
  }
}