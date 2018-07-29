<template lang="pug">
  div.user-card 
    hd-bar.messages-hd-bar( title-name="个人资料" )
      span( slot='sec-l', @click="$router.go(-1)")
        span.iconfont.icon-fanhui 
        span 返回
      div( slot="sec-r" ) 
    cube-scroll.cube-scroll
      div.user-card__info  
        .user-info__top
          .user-infotop__avatar  
            img( :src="cardInfo.avatar")
          .user-infotop__about 
            .user-ita__nickname {{cardInfo.nickname}}
            .user-ita-persion-info 
              span.user-ita__tag {{cardInfo.age}}岁
              span.user-ita__tag {{cardInfo.sex=== 1 ? '男': '女'}}
        .user-info__main
          q-list.user-info-list
            q-item( :title="cardInfo.account", :isLink="true")
              span( slot="icon")
                span.icon.iconfont.icon-qq3
            q-item( :is-link="true") 
              span( slot="icon")
                span.icon.iconfont.icon-lianxiren1
              span( slot="label") 
                | {{cardInfo.sex=== 1 ? '男': '女'}} 
                | {{cardInfo.constellation}}座 
            q-item( :title="`${cardInfo.nickname}的空间`", :is-link="true") 
              span( slot="icon")
                span.icon.iconfont.icon-QQkongjian  
    .user-card__footer
      .q-btn.q-btn_primary( @click="editInfo", v-if="cardInfo.account === userInfo.account" ) 编辑资料
      .q-btn( @click="addFriend", v-else-if="!isFriend" ) 加好友
      .q-btn.q-btn_primary( @click="toChat", v-else) 发消息
    transition( name="fade", v-bind:css="true" )
      router-view.user-friend-add 

</template>
<script>
import { socketEmit } from '@/socket/socket'
import {mapState, mapMutations} from 'vuex'
import TempRoom from '@/util/tempRoom.js'
import Message from '@/util/message'
import qItem from '@/components/q-item';
import qList from '@/components/q-list';
import hdBar from '@/components/hd-bar';
import { Scroll } from 'cube-ui'
import { dateBirth } from '@/util/misc';

let message = new Message();
export default {
  components: {qItem, qList, hdBar, cubeScroll: Scroll },
  data() {
    return {
      cardInfo: {},
      isFriend: false
    }
  },

  computed: {
    ...mapState('user', ['userInfo', 'tempRoomList']),
  },
  created() {
    socketEmit('getUserInfo', {account: this.$route.params.account}).then(res => {
      this.cardInfo = res.data.user;
      this.isFriend = !!res.data.isFriend;
      let age = dateBirth.getAge(this.cardInfo.birthday);
      let constellation = dateBirth.getConstellation(this.cardInfo.birthday);
      this.cardInfo.age = age;
      this.cardInfo.constellation = constellation;
      this.cardInfo.id = res.data.user._id;
    }).catch(err => {
    });
  },
  
  methods: {
    ...mapMutations('user', ['createRoom', 'changeRoom', 'setChatRecords', 'initEditUserForm']),
    addFriend() {
      let { _id } = this.cardInfo;
      
      // socketEmit('addFriend', { to: _id }).then(res => {
      // })
      this.$router.push({
        name: 'friendadd',
        params: {
          id: _id
        },
        query: {
          origin: this.$route.query.origin
        }
      })
    },
    editInfo() {
      this.initEditUserForm();
      this.$router.push({
        name: 'edituser'
      })
    },
    async toChat() {
      let chater = this.cardInfo;
      
      let tempRoom = new TempRoom(this.tempRoomList);
      let index = tempRoom.tempRoomisExit({ chatType: 'private', id: chater.id });
      if(index>=0) {
        this.changeRoom(index);
        this.$router.push({
          name: "chat",
          params: {
            id: chater.id
          }
        })
      }else {
        let room = tempRoom.createRoom({chatType: 'private', id: chater.id, info: chater });
        this.createRoom(room);
        this.changeRoom(0);
        this.$router.push({
          name: "chat",
          params: {
            id: chater.id
          }
        })
        // 获取消息记录
        let chatRecords = await socketEmit('getPrivateMsg', {
          to: chater.id,
          limit: 10
        });
        chatRecords = message.execMessage({
          chatRecords: chatRecords.data,
          chaterId:  chater.id,
          userInfo: this.userInfo,
        });
        // 设置消息记录
        this.setChatRecords({
          index: 0,
          chatRecords
        })
      }
      
    }
  }
}
</script>
<style lang="stylus" scoped>


    
// 子页面动画效果


.user-card  
  position relative
  background-image url('../images/login2.jpg')
  background-repeat no-repeat 
  background-size 100% auto
  .cube-scroll 
   height 100vh 
  .user-card__info 
    padding-top $hd-bar-height
    height 100vh
    display flex 
    flex-direction column
    .user-info__top
      padding 0 $pxTorem(36) 
      padding-bottom $pxTorem(72)
      padding-top $pxTorem(140)
      display flex 
      align-items flex-end
      .user-infotop__avatar 
        width $pxTorem(216)
        height $pxTorem(216) 
        border-radius 50% 
        img 
          width 100% 
          height 100% 
          border-radius 50%  
      .user-infotop__about 
        padding-left $pxTorem(44) 
        .user-ita__nickname 
          font-size $pxTorem(50)
          padding-bottom $pxTorem(28)
        .user-ita__tag
          padding $pxTorem(10) $pxTorem(24) 
          background-color rgba(255, 255, 255, 0.8)
          font-size $pxTorem(28)  
          margin-right $pxTorem(12)
          border-radius 6px
    .user-info__main 
      flex 1   
      flex-grow: 1; 
      .user-info-list
        .icon 
          font-size $pxTorem(40)
          padding-right $pxTorem(32)
          color #979998
        
  .user-card__footer 
    width 100vw
    position absolute
    bottom 0 
    left 0
    z-index 5
    padding $pxTorem(12) $pxTorem(28) 
    display flex
    justify-content space-between
    border-top 1px solid  #cbcbcb 
    background-color #f2f2f2
    .q-btn 
      width 100vw
      text-align center

</style>
<style lang="stylus">

.user-card  
  .user-info__main
    background-color rgba(255, 255, 255, 0.6)
    .q-list
      .q-list__content  
        background-color transparent
  .user-friend-add
    width 100vw 
    height 100vh
    position absolute 
    top 0 
    left 0 
    background-color #ffffff
    z-index 80
    transform translateY(0)
    opacity 1
  .fade-enter-active, .fade-leave-active 
    transition: all 0.25s;  
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
    opacity: 0;
    transform translateY(100%)

</style>




