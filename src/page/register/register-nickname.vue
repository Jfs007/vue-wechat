<template lang="pug">
  div.register-container
    header.header-top( @click="$router.go(-1)" )
      span.iconfont.icon-fanhui 
      span 返回
    div.main
      .main-content 
        h1.register-h1 
          span.text  设置昵称 
        h2.register-text__sm.pd-85  
          | 建议填写你的真实名字,让你的朋友更容易认出你。此昵称以后可以随时修改
      .main-content
        .register-form-item   
          .register-input 
            input( type="text", placeholder="昵称", v-model="nickname" )
        .register-form-item    
          button.q-btn.q-btn_primary.register-btn( @click="next", :class="[isDisable ? 'q-btn_disable': '']" ) 下一步
</template>
<script>
export default {
  methods: {
    next() {
      if(this.isDisable) return;
      this.$router.push({
        name: 'register_password'
      })
    }
  },
  computed: {
    isDisable() {
      return this.nickname.length< 3 || this.nickname.length> 12
    },
    nickname: {
      get() {
        return this.$store.state.register.nickname
      },
      set(value) {
        this.$store.commit('register/setField', {value, name: 'nickname'})
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

