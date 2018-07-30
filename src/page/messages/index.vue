<template lang="pug">
  div.messages 
    hd-bar.messages-hd-bar( title-name="消息" )
      div( slot="sec-r" )
        span.iconfont.icon-tianjiajia
    div.messages-wrap
      cube-scroll.messages-main( :options="options") 
        div.messages-bscroll 
          div.find-friend 
            button.find-btn 搜索
          ul.message-list 
            li.message-item( v-for="(room, index) in tempRoomList ", @click="toChatRoom(room, index)", v-if="room.info&&room.isActive") 
              div.q-avatar.headimg
                img( :src="room.info.avatar")
              div.message-info
                .message-top.clearfix
                  div.message-fromer.fl {{room.info.nickname}}
                  div.message-time.fr {{newestMsg(room, index).createAt| tformat }}
                .message-bottom    
                  p.message-content.text_ellipsis.fl {{newestMsg(room).content }}
                  dot.fr( :num="room.unread", v-show="room.unread>0")
    bt-tab              
</template>
<script>
import hdBar from '@/components/hd-bar'
import btTab from '@/components/bt-tab'
import dot from '@/components/dot'
import { socketEmit } from '@/socket/socket'
import { mapState, mapMutations } from 'vuex'
import tempRoom from '@/components/tempRoom'
import { Scroll } from 'cube-ui'
export default {
  components: {
    hdBar,
    dot,
    btTab,
    tempRoom,
    cubeScroll: Scroll
  },
  data() {
    return {
      friendList: [],
      options: {
        pullDownRefresh: {
          threshold: 50,
          stop: 0
        }
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo', 'tempRoomList'])
  },
  mounted() {
  },
  created() {
  },
  methods: {
   ...mapMutations('user', ['changeRoom']),
   toChatRoom(room, index) {
     this.changeRoom(index);
     this.$router.push({
       name: 'chat',
       params: {
        id: room.id
       }
       
     })
   },
   newestMsg(room, index) {
    let _last = room.chatRecords.length-1;
    return room.chatRecords[_last] || {};
   },
  //  msgExe
   
  }
}
</script>

<style lang="stylus" scoped>
.messages-wrap 
  padding-top $hd-bar-height
.messages-main
  background #323232
  height $calc(100vh- ($hd-bar-height + $bt-tab-height))
  .messages-bscroll 
    background #ffffff
    height 101vh
  .find-friend 
    padding $pxTorem(20) $pxTorem(26) 
    .find-btn  
      border none
      width 100% 
      text-align center 
      padding $pxTorem(16) 0
      border-radius 4px 
      background-color #f3f3f3 
      color #c9c8cd
      outline none
      font-size $pxTorem(35)
  .message-list  
    .message-item 
      align-items center
      padding $pxTorem(26) $pxTorem(26)
      border-bottom 1px solid #e1e1e1
      display flex
      box-sizing border-box
      .headimg 
        height $pxTorem(122) 
        width $pxTorem(122) 
      .message-info
         flex 1
         margin-left $pxTorem(20) 
         margin-right $pxTorem(12)
        .message-top 
          margin-bottom $pxTorem(16)  
          .message-fromer 
            font-size $pxTorem(40)
          .message-time 
            color #7f7f7f 
        .message-bottom
          .message-content 
            width $pxTorem(489)
            color #7f7f7f
       
             


</style>
