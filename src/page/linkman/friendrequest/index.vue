<template lang="pug">
  div.friend-request
    hd-bar.messages-hd-bar( title-name="好友申请" )
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
        span 返回
    cube-scroll.friend-request__main  
      q-list 
        q-item.request-user( :is-link="true", @click.native="toUserCard") 
          div.request-user__avatar.q-avatar( slot="icon") 
            img( :src="requestUser.avatar")
          div.request-user__info( slot="label")
            h1.request-user__nickname 
              | {{requestUser.nickname}}
            p.request-user__mutual-friend 
              | {{requestDetail.mutualFriend.length }}个共同好友
        q-item.request-exact
          div( slot="label") 
            div.request-label 附加消息
            span.request-label__item  {{requestDetail.authInfo}} 
          div.request-label( slot="value")
            .q-btn.q-btn_mini 回复 
        q-item.request-origin 
          div( slot="label") 
            div.request-label 来源
            span.request-label__item  {{requestDetail.origin}}   
      div.request-exec-item 
        button.q-btn( @click="reject") 拒绝
        button.q-btn.q-btn_primary( @click="agree" ) 同意

</template>
<script>
 import qList from '@/components/q-list';
 import qItem from '@/components/q-item';
import hdBar from '@/components/hd-bar'
import { mapState, mapMutations, mapActions} from 'vuex'
import { Scroll } from 'cube-ui';
import { socketEmit } from '@/socket/socket'
import friendRequest from '@/util/friendRequest';
let friendquest = new friendRequest();
export default {
  components: {
    hdBar, 
    cubeScroll: Scroll, 
    qList, 
    qItem},
  data() {
    return {
      requestDetail: {
        mutualFriend: []
      },
    }
  },

  computed: {
    ...mapState('user', ['friendRequest']),
    requestUser() {
      return this.requestDetail.creater || {}
    }
  },
  async created() {
    let res = await socketEmit('getRequestDetail', {
      id: this.$route.params.id
    });
    res.data.origin = friendquest.originType(res.data.origin);
    this.requestDetail = res.data;
  },
  methods: {
    ...mapMutations('user', ['agreeRequest']),
    ...mapActions('user', ['initRequestList']),
    agree() {
      let id = this.$route.params.id;
      socketEmit('agreeFriend', {id }).then(res => {
        // console.log(res)
        this.initRequestList();
        this.$router.go(-1)
      })
    },
    reject() {
      let id = this.$route.params.id;
      console.log('reject')
      socketEmit('rejectFriend', {id }).then(res => {
        this.initRequestList();
        this.$router.go(-1)
        // console.log(res)
        // this.agreeRequest(index);
      })
    },
    toUserCard() {
      this.$router.push({
        name: 'usercard',
        params: {
          account: this.requestUser.account
        }
      })
    }

  },
  filters: {
    
  }
}
</script>
<style lang="stylus" scoped>
  .friend-request 
    padding-top $hd-bar-height
    .friend-request__main
      padding-top $pxTorem(44)     
      height calc(100vh- 4rem)
      .request-user
        .q-avatar 
          width $pxTorem(124)
          height $pxTorem(124)
        .request-user__info 
          margin-left $pxTorem(28)
          .request-user__nickname 
            font-size $pxTorem(40) 
          .request-user__mutual-friend 
            font-size $pxTorem(30) 
            color #bfbfbf
      .request-exact 
        .q-btn.q-btn_mini
          padding $pxTorem(10) $pxTorem(40)
          color #000      
      .request-label 
        font-size $pxTorem(40) 
        color #cfcfcf 
        width $pxTorem(192) 
        padding-right $pxTorem(20) 
        display inline-block
      .request-exec-item  
        padding $pxTorem(24) $pxTorem(12)
        display flex 
        .q-btn 
          flex 1
          margin 0 $pxTorem(12)



</style>
<style lang="stylus">
// .friend-request
//   .user-friend-set
//     width 100vw 
//     height 100vh
//     position absolute 
//     top 0 
//     left 0 
//     background-color #ffffff
//     z-index 80
//     transform translateY(0)
//     opacity 1
//   .fade-enter-active, .fade-leave-active 
//     transition: all 0.25s;  
//   .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
//     opacity: 0;
//     transform translateY(100%)
</style>
