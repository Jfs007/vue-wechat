<template lang="pug">
  div.register
    div.step-line 
      .step-progress( :style="stepStyle")
    page-view   
</template>
<script>
import pageView from '@/components/page-view';
import Store from './store';
import store from '@/store';
export default {
  components: {
    pageView
  },

  data() {
    return {
      
    }
  },
  created() {
    this.registerModule();
  },
  computed: {
    stepStyle() {
      return {
        width: 33.3333*(this.$route.meta.step)+ '%'
      }
    },
    
  },
  methods: {
    // 注册vuex动态模块
    registerModule() {
      store.registerModule(Store.modulename, Store);
    }
  }
}
</script>
<style lang="stylus" >
  .register 
    .step-line 
      height $pxTorem(12) 
      .step-progress
        background $color-primary 
        height 100% 
        transition width 0.25s 
        width 0
  .router-view 
    height 100vh  
</style>


