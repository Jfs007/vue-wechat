<template lang="pug">
  .chat-room
    hd-bar.hd-bar
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui
      span( slot='default')
        h1.nickname {{currRoom.info&&currRoom.info.nickname||currRoom.info.name}}
        p.online-type [{{currRoom.info&&currRoom.info.device}}在线]
      span.hd-bar__right( slot="sec-r")
        span.iconfont.icon-yonghu( @click="$router.push({name: 'usercard', params: { account: userInfo.account}})" )
    .chat-room-wapper
      div.wapper
        transition( 
          name="custom-classes-transition",
          enter-active-class="animated fadeInRight",
          leave-active-class="animated fadeOutRight")
          .chat-room__newmsg-tag( @click="scrollToLastMessage", v-if="unreadBeforeRoom>0&&delayUnReadTag" )
            .semi-circle
            .newmsg-box
              .newmsg-tag__icon 
                span.iconfont.icon-xiaoxi1
              span.newsg-tag__text {{unreadBeforeRoom}} 条新消息
              span.iconfont.icon-shang
        .chat-room__unread-ball( v-if="unreadAfterRoom>0", @click="scrollToBottom") 
          span {{unreadAfterRoom}}  
        cube-scroll(
          ref="scroll", 
          :options="options",
          @pulling-down="loadMessage",
          :data="chatRecords"
          )
          .chat-room-content
            dialogue-wrap( 
              :key="message._id",
              :ref="'chat-message-box_'+index",
              v-for="(message, index) in chatRecords",
              :message="$mergeMessage(message, currRoom, userInfo, roomType !== 'group')") 
      message-input-bar( @send="sendMessage")

