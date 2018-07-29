<template lang="pug">
  div.slide-bar( :class="{ 'slide-bar_unfold': !isFloder}" ) 
    section.slide-bar__area
      .user-about
        .user-info
          .user-bg
          div.user-info__hd 
            .q-avatar.user-info-avatar( @click="toPersonInfo(userInfo.account)")
              img( :src="userInfo.avatar")
            .user-info-nickname {{userInfo.nickname}}
        .user-about-list
          .user-about-item 
            span  了解会员特权
          .user-about-item 
            span  QQ钱包
          .user-about-item 
            span  个性装扮
          .user-about-item 
            span  我的收藏
          .user-about-item 
            span  我的相册
          .user-about-item 
            span  我的文件
          .user-about-item 
            span  免流量特权
        .user-about-ft 
          .ft-item.user-setting(@click="toSetting")
            div.ft-item__icon
              span.iconfont.icon-desktophdcopy6 
            div 设置
          .ft-item.user-time 
            div.ft-item__icon
              span.iconfont.icon-yejian
            div 夜间
          .ft-item.user-address
            div.ft-item__icon 
              span {{weather.temperature}}°
            div {{weather.province}}
    .slide-right
      .slide-right__wrap( v-show="!isFloder", @click="closeSlideBar" )
      slot

</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'slideBar',
  data() {
    return {
      // isFloder: false
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapState('system', ['weather'])
  },
  props: {
    isFloder: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isFloder(isFloder) {
      if(!isFloder) {
        this.setWeather();
      }
    }
  },

  methods: {
    ...mapMutations('system', ['closeSlideBar']),
    ...mapActions('system', ['setWeather']),
    toSetting() {
      this.$router.push({
        name: 'setting'
      })
    },
    toPersonInfo(account) {
      // this.closeSlideBar();
      this.$router.push({
        name: 'usercard',
        params: {
          account
        }
      })
    }
    // f() {
    //   this.isFloder = !this.isFloder
    // }
  },
}
</script>

<style lang="stylus" scoped>
  @keyframes bgMove 
    0% 
      background-position 0 0
    3%  
      background-position 0 0
    50% 
      background-position 0 100%  
    55%  
      background-position 0 100%  
    100% 
      background-position 0 0  
  
  .slide-bar 
    height 100vh 
    overflow-x hidden
    .slide-bar__area
      background-color #ffffff
      border-right 1px solid #D9D9D9 
      position absolute
      height 100%
      width $pxTorem(780) 
      left 0 
      right 0
      display none
    .user-about
      .user-info
        height $pxTorem(464)
        padding 0 $pxTorem(44)
        padding-top $pxTorem(220)
        position relative
        animation: bgMove 27s linear infinite;
        animation-iteration-count infinite
        background-image url('../images/login2.jpg')
        background-repeat no-repeat 
        background-size 100% auto
        background-position: 0px 0px;
        .user-info__hd 
          display flex
          align-items flex-end
          .user-info-avatar 
            width $pxTorem(96) 
            height $pxTorem(96) 
            border 2px solid #ffffff
          .user-info-nickname 
            font-size $pxTorem(60) 
            margin-left $pxTorem(32) 
            color #fff 
      .user-about-list
        padding 0 $pxTorem(50)
        padding-top $pxTorem(64)  
        .user-about-item 
          display flex
          padding-bottom $pxTorem(56)
          font-size $pxTorem(44) 
      .user-about-ft
        position absolute
        bottom $pxTorem(40) 
        left $pxTorem(50)  
        width $pxTorem(400) 
        display flex 
        font-size $pxTorem(32)
        justify-content space-between
        .ft-item 
          .ft-item__icon 
            text-align center
            color #5c6276 
            font-size $pxTorem(44) 
            padding-bottom $pxTorem(16)

    .slide-right
      transition all .25s
      transform translateX(0) 
  .slide-bar_unfold
    .slide-bar__area 
      display block
    .slide-right
      transform translateX($pxTorem(780)) 
      position relative
      .slide-right__wrap 
        position absolute
        left 0
        right 0 
        top 0 
        bottom 0 
        background-color rgba(0, 0, 0, 0.5)
        z-index 100
</style>

