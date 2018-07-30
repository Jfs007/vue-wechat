<template lang="pug">
  div.avatar-upload
    hd-bar.messages-hd-bar( title-name="头像挂件" )
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 返回 
    div.avatar-upload-content
      cube-upload.q-avatar.avatar
        div.q-avatar.avatar-img 
          src
</template>
<script>
import {Upload} from 'cube-ui'
import hdBar from '@/components/hd-bar';
import qField from '@/components/q-field';
import qList from '@/components/q-list';
import {mapState, mapMutations} from 'vuex'
import {dateBirth, dateFormat} from '@/util/misc';
console.log(Upload, 'upload')
export default {
  components: {
    cubeUpload: Upload,
    cubeUploadFile: Upload.File,
    hdBar
  },
  data() {
    return {
      files: []
    }
  }
}
</script>
<style lang="stylus" scoped>
  .avatar-upload 
    padding-top $hd-bar-height
    .avatar-upload-content
      padding $pxTorem(181.5) 0 $pxTorem(202.5) 0 
      background-color $color-primary
      .avatar
        width $pxTorem(343)
        height $pxTorem(343)
        margin 0 auto
</style>
<style lang="stylus">
.avatar-upload
  .cube-upload
    .cube-upload-def
        width 100% 
        height 100%
        margin 0
      .cube-upload-btn
        width 100% 
        height 100%
        margin 0  
        .cube-upload-btn-def 
          border-radius 50%
          border none
          width 100% 
          height 100%
          background none
          i 
            &:after 
              width 0 
            &:before 
              width 0  
          &:after 
            border none
          
</style>

