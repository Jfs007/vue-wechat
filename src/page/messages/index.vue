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
          div.message-list
            active-room-item(
              :key="room.id",
              v-for="(room, index) in tempRoomList ", 
              :room="room",
              @click.native="toChatRoom(room, index)",
              v-if="room.info&&room.isActive" )  
    bt-tab              
</template>
<script>
import hdBar from '@/components/hd-bar'
import btTab from '@/components/bt-tab'

import activeRoomItem from '@/components/activeRoomItem';
import { socketEmit } from '@/socket/socket'
import { mapState, mapMutations } from 'vuex'
import tempRoom from '@/components/tempRoom'
import { Scroll } from 'cube-ui'
export default {
  components: {
    hdBar,
    btTab,
    tempRoom,
    activeRoomItem,
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
     let roomType = room.chatType;
     this.changeRoom(index);
     this.$router.push({
       name: 'chat',
       params: {
        id: room.id
       },
       query: {
         roomType
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
  height calc(100vh- 2rem)
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

             


</style>
