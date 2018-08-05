<template lang="pug">
span
  message-box( :message="message")
    .image-message( @click="showImagePreview")
      img( :src="imageUrl" )
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
      isShow: false,
      dateSuffix: Date.now()
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
    },
    imageUrl() {
      return `${this.message.content}${this.message.isLoad ? '': ''}`
    }
  },
  created() {

    let image = new Image();
    image.onload = () => {
      // this.$
      this.$nextTick(() => {
        let index = 0;
        this.messages.find((item, idx) => {
          if(item._id === this.message._id) {
            index = idx;
            return true;
          }
        })
        this.$bus.$emit('c-chat/image-message', index)
      })
    }
    image.src = this.imageUrl ;
  },
  mounted() {
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
    min-height 0
</style>


