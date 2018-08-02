<template lang="pug">
  div.avatar-edit
    hd-bar.messages-hd-bar( title-name="头像挂件" )
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 返回 
    div.avatar-upload-content
      avatar-upload.avatar-upload( :url="userInfo.avatar")

</template>
<script>
import hdBar from '@/components/hd-bar';
import qField from '@/components/q-field';
import qList from '@/components/q-list';
import avatarUpload from '@/components/avatar-upload';
import {mapState, mapMutations} from 'vuex'
import {dateBirth, dateFormat} from '@/util/misc';
export default {
  components: {
    hdBar,
    avatarUpload
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  data() {
    return {
      files: []
    }
  }
}
</script>
<style lang="stylus" scoped>
  .avatar-edit 
    padding-top $hd-bar-height
    .avatar-upload-content
      padding $pxTorem(181.5) 0 $pxTorem(202.5) 0 
      background-color $color-primary
      .avatar-upload
        width $pxTorem(343)
        height $pxTorem(343)
</style>
<style lang="stylus">

          
</style>

