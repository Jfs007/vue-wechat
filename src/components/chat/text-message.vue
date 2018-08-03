<template lang="pug">
  message-box(:message="message")
    .text-message
      span {{message.content}}
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
.text-message 
  padding $pxTorem(18)
      
</style>


