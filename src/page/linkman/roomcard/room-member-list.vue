<template lang="pug">
  .room-member-list
    hd-bar( title-name='群聊成员')
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
        span 返回
    cube-scroll    
      q-list( v-if="roomMenbers.length")
        q-item( v-for="user in roomMenbers",  @click.native="toUserCard(user.user)", :key="user._id")
          .room-member-avatar.q-avatar( slot="icon")
            img( :src="user.user.avatar" )
          .room-member-info( slot="label")  
            span.q-tag.rmi-tag.rmi-tag_room-manager( v-if="user.memberClass === 2") 群主
            span {{user.user.nickname}}
</template>
<script>
import hdBar from '@/components/hd-bar';
import {socketEmit} from '@/socket/socket';
import qList from '@/components/q-list';
import qItem from '@/components/q-item';
import {Scroll} from 'cube-ui'
export default {
  name: 'roomMemberList',
  components: {
    qList,
    qItem,
    hdBar,
    cubeScroll: Scroll
  },
  data() {
    return {
      roomMenbers: []
    }
  },

  async created() {
    let roomid = this.$route.params.id;
    let roomMenbers = await socketEmit('getRoomUsers', {
      roomid
    });
    this.roomMenbers = roomMenbers.data.roomUsers;

  },
  methods: {
    toUserCard(user) {
      this.$router.push({
        name: 'usercard',
        params: {
          account: user.account
        }
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.room-member-list 
  padding-top $hd-bar-height
  .q-avatar 
    width $pxTorem(90)
    height $pxTorem(90)
    margin-right $pxTorem(24)
  .room-member-info 
    font-size $pxTorem(42) 
    .rmi-tag 
      margin 0 $pxTorem(10)
      &.rmi-tag_room-manager 
        background-color #f5be23
      
      
</style>


