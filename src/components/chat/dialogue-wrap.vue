<template lang="pug">
  div.dialogue-wrap 
    // 系统消息类型
    div.chat-message_system( v-if=" message.msgType === 1 " )
      .chat-message__tag {{message.content}} 
    // 用户聊天类型  
    div.chat-message_user( v-else, :class="[message.isSelf? 'one-self': '']" )
      div.q-avatar.chat-avatar
        img( :src="creater.avatar", @click="$router.push({name: 'usercard', params: { account: creater.account }})")
      div.chat-message__content 
        div.chat-message__nickname {{creater.nickname}} 
        div.chat-message__message
          component( :is="messageBox", :message="message")
          div.chat-message__load( v-if="message.isLoad") 
            div.q-rotating
              span.iconfont.icon-load

</template>
<script>

import textMessage from './text-message.vue'
import imageMessage from './image-message.vue'
export default {
  name: 'dialogueWrap',
  computed: {
    messageBox() {
      let type = this.message.type || 'text'
      switch (type) {
        case 'text':
          return textMessage;
          break;
        case 'image':
          return imageMessage
          break;
        default: 
          return null;  
      }
    },
    creater() {
      return this.message.creater|| {}
    }
  },

  props: {
    message: Object
  }
}
</script>
<style lang="stylus" scoped>
  @keyframes fadeInUps  
    0%
      opacity: 0;
      transform: translate3d(0, 24px, 0);
    100% 
      opacity: 1;
      transform: translate3d(0, 0, 0);
  .dialogue-wrap 
    padding $pxTorem(26) $pxTorem(20) 
    animation fadeInUps 0.85s 
    animation-fill-mode forwards
    .chat-message_user
      display flex
      width 100%
      position relative
      &.one-self  
        flex-direction: row-reverse;
        .chat-message__message  
          flex-direction: row-reverse;
        .chat-message__nickname 
          text-align right   
      .q-avatar
        height $pxTorem(100) 
        width $pxTorem(100) 
      .chat-message__content  
        margin 0 $pxTorem(25)
        max-width $pxTorem(572) 
        min-width 0 
        border-radius 4px
        .chat-message__nickname 
          color #8e8f94
          font-size $pxTorem(24)
          padding-bottom $pxTorem(20)
        .chat-message__message 
          display flex
      .chat-message__load 
        margin 0 8px
        display inline-block
        color #8e8f94

    .chat-message_system
      text-align center
      .chat-message__tag
        text-align center
        font-size $pxTorem(30) 
        width $pxTorem(356) 
        display inline-block
        background-color #d4d5da 
        padding $pxTorem(12) $pxTorem(20)
        border-radius 10px
        color #ffffff



</style>





