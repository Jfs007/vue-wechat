<template lang="pug">
  div.register-container
    header.header-top( @click="$router.go(-1)" )
      span.iconfont.icon-fanhui 
      span 返回
    div.main
      .main-content 
        h1.register-h1 
          span.text  设置密码 
        h2.register-text__sm.pd-85  
          | 填写你的密码
      .main-content
        .register-form-item   
          .register-input 
            input( type="password", placeholder="密码", v-model="password" )
        .register-form-item    
          button.q-btn.q-btn_primary.register-btn( @click="next", :class="[isDisable ? 'q-btn_disable': '']") 注册
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    next() {
      if(this.isDisable) return;
      this.register().then(data => {
        this.$router.push({
          name: 'register_success'
        })
      }).catch(err => {
      })
      
    },
    ...mapActions('register', ['register'])
  },
  computed: {
    isDisable() {
      return this.password.length< 3 || this.password.length> 12
    },
    password: {
      get() {
        return this.$store.state.register.password
      },
      set(value) {
        this.$store.commit('register/setField', {value, name: 'password'})
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .register-container 
    .header-top 
      padding $pxTorem(34) $pxTorem(20) 0 $pxTorem(20) 
      color #737373
    .main  
      padding-top $pxTorem(60)   
    .main-content 
      padding 0 $pxTorem(64)
    .register-h1
      font-size $pxTorem(80)
      color #000
    .register-text__sm 
      font-size $pxTorem(32) 
      color #737373 
      line-height $pxTorem(52)
    .pd-85 
      padding-top $pxTorem(34) 
    .register-form-item  
      margin-top $pxTorem(42)   
      .register-input  
        padding-bottom $pxTorem(18) 
        border-bottom 1px solid #e4e4e4
        input 
          background none 
          width 100% 
          outline none
          color #bbbbbb 
          font-size $pxTorem(44)
      .register-btn  
        width 100% 




      
</style>

