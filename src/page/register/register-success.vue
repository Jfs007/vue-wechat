<template lang="pug">
  div.register-container
    header.header-top( @click="$router.go(-1)" )
      span.iconfont.icon-fanhui 
      span 返回
    div.main
      .main-content
        h1.register-success.register-h1  
          span.iconfont.icon-zhucechenggong  
          span.text  注册成功 
        h2.account-label 你的QQ号为:
        h3.you-account {{account}}
      .main-content.submit
        button.q-btn.q-btn_primary( @click="$router.push({name: 'login'})") 登陆
      .login-notice 
        span 三天内未登录, 该QQ号将被回收
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState('register', ['account'])
}
</script>
<style lang="stylus" scoped>
  .register-container 
    .header-top 
      padding $pxTorem(34) $pxTorem(20) 0 $pxTorem(20) 
      color #737373
    .main  
      padding-top $pxTorem(54)   
    .main-content 
      padding 0 $pxTorem(65)
      .register-success.register-h1
        font-size $pxTorem(80)
        color #000
        .iconfont 
          color #8cc445
      .account-label 
        padding-top $pxTorem(135) 
        font-size $pxTorem(50)
        color #878787  
      .you-account 
        padding-top $pxTorem(38)   
        font-size $pxTorem(70)  
      &.submit
        padding-top $pxTorem(90) 
        .q-btn 
          width 100% 
    .login-notice  
      text-align center 
      padding-top $pxTorem(38)
      color $pxTorem(30) 
      color #878787     
      
</style>

