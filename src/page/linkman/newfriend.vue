<template lang="pug">
  div.new-friend
    hd-bar.messages-hd-bar( title-name="新朋友" )
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
        span 联系人
      div( slot="sec-r" ) 
        span( @click="$router.push({name: 'addfriend'})") 添加
    .main 
      .friend-request 
        request-list( show-max="3", :show-title="true")  
        .friend-request__more( @click="$router.push({name: 'allrequest'})") 
          span 查看更多
          span.iconfont.icon-link      

</template>
<script>
import hdBar from '@/components/hd-bar'
import requestList from '@/components/request-list'

import { socketEmit } from '@/socket/socket'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {hdBar, requestList },
  data() {
    return {
      request_list: [],
      account: ''
    }
  },
  computed: {
    ...mapState('user', ['friendRequest'])
  },
  created() {
    this.removeUnReadrequest();
  },

  methods: {
    ...mapMutations('user', ['agreeRequest', 'removeUnReadrequest']),
    agree(acceptStatus, id, index) {
      if(acceptStatus === 0) {
        socketEmit('agreeFriend', {id: id }).then(res => {
          // console.log(res)
          this.agreeRequest(index);
        })
      }
    }
  },
  filters: {
    
  }
}
</script>
<style lang="stylus" scoped>
  .new-friend   
    padding-top $hd-bar-height 
  .friend-request 
    .friend-request__header
      padding $pxTorem(18) $pxTorem(28) 
      color #767779 
      font-size $pxTorem(40)
    .friend-request__more  
      color #bcbcbc 
      padding $pxTorem(36) 0 
      text-align center 
      border-bottom 1px solid #efefef
      background-color #ffffff
      line-height 1 
      font-size $pxTorem(40)   

      



</style>


