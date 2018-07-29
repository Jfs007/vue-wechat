<template lang="pug">
  .q-list( :class="{ 'q-list-no-title': !title, 'q-list-not-top': noTop }")
    div.q-list__title( v-if="title" )
      slot( name="title") 
        span {{title}}
    div.q-list__content
      slot
</template>
<script>
export default {
  name: 'qList',
  props: {
    title: String,
    noTop: Boolean
  }
}
</script>

<style lang="stylus" scoped>
  .q-list 
    position relative
    &.q-list-no-title  
      padding-top $pxTorem(40)
    &.q-list-not-top 
      padding-top 0
    .q-list__title 
      padding $pxTorem(18) $pxTorem(23)
      color #848486
    .q-list__content
      background-color #ffffff
      &:after 
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
</style>

