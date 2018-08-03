<template lang="pug">
  div.message-box
    .message-box-content( :class="{'not-self': !message.isSelf}") 
      slot( :message="message")
      i.tri.iconfont &#xe7ab;
</template>
<script>
export default {
  name: 'textMessage',
  props: {
    message: Object
  }
}
</script>
<style lang="stylus" scoped>
.message-box
  .message-box-content
    padding 4px
    max-width $pxTorem(572) 
    min-width 0 
    background-color #b8e4fd 
    border-radius 4px
    position relative
    i.tri
      content "&#xe7ab;"
      display block 
      position absolute 
      color #b8e4fd  
      right 4px 
      top $pxTorem(12)
      transform translate3d(100%, 0, 0)
    &.not-self
      i.tri 
        left 4px
        right auto
        transform translate3d(-100%, 0, 0) rotateZ(180deg)
      
</style>


