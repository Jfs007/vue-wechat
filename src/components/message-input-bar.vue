<template lang="pug">
  div.message-input-bar 
    div.message-send 
      div.message-send__input
        input.message-send__inner-input( v-model="message", contenteditable)
      button.q-btn.q-btn_primary.message-send__btn( 
        :class="{ 'q-btn_disable': isDisable }",
        @click="sendMessage"

      ) 发送
    div.messsage-tools 
      div.message-tool__icon  
        span.iconfont.icon-biaoqing
  
</template>
<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  computed: {
    isDisable() {
      return this.message === ''
    }
  },
  methods: {
    sendMessage() {
      if(this.isDisable) return;
      this.$emit('send', this.message);
      this.message = '';
    }
  }
}
</script>
<style lang="stylus" scoped>
.message-input-bar
  padding $pxTorem(16) $pxTorem(16)
  .message-send  
    display: flex
    border-collapse: separate;
    align-items flex-end
    .message-send__input
      flex 1
      margin 0
      margin-right $pxTorem(10)
      appearance none
      box-sizing border-box 
      background-color #ffffff
      border-radius 6px
      .message-send__inner-input
        padding $pxTorem(15) $pxTorem(12)
        min-height $pxTorem(86)
        line-height $pxTorem(56)
        margin 0px 
        width 100%
        font-size $pxTorem(40)
        appearance none
        outline none
    .message-send__btn 
      height $pxTorem(86)
      line-height $pxTorem(86)
      padding 0 $pxTorem(25)
      font-size $pxTorem(36)
      height $pxTorem(86)
      border-radius 5px
      &.q-btn_disable
        color #ffffff
  .messsage-tools
    height $pxTorem(106)
    display flex 
    align-items center
    .message-tool__icon 
      padding 0 $pxTorem(15)     
      font-size $pxTorem(54)
      color #818392 
</style>


