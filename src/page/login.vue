<template lang="pug">
  .login-container
    .bg-wrapper
    .login-top 
      span.logo.iconfont.icon-qq1
      span.text QQ
    form.login-form.animated.fadeInUp 
      .form-item 
        input.form-input( type="text", placeholder="QQ号", v-model="account")  
      .form-item 
        input.form-input( type="password", placeholder="密码", v-model="password")  
      .form-item 
        button.q-btn.q-btn_primary.submit-btn( @click.prevent="login") 登 录  
      .form-item.clearfix.login-help
        a.fr( @click.stop="$router.push({name: 'register'})") 新用户注册     
</template>
<script>
import { mapState } from 'vuex'
import { socketEmit } from '@/socket/socket'
export default {
  name: 'login',
  data() {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login() {
      
      socketEmit('login', { account: this.account, password: this.password }).then(data => {
        localStorage.setItem('_token', data.data.token);
        this.$router.push({
          name: 'messages'
        })
      }).catch(err => {
        console.log(err, 'err')
      })
    }
  },
  created() {
    // 主动填充
    let registerModule = this.$store.state.register;
    if(registerModule) {
      this.account = registerModule.account || '';
      this.password = registerModule.password || '';
    }
  }
}
</script>
<style lang="stylus" scoped>
  .login-container 
    position relative
    box-sizing border-box
    height 100vh
    padding 0 $pxTorem(65)
    .bg-wrapper
      background-image url('../images/login4.jpg')
      background-repeat no-repeat 
      background-size 100% auto
      top 0 
      left 0 
      right 0
      bottom 0
      position absolute
      z-index -1
  .login-top
    color #ffffff
    line-height $pxTorem(45)
    padding-top $pxTorem(229) 
    .logo 
      font-size $pxTorem(90)
    .text 
      font-size $pxTorem(64)  
  .login-form 
    padding-top $pxTorem(129) 
    .form-item 
      margin-bottom $pxTorem(50)
    .form-input 
      background none
      outline none
      width 100%
      border none 
      border-bottom 1px solid rgba(255, 255, 255, .7)
      padding-bottom $pxTorem(22) 
      font-size $pxTorem(40) 
      color #ffffff 
    .submit-btn 
      width 100%
    .login-help 
      color $color-primary
      a 
        color inherit            
</style>

