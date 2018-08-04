<template lang="pug">
  message-box(:message="message")
    .image-message( @click="showImagePreview")
      img( :src="`${message.content}${message.isLoad ? '': '?'+Date.now()}`" )
</template>
<script>
import Vue from 'vue'
import {mapState} from 'vuex';
import {ImagePreview, createAPI} from 'cube-ui';
createAPI(Vue, ImagePreview, ['change', 'hide'], true)
import messageBox from './message-box'
export default {
  name: 'textMessage',
  components: {
    messageBox
  },
  data() {
    return {
      images: [],
      initialIndex: 0,
    }
  },
  props: {
    message: Object
  },
  computed: {
    ...mapState('user', ['tempRoomList', 'currRoomIndex']),
    currRoom() {
      return this.tempRoomList[this.currRoomIndex] || {};
    },
    // 当前聊天房间消息
    messages() {
      return this.currRoom.chatRecords || [];
    }
  },
  created() {
  },
  methods: {
    showBeforePrepare() {
      let imageIsCurrent = false;
      this.images = [];
      this.initialIndex = 0;
      // 收集当前聊天房间的images
      this.messages.map((message, index) => {
        if(message.type === 'image') {
          // 查找当前的图片index
          if(!imageIsCurrent&&message._id !== this.message._id) {
            this.initialIndex++;
          }
          if(message._id === this.message._id) {
            imageIsCurrent = true;
          }
          this.images.push(message.content);
        }
      });
    },
    showImagePreview() {
      this.showBeforePrepare();
      this.$createImagePreview({
        imgs: this.images,
        initialIndex: this.initialIndex,
        loop: false
      },
      (h) => {
        return h('div', {
          slot: 'footer'
        }, '')
      }).show()
    }
  }
}
</script>
<style lang="stylus" scoped>
.image-message 
  img 
    max-width 100% 
    width auto
    height auto
    border-radius 4px
</style>


