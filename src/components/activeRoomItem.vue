<template lang="pug">
  div.active-room-item 
    div.q-avatar.headimg
      img( :src="room.info.avatar")
    div.message-info
      .message-top.clearfix
        div.message-fromer.fl {{roomName}}
        div.message-time.fr {{recentDate}}
      .message-bottom    
        p.message-content.text_ellipsis.fl {{messageFilter}}
        dot.fr( :num="room.unread", v-show="room.unread>0")    
</template>
<script>
import dot from '@/components/dot'
export default {
  components: {dot},
  props: {
    room: {
      type: Object,
      default() {
        return {
          info: {

          },
          chatRecords: []
        }
      }
    }
  },
  computed: {
    // 最新的一条消息
    latestMessage() {
      let chats = this.room.chatRecords;
      let cLength = chats.length;
      return chats[cLength-1] || {};
    },
    // 房间的名称，，
    roomName() {
      let chatType = this.room.chatType;
      return this.room.info[ chatType === 'private' ? 'remarkname': 'name'];
    },
    recentDate() {
      let timestamp = this.latestMessage.timestamp;
      if(!timestamp) return '';
      let date = new Date(timestamp);
      let timeRangeName = '上午';
      if(date>12) timeRangeName = '下午';
      return timeRangeName+ '  '+ this.$dateFormat(date, 'hh:mm');

    },
    // 消息过滤
    messageFilter() {
      let message = this.latestMessage;
      let type = message.type;
      switch (type) {
        case 'text':
          return message.content;
          break;
        case 'image':
          return '[图片]';
          break;
        case 'file': 
          return '[文件]';
          break;  
        default: 
          return ''
          break;
      }
    }


  }
}
</script>

<style lang="stylus" scoped>
.active-room-item  
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
