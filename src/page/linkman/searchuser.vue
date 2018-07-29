<template lang="pug">
  div.search-user 
    section.search-section( @keydown.enter="search" )
      q-input.search-input( v-model="keyword" )
      .search-section-cancel( @click="close" ) 取消
    .search-rs( v-show="userList.length" )
      q-list.search-user-list
        q-item( 
          :key="user.id",
          v-for="user in userList",
           @click.native="toUserCard(user.account)")
          .q-avatar( slot="icon" )
            img( :src="user.avatar" )
          .user-info( slot="label" )
            div.user-info__top
              span.user-info__nickname {{user.nickname}}
              span.user-info__account   ({{user.account}})
   
</template>
<script>
import { socketEmit } from '@/socket/socket'
import qInput from '@/components/q-input'
import qList from '@/components/q-list'
import qItem from '@/components/q-item'
export default {
  name: 'searchUser',
  components: {qInput, qList, qItem},
  data() {
    return {
      keyword: '',
      userList: []
    }
  },
  methods: {
    toUserCard(account) {
      this.$router.push({
        name: 'usercard',
        params: {
          account 
        },
        query: {
          origin: 0
        }
      })
    },
    close() {
      this.$emit('close');
    },
    search() {
      if(this.keyword === '') { this.userList = []; return; };
      socketEmit('searchUser', { keyword: this.keyword }).then(res => {
        let data = res.data;
        this.userList = data;
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .search-user 
    .user-list 
      border-bottom 1px solid #cccccc

  .search-section 
    padding $pxTorem(10) $pxTorem(24)
    background-color #fff 
    display flex 
    align-items center
    .search-section-cancel
      color $color-primary
      width $pxTorem(140)
      padding-left $pxTorem(48)
    .search-input 
      flex 1  
  .search-user-list 
    margin-top 1px
    color #707070
    .q-avatar
      width $pxTorem(100) 
      height $pxTorem(100) 
    .user-info 
      padding-left $pxTorem(36)
      .user-info__nickname
        color #28b7e3 

</style>


