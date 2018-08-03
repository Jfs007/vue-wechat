<template lang="pug">
  message-box(:message="message")
    .image-message
      img( :src="message.content" )
</template>
<script>
import messageBox from './message-box'
export default {
  name: 'textMessage',
  components: {
    messageBox
  },
  props: {
    message: Object
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


