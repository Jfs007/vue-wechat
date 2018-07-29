<template lang="pug">
  div.account-manage
    hd-bar( title-name="账号管理")
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 设置
    q-list.account-list 
      q-item( v-for="account in accountList",  :key="account.account")
        .q-avatar( slot="icon") 
          img( :src="account.avatar" )
        .account-list__center-b( slot="label" ) 
          .account-list__nickname {{account.nickname}}
          .account-list__account {{account.account}} 
    q-list      
      q-item( @click.native="logout" )
          span( slot="label" ) 
            span 退出当前帐号 
</template>
<script>
import qList from '@/components/q-list';
import qItem from '@/components/q-item';
import hdBar from '@/components/hd-bar';
import {mapState, mapActions} from 'vuex';

export default {
  components: {
    qList,
    qItem,
    hdBar
  },
  data() {
    return {
      accountList: []
    }
  },
  created() {
    // 暂时
    this.accountList.push(this.userInfo);
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    ...mapActions('user', ['offline']),
    async logout() {
      try {
         await this.offline();
         this.$router.push({
           name: 'login'
         })
      } catch (error) {
        
      }
     
    }
  }
}
</script>
<style lang="stylus" scoped>
  .account-manage 
    padding-top $hd-bar-height
    .account-list 
      .q-avatar 
        width $pxTorem(80) 
        height $pxTorem(80)
      .account-list__center-b
        padding-left $pxTorem(27)
        .account-list__nickname 
          font-size $pxTorem(40) 
        .account-list__account 
          font-size $pxTorem(34)
          color #a7a7a7 

            
</style>


