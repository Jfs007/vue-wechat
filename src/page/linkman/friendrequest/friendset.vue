<template lang="pug">
  div.friend-set
    hd-bar( title-name="好友设置" )
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
        span 取消
      div( slot="sec-r") 
        span( @click="sendRequest" ) 完成      
    div.friend-set-main
      div.fsm__top-block
        div.q-avatar
          img( :src="userInfo.avatar")
        div.fsm_info 
          div.fsm__nickname  {{userInfo.nickname}}
          div.fsm__personal-info 
            span 男
            span 41岁
      div.fsm__main-block 
        q-list( title="填写验证信息")
          q-item
            div( slot="label" )
              textarea( v-model="forms.authInfo") 
        q-list( title="设置备注")
          q-item( label="备注")
            div( slot="label" )
              span 备注 
              input( v-model="forms.remark") 




    

</template>
<script>
import hdBar from '@/components/hd-bar'
import {mapState} from 'vuex'
import qList from '@/components/q-list'
import qItem from '@/components/q-item'
import { socketEmit } from '@/socket/socket'
export default {
  name: 'friendAdd',
  components: {
    hdBar,
    qList,
    qItem
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  data() {
    return {
      forms: {}
    }
  },
  created() {
    this.forms = {
       authInfo: '我是'+ this.userInfo.nickname,
       remark: ''
    }
  },
  methods: {
    async sendRequest() {
      let id = this.$route.params.id;
      let {authInfo, remark } = this.forms;
      try {
        await socketEmit('addFriend', { 
          to: id,
          authInfo,
          remark,
          origin: this.$route.query.origin
        })
        this.$router.go(-1);
      } catch (error) {
        
      }
      
      
    }
  }

}
</script>
<style lang="stylus" scoped>
  .friend-set 
    padding-top $hd-bar-height
    background $bg-color
  .friend-set-main 
    padding-top $pxTorem(51) 
    .fsm__top-block
      display flex 
      padding 0 $pxTorem(18)
      align-items center
      .q-avatar 
        width $pxTorem(124)
        height $pxTorem(124)
      .fsm_info 
        padding-left $pxTorem(28)  
        .fsm__nickname 
          padding-bottom $pxTorem(17)
        .fsm__personal-info 
          color #848486   
    .fsm__main-block
      textarea, input 
        width 100% 
        background none 
        font-size $pxTorem(36) 
        flex 1 

</style>


