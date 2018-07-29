<template lang="pug">
  header.hd-bar.after 
    slot.sec-l( name="sec-l" )
      section.q-avatar.headimg( @click="toggleSlideBar" )
        img( :src="userInfo.avatar" )
    section.bar-title 
      slot
        span {{titleName}}
    section.operation-r 
      slot( name="sec-r") 
</template>
<script>
import {mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
   
  },
  props: {
    titleName: {
      type: String
    }
  },
  methods: {
    ...mapMutations('system', ['toggleSlideBar'])
  }
}
</script>
<style lang="stylus" scoped>
  .hd-bar 
    box-sizing border-box
    z-index 50
    width 100%
    height $hd-bar-height
    top 0 
    left 0
    background-image linear-gradient(20deg, $color-primary, $color-primary-gradient)
    display flex 
    align-items center
    padding 0 $pxTorem(30) 
    position fixed
    justify-content space-between
    color #ffffff
    font-size $pxTorem(44)
    font-weight 100
    .headimg 
      width $pxTorem(94) 
      height $pxTorem(94)
    .bar-title 
      position absolute
      text-align center
      top 50% 
      left 50% 
      transform translate3d(-50%, -50%, 0)
      color #ffffff
      font-weight 100
    .operation-r  
      color #ffffff
      font-weight 100


          

</style>


