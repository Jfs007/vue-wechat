<template lang="pug">
  transition(
    :name="transitionName", v-on:before-enter="beforeEnter", v-bind:css="bindCss" )
    router-view.page-view 
</template>
<script>

let transition_prefix = 'page-view-';
import {mapMutations, mapState} from 'vuex'
export default {
  data() {
    return {
      transitionName: transition_prefix+ 'fade',
      bindCss: true
    }
  },
  props: {
    transition: '',

  },
  computed: {
    ...mapState('system', ['slideBarIsShow'])
  },
  created() {
    if(this.transition) {
      this.transitionName = this.transition;
    }
  },
  watch: {
    $route(to, from) {
      // 没有关闭侧边栏 就不启用css 
      this.bindCss = !this.slideBarIsShow;
      if(this.transition) { this.transitionName = this.transition; return; };
      // 不存在page属性的时候( 表示非级 ) 效果为淡入淡出
      if(!('page' in to.meta)&&!('page' in from.meta)) {
        this.transitionName = transition_prefix+ 'fade';  return;
      };
      if(to.meta.tier > from.meta.tier){
        //设置动画名称
        this.transitionName = transition_prefix+ 'in';
      }else{
        this.transitionName = transition_prefix+ 'out';;
      };
    }
  },
  mounted() {
   
  },
  methods: {
    ...mapMutations('system', ['closeSlideBar']),
    beforeEnter() {
      this.closeSlideBar();
    },
    
  }
}
</script>

<style lang="stylus" scoped>
  // 样式
  .page-view 
    width 100vw
    animation-duration .45s
    position relative
    height 100vh
    font-size $pxTorem(35)
    
  // 淡入淡出 动画  
  .page-view-fade-enter-active, .page-view-fade-leave-active  
    transition opacity 0.45s;
    position absolute
    left 0
    top 0
  .page-view-fade-enter,
  .page-view-fade-leave-to
    opacity 0
  // 滑入滑出 动画  
  .page-view-out-enter-active,
  .page-view-out-leave-active,
  .page-view-in-enter-active,
  .page-view-in-leave-active 
    will-change transform
    height 100%
    position absolute
    left 0
    opacity 1
  .page-view-out-enter-active 
    animation-name viewInLeft
  .page-view-out-leave-active 
    animation-name viewOutRight
  .page-view-in-enter-active 
    animation-name viewInRight
  .page-view-in-leave-active 
    animation-name viewOutLeft
  @keyframes viewInLeft 
    from 
      opacity 0
      left -100%
      // transform translate3d(-100%, 0, 0)
    to 
      opacity 1
      left 0
      // transform translate3d(0, 0, 0)
  @keyframes viewOutLeft 
    from 
      opacity 1
    to 
      opacity 0
      left -100%
      // transform translate3d(-100%, 0, 0)
  @keyframes viewInRight 
    from 
      opacity 0
      left 100%
      // transform translate3d(100%, 0, 0)
    to 
      opacity 1
      left 0
      // transform translate3d(0, 0, 0)
  @keyframes viewOutRight 
    from 
      opacity 1
    to 
      opacity 0
      left 100%
      // transform translate3d(100%, 0, 0)
</style>
