<template lang="pug">
  div.linkman_friend 
    q-list( :no-top="true" )
      q-item.linkman-item(  
        :key="user.id",
        v-for="user in friendList",
        @click.native="toUserCard(user)" )
        div.q-avatar( slot="icon")
          img( :src="user.avatar" )
        div.linkman-item__info( slot="label") 
          .item-info__top  
            span.iit-nickname {{user.remarkname}}
          .item-info__bot 
            span.iib-device [{{user.device}}]
       
</template>
<script>
import qItem from '@/components/q-item';
import qList from '@/components/q-list';
import {mapActions, mapState } from 'vuex';
export default {
  components: {qItem, qList},
  created() {
    this.initFriendList();
  },
  computed: {
    ...mapState('user', ['friendList'])
  },
  methods: {
    ...mapActions('user', ['initFriendList']),
    toUserCard(chater) {
      this.$router.push({
        name: 'usercard',
        params: {
          account: chater.account
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .linkman_friend 
    .linkman-item 
      .q-avatar 
        width $pxTorem(100)
        height $pxTorem(100)
      .linkman-item__info 
        margin-left $pxTorem(32)
        text-align left 
        .item-info__top 
          margin-bottom $pxTorem(4)
          .iit-nickname
            font-size $pxTorem(56) 
        .item-info__bot 
          .iib-device 
            font-size $pxTorem(32) 
            color #989898    

</style>
<style lang="stylus">
  .linkman_friend 
    .q-item
      padding-top $pxTorem(16)   
      padding-bottom $pxTorem(16)   
</style>




