<template lang="pug">
  div.group-room
    q-list( :no-top="true" )
      q-item.linkman-item(  
        :key="room._id",
        v-for="room in roomList",
        @click.native="toChat(room)" )
        div.q-avatar( slot="icon")
          img( :src="room.avatar" )
        div.linkman-item__info( slot="label") 
          .item-info__top  
            span.iit-nickname {{room.name}}
       
</template>
<script>
import qItem from '@/components/q-item';
import qList from '@/components/q-list';
import {mapActions, mapState } from 'vuex';
export default {
  components: {qItem, qList},
  created() {
    this.initRoomList();
  },
  computed: {
    ...mapState('user', ['roomList'])
  },
  methods: {
    ...mapActions('user', ['initRoomList', 'changeRoom']),
    async toChat(room) {
      await this.changeRoom({
        id: room._id,
        chatType: 'group'
      });
      this.$router.push({
        name: 'chat',
        params: {
          id: room._id
        },
        query: {
          roomType: 'group'
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .group-room
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
            font-size $pxTorem(36) 
        .item-info__bot 
          .iib-device 
            font-size $pxTorem(32) 
            color #989898    

</style>
<style lang="stylus">
  .group-room 
    .q-item
      padding-top $pxTorem(16)   
      padding-bottom $pxTorem(16)   
</style>




