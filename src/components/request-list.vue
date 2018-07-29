
 <template lang="pug">
    div
      q-list.request-list( :title="showTitle ? '好友通知' : '' " )     
        q-item.request-item( 
          v-for='(request, index) in requestList',
          :key="request._id",
          @click.native="toFriendRequest(request, request.id)")
          .q-avatar.user-list__avatar( slot="icon" )
            img( :src="request.avatar") 
          .user-list__info( slot="label")  
            .center-info__nickname {{request.nickname}}
            .center-info__notice  {{ request.isFriendReq ? request.authInfo: '已发送验证'}}
          .user-list__right-info( slot="value" )
            span( v-if="request.acceptStatus === 1" ) 已同意
            span( v-else-if="request.acceptStatus === 2&&!request.isFriendReq") 对方拒绝了你的好友请求
            span( v-else-if="request.acceptStatus === 2&&request.isFriendReq") 已拒绝
            span( v-else-if= "!request.isFriendReq") 等待验证
            div.q-btn.q-btn_primary.q-btn_mini( v-else,
            @click.stop="agree(request.acceptStatus, request.id, index)") 同意
 </template>
 <script>
 import qList from '@/components/q-list';
 import qItem from '@/components/q-item';
 import { socketEmit } from '@/socket/socket'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {qList, qItem},
  data() {
    return {
      request_list: [],
      account: ''
    }
  },
  computed: {
    ...mapState('user', ['friendRequest']),
    requestList() {
      return this.showMax === 'max' ? this.friendRequest: this.friendRequest.slice(0, +this.showMax)
    }
  },
  props: {
    showMax: {
      type: [Number, String],
      default: 'max'
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  created() {
  },
  methods: {
    ...mapMutations('user', ['agreeRequest']),
    agree(acceptStatus, id, index) {
      if(acceptStatus === 0) {
        socketEmit('agreeFriend', {id: id }).then(res => {
          this.agreeRequest(index);
        })
      }
    },
    toFriendRequest(request, id) {
      if(request.acceptStatus !== 0||!request.isFriendReq) {
        this.$router.push({
          name: 'usercard',
            params: {
              account: request.account
            }
        });
        return;
      }

      this.$router.push({
        name: 'friendrequest',
        params: {
          id
        }
      })
    } 
  },
}
 </script>
 <style lang="stylus" scoped>
  .request-item
    color #bcbcbc 
    height $pxTorem(208) 
    padding 0 $pxTorem(28) 
    .user-list__avatar 
      margin-right $pxTorem(28)
      width $pxTorem(120) 
      height $pxTorem(120) 
    .user-list__info   
      .center-info__nickname
        font-size $pxTorem(40)   
        color #000
      .center-info__notice 
        font-size $pxTorem(28) 
      .center-info__origin  
        font-size $pxTorem(32)
    .user-list__right-info 
      font-size $pxTorem(30)    
 </style>
 <style lang="stylus">
  .request-item.q-item 
    padding 0 $pxTorem(28) 
 </style>
 
 
 

 

 