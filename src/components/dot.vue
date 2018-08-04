<template lang="pug">
  div.q-dot
    slot
    sup.q-dot__content( :class="{'q-dot__content_is-fixed': $slots.default }", v-if="num !== 0") {{num}}
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="stylus" scoped>
  .q-dot
    display inline-block
    position relative
    line-height 1
    sup.q-dot__content 
      background-color: #f56c6c;
      border-radius: $pxTorem(30)
      color: #fff;
      display: inline-block;
      font-size: $pxTorem(22)
      height: $pxTorem(48);
      line-height: $pxTorem(48);
      padding: 0 $pxTorem(18)
      text-align: center;
      white-space: nowrap;
      border: 1px solid #fff;
      box-sizing content-box;
      &.q-dot__content_is-fixed
        position: absolute;
        top: $pxTorem(12)
        right: $pxTorem(30)
        transform: translateY(-50%) translateX(100%);

</style>


