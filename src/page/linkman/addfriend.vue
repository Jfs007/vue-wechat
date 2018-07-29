<template lang="pug">
  div.addfriend
    hd-bar.messages-hd-bar( title-name="添加" )
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 联系人
    .user-search    
      q-list
        q-item( title="QQ号", @click.native="toSearchFriend" )
          span.search-icon( slot="icon" )
            span.iconfont.icon-iconfontsousuokuangsousuo 
    .add-user-methods 
      q-list
        q-item( title="添加手机联系人" :is-link='true')
        q-item( title="扫一扫添加好友" :is-link='true')
        q-item( title="面对面发起群聊" :is-link='true')
        q-item( title="按条件查找陌生人" :is-link='true')

    searchUser.search-friend-view( v-show="isSearch", @close="close")
       
        
</template>
<script>
import hdBar from '@/components/hd-bar'
import searchUser from './searchuser'
import qList from '@/components/q-list'
import qItem from '@/components/q-item'
export default {
  components: { hdBar, searchUser, qList, qItem },
  data() {
    return {
      isSearch: false,
      transitionName: ''
    }
  },
  methods: {
    toSearchFriend() {
      this.isSearch = true;
    },
    close() {
      this.isSearch = false;
    }
  },
}
</script>
<style lang="stylus" scoped>
  .addfriend 
    padding-top $hd-bar-height 
    .user-search
      color #717171
      .search-icon 
        margin-right $pxTorem(20)
    .search-friend-view 
      transform translateY(0)  
      position absolute 
      top 0 
      left 0
      width 100% 
      height 100vh
      z-index 70
      background #f2f2f2
      opacity 1
   
      


</style>
<style lang="stylus">

</style>