</template>
<script>
import hdBar from '@/components/hd-bar'
import messageInputBar from '@/components/message-input-bar'
import dialogueWrap from '@/components/chat/dialogue-wrap'
import { Scroll } from 'cube-ui'
import { socketEmit, socket } from '@/socket/socket';
import {mapState, mapMutations, mapActions } from 'vuex'
import TempRoom from '@/util/tempRoom.js'
import Message from '@/util/message.js'
let message = new Message();
export default {
  components: {
    hdBar,
    dialogueWrap,
    cubeScroll: Scroll,
    messageInputBar
  },
  data() {
    return {
      // bscroll的一些配置，，没什么好说的
      options: {
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: {
          txt: '  '
        },
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoadThreshold: 0,
        
      },
      // 房间的序号
      // 不自动读消息的范围
      notAutoReadRang: 110,
      /**
       * 进房间的时候 超过多少条显示新消息
       */
      unReadBeyondNum: 5,
      // 最早没有读的那条消息
      unReadLastIndex: 0,
      // 在进房间后未读的消息
      unreadAfterRoom: 0,
      // 在进房间前未读的消息
      unreadBeforeRoom: 0,
      // bScroll的 对象实例 (不是bscroll组件实例)
      scroll: null,
      // 没太多卵用，，目的就是做个flag，，当为true的时候显示右上角未读新消息的tag
      delayUnReadTag: false,
      
    }
  },
  computed: {
    ...mapState('user', ['userInfo', 'currRoomIndex', 'tempRoomList']),
    currRoom() {
      return this.tempRoomList[this.currRoomIndex];
    },
    chatRecords() {
      let chatRecords = this.currRoom.chatRecords;
      return chatRecords;
    },
    roomType() {
      return this.$route.query.roomType;
    }
  },
  watch: {
    // chatRecords(newChat, oldChat) {
    //   this.scrollToBottom();
    // }
    
  },
  created() {
    this.unreadBeforeRoom = this.currRoom.unread;
    setTimeout(() => {
      this.delayUnReadTag = true;
    }, 360);
  },
  mounted() {
    this.$nextTick(() => {
      let scroll = this.$refs['scroll'];
      this.scroll = scroll.scroll;
      this.execUnreadBeforeRoom();
      this.scrollBind();
      this.scrollToBottom();
    });
    socket.on('message.room', this.execAfterRoomNewMsg);
    socket.on('message.private', this.execAfterRoomNewMsg);
    
  },
  beforeDestroy() {
    this.readPrivateMessage(this.currRoomIndex);
    socket.off('message.room', this.execAfterRoomNewMsg);
    socket.off('message.private', this.execAfterRoomNewMsg);
    this.scroll.destroy();
    this.scroll = null;
    
  },
  methods: {
    ...mapMutations('user', ['addChatRecords', 'unshiftChatRecords', 'activeRoom']),
    ...mapActions('user', ['readPrivateMessage', 'sendPrivate', 'sendRoom']),
    // bscroll 滚动事件绑定
    scrollBind() {
      scroll = this.scroll
      scroll.on('scroll', ({x, y}) => {
        // 有进来前未读的消息
        if(this.unreadBeforeRoom) {
          // 实时获取offsetTop 
          let unreadLastRef = 'chat-message-box_'+ this.unReadLastIndex;
          let el = this.$refs[unreadLastRef][0].$el;
          let offsetTop = el.offsetTop;
          if(-y<=offsetTop&&scroll.directionY === -1) {
            this.readBeforeRoomMessage();
          }
        }
        // 进来后未读的消息
        if(this.unreadAfterRoom) {
          // 
          if(y<= scroll.maxScrollY+this.notAutoReadRang) {
            this.readAfterRoomMessage();
          }
        }
      })
    },
    /**
     *  处理进房间后 未读的消息
     * 
     */
    async execUnreadBeforeRoom() {
      scroll = this.scroll;
      let maxScrollY = scroll.maxScrollY;
      let currRoom = this.tempRoomList[this.currRoomIndex];
      // 如果没读的消息没超过一定数量，，那自动读取消息
      if(currRoom.unread<=this.unReadBeyondNum) {
        // 通知服务器将消息更新为已读
        this.readBeforeRoomMessage();
      }else {
        // 获取未读的最早的一条消息的时间
        let lastUnReadMessage = currRoom.lastUnReadMessage;
        // 获取刚早于这个时间的那条消息的index 作为记录，，但不读消息
        currRoom.chatRecords.find((chat, index) => {
          if(lastUnReadMessage < chat.timestamp) {
            this.unReadLastIndex = index=== 0 ? 0 : index-1;
            return true;
          }
        })
      }
      // 滚到最底部 
      scroll.scrollTo(0, maxScrollY, 250)
    },
    // 处理进入房间后新来的消息
    async execAfterRoomNewMsg() {
      scroll = this.scroll;
      this.$nextTick(() => {
        // 更新scroll
        scroll.refresh();
        let maxScrollY = scroll.maxScrollY;
        let currY = scroll.y;
        if(currY<= (maxScrollY+ this.notAutoReadRang)) {
          // 在范围内 读取消息并且滚到最底部
          this.readAfterRoomMessage();
          scroll.scrollTo(0, maxScrollY, 250);
        }else {
          this.unreadAfterRoom++;
        }
      })
      
    },
    // 滚动到最早未读的的那条消息
    async scrollToLastMessage() {
      scroll = this.scroll;
      this.readBeforeRoomMessage();
      let unreadLastRef = 'chat-message-box_'+ this.unReadLastIndex;
      scroll.scrollToElement(this.$refs[unreadLastRef][0].$el, 250);
     
      
    },
    // 滚动到最下面
    async scrollToBottom() {
      scroll = this.scroll;
      this.$nextTick(() => {
        scroll.refresh();
        let maxScrollY = scroll.maxScrollY;
        scroll.scrollTo(0, maxScrollY, 250);
      });
      if(this.unreadAfterRoom) {
        this.readAfterRoomMessage();
      }
    },
    // 读进房间前的未读新消息
    async readBeforeRoomMessage() {
      this.delayUnReadTag = false;
      this.unreadBeforeRoom = 0;
      // 暂时不做读取 群聊类型消息
      this.readPrivateMessage(this.currRoomIndex);
    },
    // 读进房间后的未读新消息
    async readAfterRoomMessage() {
      this.unreadAfterRoom = 0;
      // 暂时不做读取 群聊类型消息
      this.readPrivateMessage(this.currRoomIndex);
    },
    // 上拉加载聊天信息
    async loadMessage() {


      let timestamp = this.chatRecords[0] ?  this.chatRecords[0].timestamp: Date.now()
      let scroll = this.$refs['scroll'].scroll;
      let maxScrollY = scroll.maxScrollY;
      let chatRecords = null;
      if(this.roomType === 'group') {
        chatRecords = await socketEmit('getRoomHistory', {roomid: this.currRoom.id, timestamp })
      }else {
        chatRecords = await socketEmit('getPrivateMsg', {to: this.currRoom.id, timestamp});
      }
      // 获取到数据
      if(chatRecords.data.length>0) {
        this.unshiftChatRecords({index: this.currRoomIndex, chatRecords: chatRecords.data});
      }else {
        this.$refs.scroll.forceUpdate()
      }
      this.$nextTick(() => {
        scroll.refresh();
        let currMaxScrollY = scroll.maxScrollY;
        scroll.scrollTo(0, (currMaxScrollY- maxScrollY) >= 0 ? 0: (currMaxScrollY- maxScrollY+65), 10)
      })
      
    },
    // 
    async sendMessage(content) {
      let isActive = this.currRoom.isActive;
      // 房间是否已被激活
      if(!isActive) {
        this.activeRoom(this.currRoomIndex);
      }
      let send = this.roomType === 'private' ? this.sendPrivate.bind(this): this.sendRoom.bind(this)
      send({
        // 聊天内容
        content: content, 
        creater: this.userInfo.id, 
        // user: this.userInfo.id,
      });
      this.scrollToBottom();

    }
    
  }

}
</script>


