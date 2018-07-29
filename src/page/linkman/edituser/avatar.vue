<template lang="pug">
  div.avatar
    hd-bar.messages-hd-bar( title-name="头像挂件" )
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 返回 
    div.avatar-upload-content
      cube-upload.avatar.q-avatar
</template>
<script>
import {Upload} from 'cube-ui'
import hdBar from '@/components/hd-bar';
import qField from '@/components/q-field';
import qList from '@/components/q-list';
import {mapState, mapMutations} from 'vuex'
import {dateBirth, dateFormat} from '@/util/misc';
export default {
  components: {
    cubeUpload: Upload,
    hdBar
  }
}
</script>
<style lang="stylus" scoped>
  .avatar 
    padding-top $hd-bar-height
    .avatar-upload-content
      padding $pxTorem(181.5) 0 $pxTorem(202.5) 0 
      background-color $color-primary
      .avatar
        width $pxTorem(343)
        height $pxTorem(343)
        margin 0 auto
</style>
