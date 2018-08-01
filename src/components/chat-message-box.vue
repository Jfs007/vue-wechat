<template lang="pug">

div
  div.chat-message-box
    div.chat-message_is-chat( :class="[message.isSelf? 'one-self': '']", v-if="message.msgType === 0" )
      div.q-avatar
        img( :src="message.avatar", @click="$router.push({name: 'usercard', params: { account: message.account }})")
      div.message {{message.isLoad ? 'load...' : ''}}   {{message.content}} 
    div.chat-message_is-system( v-else ) 
      .chat-message__tag {{message.content}}
</template>
<script>
export default {
  name: 'chat-message-box',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    message: {

    }
  }
}
</script>
<style lang="stylus" scoped>
  .chat-message-box 
    padding $pxTorem(22) $pxTorem(20) 
    .chat-message_is-chat 
      display flex
      width 100%
      &.one-self  
        flex-direction: row-reverse;
      .q-avatar
        height $pxTorem(100) 
        width $pxTorem(100) 
        
      .message 
        margin 0 $pxTorem(20)
        max-width $pxTorem(572) 
        min-width 0 
        padding $pxTorem(32) 
        background-color #b8e4fd 
        border-radius 4px
    .chat-message_is-system 
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


