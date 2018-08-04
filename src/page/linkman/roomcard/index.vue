<template lang="pug">
  .roomcard 
    hd-bar( title-name=' ')
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
    .roomcard-top( :style="topBg" ) 
      .roomcard-top-wrap
      .roomcard-romminfo 
        h1.rcr-name {{roomInfo.name}}
        p.rcr-room-no {{roomInfo.roomNo}}
    .roomcard-main 
      .roomcard-members 
        .roomcard-members__title(@click="toMemberList") 
          .rmt__label 群聊成员
          .rmt__membersnum 共{{userTotal}}人
            span.link.iconfont.icon-link
        .roomcard-members__content
          .member( v-for="user in roomMenbers", @click="toUserCard(user.user)" ) 
            .q-avatar 
              img( :src="user.user.avatar")
            h1.member-text.member-nickname.text_ellipsis {{user.user.nickname}} 
          .member.member_add 
            .member-icon_add
              span.iconfont.icon-tianjiajia 
            h1.member-text 邀请


</template>
<script>
import hdBar from '@/components/hd-bar';
import {socketEmit} from '@/socket/socket';
export default {
  components: {
    hdBar
  },
  data() {
    return {
      roomInfo: {},
      roomMenbers: [],
      userTotal: 0
      
    }
  },
  computed: {
    topBg() {
      let avatar = this.roomInfo.avatar;
      return {
        backgroundImage: `url(${avatar})`
      }
    }
  },
  async created() {
    let roomid = this.$route.query.id;
    let [roomInfo, roomUser] = await Promise.all([ 
      socketEmit('getRoomInfo', {
        roomid
      }),
      socketEmit('getRoomUsers', {
        limit: 9,
        roomid
      })
    ]);
    this.roomInfo = roomInfo.data;
    this.roomMenbers = roomUser.data.roomUsers;
    this.userTotal = roomUser.data.total;
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
    toMemberList() {
      this.$router.push({
        name: 'room_member_list',
        params: {
          id: this.$route.query.id
        }
      })

    }
  }
}
</script>
<style lang="stylus" scoped>
  .roomcard-top 
    height $pxTorem(471)
    padding 0 $pxTorem(23)
    padding-top $pxTorem(312)
    background-repeat no-repeat 
    background-size 100% 120% 
    background-position center center
    background-color rgba(0, 0, 0, 1)
    position relative
    .roomcard-top-wrap 
      position absolute 
      z-index 0
      top 0 
      left 0
      right 0 
      bottom 0 
      background-color rgba(0, 0, 0, 0.3)
    .roomcard-romminfo
      position relative 
      z-index 1
      color #ffffff
      .rcr-name  
        font-size $pxTorem(52)
        line-height 1
        margin-bottom $pxTorem(20)
      .rcr-room-no
        font-size $pxTorem(34) 
  .roomcard-main  
    .roomcard-members
      padding 0 $pxTorem(30)  
      padding-top $pxTorem(59)
      background-color #ffffff 
      .roomcard-members__title  
        display flex
        justify-content space-between
        align-items center
        .rmt__label
          font-size $pxTorem(40)  
        .rmt__membersnum 
          color #7f7f7f 
          font-size $pxTorem(28)
          .link 
            padding-left $pxTorem(18)
            color #c5c5c5 
      .roomcard-members__content 
        display flex 
        flex-wrap wrap
        padding-top $pxTorem(45) 
        .member
          text-align center
          margin-right $pxTorem(60) 
          margin-bottom $pxTorem(37)
          width $pxTorem(128) 
          &:nth-child(5) 
            margin-right 0 
          .q-avatar 
            width 100%
            height $pxTorem(128)
          .member-text 
            font-size $pxTorem(36)
            color #797979 
            margin-top $pxTorem(24)
          &.member_add  
            color $color-primary
            margin-right 0 
            .member-icon_add
              font-size $pxTorem(54) 
              width 100% 
              box-sizing border-box
              height $pxTorem(128) 
              border-radius 50% 
              border 1px solid $color-primary  
              line-height $pxTorem(128) 
              text-align center
            .member-text 
              color $color-primary  



</style>
<style lang="stylus">
  .roomcard  
    .hd-bar 
      background rgba(0, 0, 0, 0)!important
</style>


