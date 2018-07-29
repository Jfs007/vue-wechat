<template lang="pug">
  div.setting
    hd-bar( title-name="设置")
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 返回
    div.setting-main
      q-list.setting-item.setting-main__userinfo 
        q-item( :is-link="true", title="账号管理", @click.native="toAccountManage") 
          div.setting-item__avatar( slot="value")  
            .q-avatar 
              img( :src="userInfo.avatar")
        q-item( is-link, title="手机号码", :is-link="true") 
          div( slot="value")  
            span 未绑定
        q-item( :is-link="true", title="QQ达人")  
          div( slot="value")  
            span 158 
</template>
<script>
import qList from '@/components/q-list';
import qItem from '@/components/q-item';
import hdBar from '@/components/hd-bar';
import { mapState } from 'vuex'
export default {
  components: {
    qList,
    qItem,
    hdBar
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    toAccountManage() {
      this.$router.push({
        name: 'accountmanage'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .setting
    padding-top $hd-bar-height
  .setting-main
    .setting-item 
      margin-bottom $pxTorem(40)
    .setting-main__userinfo 
      .setting-item__avatar
        position relative
        width $pxTorem(80) 
        .q-avatar 
          position absolute 
          top 50% 
          left 50%
          width $pxTorem(80) 
          height $pxTorem(80)
          transform translate3d(-50%, -50%, 0)


</style>


