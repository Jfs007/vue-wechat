<template lang="pug">
  div.message-input-bar 
    div.message-send
      div.message-send__input
        input.message-send__inner-input( v-model="message", contenteditable, ref="input")
      button.q-btn.q-btn_primary.message-send__btn( 
        :class="{ 'q-btn_disable': isDisable }",
        @touchstart.stop="sendMessage"

      ) 发送
    div.messsage-tools 
      // div.message-tool__icon
      //   span.iconfont.icon-biaoqing
      div.message-tool__icon
        input( type="file", @change="sendFileHandle" ).upload-input 
        span.iconfont.icon-image

</template>
<script>
import {mapActions} from 'vuex'
import Upload from '@/util/upload';
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
  mounted() {
  },
  destroyed() {
  },
  methods: {
    // sendFile
    ...mapActions('user', ['sendFile', 'sendTextMessage']),

    async sendMessage(e) {
      e.preventDefault();
      if(this.isDisable) return;
      let message = this.message;
      this.message = '';
      await this.sendTextMessage({
        // 聊天内容
        content: message, 
        type: 'text',
        createCallback: () => {
          this.$emit('send', 'text');
        }
      });
      // this.$refs['input'].focus();
      
    },
    async sendFileHandle(e) {
      let files = e.target.files;
      let file = files[0];
      let fileObj = new Upload(file);
      // if(fileObj)
      // 类型判断器具
      await this.sendFile({ 
        fileObj, type: 'image', 
        createCallback: () =>{
          this.$emit('send', 'file')
        } 
      })
      
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
      position relative
      text-align center
      .upload-input 
        position absolute 
        width 100% 
        height 100%
        z-index 10
        opacity 0
        font-size 0

</style>


