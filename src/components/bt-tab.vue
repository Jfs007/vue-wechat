<template lang="pug">
  footer.bt-tab-bar
    
    div.tab-bar( 
      :class="{ 'active': $route.name === 'messages' }"
      @click="$router.push({name: 'messages'})" 
      )
      dot( :num="messageUnRead")  
        span.tab-bar__icon.iconfont.icon-xiaoxi
      div.tab-bar__text 消息
    div.tab-bar( 
      :class="{ 'active': $route.name === 'linkman' }"
      @click="$router.push({name: 'linkman'})" 
      )
      dot( :num="unReadRequest") 
        span.tab-bar__icon.iconfont.icon-yonghu
      div.tab-bar__text 联系人
    div.tab-bar( 
      
      )
      span.tab-bar__icon.iconfont.icon-kan
      div.tab-bar__text 看点  
    div.tab-bar( 
      
      )
      span.tab-bar__icon.iconfont.icon-dongtai2
      div.tab-bar__text 动态    

   
</template>
<script>
import {mapState} from 'vuex'
import dot from '@/components/dot'
export default {
  components: { dot },
  data() {
    return {
      tabs: [
        {
          text: '消息',
          icon: 'icon-xiaoxi',
          link: 'messages'
        },
        {
          text: '联系人',
          icon: 'icon-yonghu',
          link: 'linkman'
        },
        {
          text: '看点',
          icon: 'icon-kandian'
        },
        {
          text: '动态',
          icon: 'icon-dongtai'
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['tempRoomList', 'friendRequest', 'unReadRequest']),
    messageUnRead() {
      let tempRoomList = this.tempRoomList
      if(tempRoomList.length === 0) return 0;
      return tempRoomList.reduce((prev, curr) => {
        return (typeof prev === 'number' ? prev: prev.unread)+ curr.unread;
      }, 0)
    },
    
  }
}
</script>
<style lang="stylus" scoped>
  .bt-tab-bar 
    box-sizing border-box
    width 100%
    position fixed
    bottom 0 
    z-index 40 
    left 0 
    background-color #ffffff
    display flex 
    border-top 1px solid #ececec
    // height $bt-tab-height
    .tab-bar 
      padding $pxTorem(17) 0 $pxTorem(20) 0
      flex 1
      color #8E8E8E
      text-align center
      position relative
      .tab-bar__icon 
        font-size $pxTorem(82)
      .tab-bar__text
        margin-top $pxTorem(11) 
        font-size $pxTorem(30)  
      &.active 
        color $color-primary
        .tab-bar__icon 
          color $color-primary
          font-weight 1000

</style>


