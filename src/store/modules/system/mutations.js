export default {
  toggleSlideBar(state) {
    state.slideBarIsShow = !state.slideBarIsShow
  },
  closeSlideBar(state) {
    state.slideBarIsShow = false;
  },
  openSlideBar(staet) {
    state.slideBarIsShow = true;
  },
  setWeather(state, info) {
    state['weather'] = info;
  },

}