<style lang="stylus" scoped>
  .chat-room 
    background-color #f1f2f7
    padding-top $hd-bar-height
  .hd-bar 
    .nickname
      margin-bottom $pxTorem(4)
      font-size $pxTorem(40)
    .online-type 
      font-size $pxTorem(20)
    .hd-bar__right  
      font-size $pxTorem(64) 
  .chat-room-wapper 
    position relative
    display flex 
    flex-direction column
    height calc(100vh- 4rem)
    .wapper 
      height 100%
      position relative
      display flex 
      flex-direction column
      .chat-room__newmsg-tag 
        transform translate3d(0, 0, 0)
        position absolute 
        top $pxTorem(48) 
        right 0 
        height $pxTorem(104) 
        width $pxTorem(304)
        background-color #fff 
        z-index 50
        .semi-circle
          content " "
          width $pxTorem(104) 
          height 100% 
          border 1px solid #e3e2e7 
          border-radius 50% 
          position absolute
          z-index 0 
          transform translateX(-50%)
          top 0px
          background-color #ffffff
        .newmsg-box
          width 100% 
          height 100% 
          background-color #ffffff
          position relative
          z-index 2
          display flex
          border 1px solid #e3e2e7
          border-left 0
          color #16b8e8 
          align-items center
          font-size $pxTorem(32)
          .newmsg-tag__icon 
            width $pxTorem(80) 
            height $pxTorem(80) 
            border-radius 50% 
            position absolute
            top 50% 
            left 0
            background-color #16b8e8
            transform translate3d(-50%, -50%, 0)
            color #ffffff 
            line-height $pxTorem(80)
            font-size $pxTorem(60)
            text-align center
          .newsg-tag__text  
            margin-left $pxTorem(52)
            margin-right $pxTorem(20)
      .chat-room__unread-ball  
        width $pxTorem(68) 
        height $pxTorem(68) 
        position absolute 
        bottom $pxTorem(22) 
        right $pxTorem(26)
        background-color #12b6ff
        border-radius 50% 
        font-size $pxTorem(32) 
        text-align center 
        line-height $pxTorem(68) 
        z-index 50
        color #ffffff
        &:after 
          content " "
          position absolute 
          width $pxTorem(14) 
          height $pxTorem(14) 
          background-color #12b6ff
          bottom $pxTorem(-7) 
          left 50%
          transform translateX(-50%) rotateZ(-45deg)  translateY(-2px)
          z-index 50
        
    .chat-room-content
      padding-bottom $pxTorem(100)

</style>
<style lang="stylus">
.chat-room 
  .cube-scroll-content  
    min-height 100%+ 1px
  .animated 
    animation-duration: .25s;
    // height 102vh 
</style>


