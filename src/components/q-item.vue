<template lang="pug">
  div.q-item( :class="{ 'q-item_link': isLink , 'q-item_no-border': noBorder }", @click="click")
    .q-item__left 
      slot( name="icon" )
    .q-item__center 
      label.q-label
        slot( name="label" ) {{title}}
    .q-item-right
      slot( name="value" )
      span.iconfont.icon-link.q-link-icon( v-if="isLink") 
      

</template>
<script>
export default {
  name: 'qList',
  props: {
    isLink: {
      type: Boolean,
      // default: false
    },
    title: {
      type: String,
      default: ''
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}

</script>

<style lang="stylus" scoped>
  .q-item 
    padding $pxTorem(28) $pxTorem(30) 
    display flex 
    align-items center
    position relative
    font-size $pxTorem(44)
    &:before 
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
  .q-item_no-border 
    &:before 
      border-top none
  .q-item_link 
    .iconfont.q-link-icon
      color #bcbcbc
      margin-left $pxTorem(16)
  .q-item__center
    flex 1   
  .q-item-right
    display flex
    align-items center


</style>

