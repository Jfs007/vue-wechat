<template lang="pug">
  div.linkman
    hd-bar.messages-hd-bar( title-name="联系人", ref="hdBar" )
      div( slot="sec-r" ) 
        span( @click="$router.push({name: 'addfriend'})") 添加
    cube-scroll.main( ref="main-scroll", @scroll="mainScroll", :scrollEvents="scrollEvents") 
      div.link-block
        q-list.link-list
          q-item( :isLink="true", title="新朋友", @click.native="$router.push({name: 'newfriend'})")
            dot( slot="value", :num="unReadRequest")
      .chat-targets( ele-key="11" )
        div.chat-targets-bar( ref="tab" )
          cube-tab-bar( 
            v-model="currTab",
            :data="tabLabels",
            :showSlider="true"
          )
        div.chat-targets-container
          cube-slide( 
            :autoPlay="false",
            :showDots="false",
            :loop="false", 
            :initial-index="initialIndex" )  
            cube-slide-item 
              chat-friend
            cube-slide-item
            cube-slide-item  
            cube-slide-item
            cube-slide-item
                
    bt-tab
</template>
<script>
import {getRootOffset} from '@/util/dom.js'
import btTab from '@/components/bt-tab'
import hdBar from '@/components/hd-bar'
import chatFriend from '@/components/linkman/friend.vue';
import {mapActions, mapState } from 'vuex';
import qItem from '@/components/q-item';
import qList from '@/components/q-list';
import {TabBar, Slide, Scroll } from 'cube-ui';
import dot from '@/components/dot';
const { Item } = Slide;
export default {
  name: 'linkman',
  components: { 
    cubeTabBar: TabBar,
    cubeSlide: Slide,
    cubeSlideItem: Item,
    cubeScroll: Scroll,
    chatFriend,
    btTab, 
    hdBar, 
    dot,
    qItem,
    qList },
  data() {
    return {
      currTab: '好友',
      tabLabels: [{
          label: '好友'
      }, {
        label: '群聊'
      }, {
        label: '设备'
      },
      {
        label: '通讯录'
      },{
        label: '公众号'
      }
      ],
      scrollEvents: ['scroll'],
      posY: 0
    }
  },
  computed: {
    ...mapState('user', ['friendList', 'userInfo', 'friendRequest', 'unReadRequest']),
    initialIndex () {
      let index = 0;
      this.tabLabels.find((item, idx) => {
        if(item.label === this.currTab) {
          index = idx;
          return true;
        }
      });
      return index;
    },
    
  },
  created() {
    this.initFriendList();
  },
  mounted() {
  },
  methods: {
    ...mapActions('user', ['initFriendList', 'createRoom']),
    toUserCard(chater) {
      this.$router.push({
        name: 'usercard',
        params: {
          account: chater.account
        }
      })
    },
    mainScroll({x, y}) {
      this.posY = y;
    }
  }
  
}
</script>
<style lang="stylus" scoped>
  .linkman 
    padding-top $hd-bar-height
  .main
    box-sizing content-box 
    .chat-targets
      margin-top $pxTorem(24)
      background-color #fff 
  
</style>
<style lang="stylus">
  .linkman
    .cube-tab-bar
      background-color: white
    .cube-tab, .cube-tab_active
      color: $color-primary
      padding $pxTorem(38) 0
      font-size $pxTorem(38)
    .cube-tab-bar-slider
      background-color: $color-primary
      height $pxTorem(10)
    .cube-scroll-content 
      min-height 100vh 
      padding-bottom $pxTorem(429)  

</style>


