<template lang="pug">
  div.friend-add
    hd-bar( title-name="添加好友" )
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
        span 取消
      div( slot="sec-r") 
        span( @click="sendRequest" ) 发送      
    div.friend-add-main
      div.fam__top-block
        div.q-avatar
          img( :src="userInfo.avatar")
        div.fam_info 
          div.fam__nickname  {{userInfo.nickname}}
          div.fam__personal-info 
            span 男
            span 41岁
      div.fam__main-block 
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
import {mapState, mapActions} from 'vuex'
import qList from '@/components/q-list'
import qItem from '@/components/q-item'
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
    ...mapActions('user', ['addFriend']),
    async sendRequest() {
      let id = this.$route.params.id;
      let {authInfo, remark } = this.forms;
      try {
        await this.addFriend({
          to: id,
          authInfo,
          remark,
          origin: this.$route.query.origin
        });
        this.$router.go(-1);
      } catch (error) {
        
      }
      
      
    }
  }

}
</script>
<style lang="stylus" scoped>
  .friend-add 
    padding-top $hd-bar-height
    background $bg-color
  .friend-add-main 
    padding-top $pxTorem(51) 
    .fam__top-block
      display flex 
      padding 0 $pxTorem(18)
      align-items center
      .q-avatar 
        width $pxTorem(124)
        height $pxTorem(124)
      .fam_info 
        padding-left $pxTorem(28)  
        .fam__nickname 
          padding-bottom $pxTorem(17)
        .fam__personal-info 
          color #848486   
    .fam__main-block
      textarea, input 
        width 100% 
        background none 
        font-size $pxTorem(36) 
        flex 1 

</style>


