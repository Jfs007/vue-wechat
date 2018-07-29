<template lang="pug">
  div.all-request
    hd-bar.messages-hd-bar( title-name="好友通知" )
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
        span 返回
    cube-scroll.all-request__main    
      request-list
</template>
<script>
import hdBar from '@/components/hd-bar'
import requestList from '@/components/request-list'
import { socketEmit } from '@/socket/socket'
import { mapState, mapMutations } from 'vuex'
import { Scroll } from 'cube-ui'
export default {
  components: {hdBar, requestList, cubeScroll: Scroll},
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
  },

  methods: {
    ...mapMutations('user', ['agreeRequest']),
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
  .all-request 
    padding-top $hd-bar-height
    .all-request__main     
      height calc(100vh- 4rem )

</style>


