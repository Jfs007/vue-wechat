<template lang="pug">
  div.q-input
    span.q-input__icon.iconfont.icon-iconfontsousuokuangsousuo
    input.q-input__inner( v-model="innerValue", @input="change")
    span.q-input__reset( @click="reset", v-show="showReset")
      span.icon.iconfont.icon-delete 

</template>
<script>
export default {
  data() {
    return {
      innerValue: this.value
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value(newValue) {
      this.innerValue = newValue;
    },
    innerValue(newValue) {
      this.$emit('input', newValue);
    }
  },
  computed: {
    showReset() {
      return this.innerValue!==''
    }
  },
  methods: {
    change(e) {
      this.innerValue = e.target.value;
    },
    reset(e) {
      this.innerValue = '';
    }
  }
}
</script>
<style lang="stylus" scoped>
.q-input 
  border none
  width 100% 
  text-align center 
  padding $pxTorem(16) $pxTorem(28)
  border-radius 4px 
  background-color #f3f3f3 
  color #c9c8cd
  display flex 
  align-items center
  .q-input__icon 
    font-size $pxTorem(40)
    padding-right $pxTorem(20)
  .q-input__inner 
    padding 0s
    border none 
    width 100%
    outline none 
    background-color rgba(0, 0, 0, 0)
    flex 1
  .q-input__reset
    width $pxTorem(52)  
    font-size $pxTorem(44)
    position relative
    .iconfont 
      position absolute
      left 50% 
      top 50% 
      transform translate3d(-50%, -50%, 0)


</style>


