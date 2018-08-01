<template lang="pug">
  div.edit-user
    hd-bar.messages-hd-bar( title-name="编辑资料" )
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 返回 
    div.edit-user-main      
      q-list 
        q-field( label="头像", :readonly="true", @click.native="toSetAvatar")
        q-field( label="签名", :readonly="true")
      q-list 
        q-field( 
          label="昵称", 
          v-model="nickname", 
          :is-link="false",)
        q-field( 
          label="性别", 
          :readonly="true", 
          :is-link="false",
          @click.native="showGender", 
          :value="sex")
        q-field( 
          label="生日", 
          :readonly="true",
          @click.native="toEditBirthday", 
          :value="birthday"
          )
      q-list 
        q-field( label="邮箱", placeholder="你的邮箱", :is-link="false", v-model="email")
      q-list 
        q-field( label="个人说明", :readonly="true", placeholder="介绍一下自己吧")


</template>
<script>
import qField from '@/components/q-field';
import qList from '@/components/q-list';
import hdBar from '@/components/hd-bar';
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  components: {
    qField,
    hdBar,
    qList
  },
  data() {
    return {
      genderPick: null,
      form: {
        gender: {
          text: '男',
          value: 1
        }
      }
    }
  },
  computed: {
    sex() {
      return this.$store.state.user.editForms.sex === 0 ? '女': '男';
    },
    birthday() {
      return this.$store.state.user.editForms.birthday;
    },
    nickname: {
      set(value) {
         this.setEditUserField({ fieldName: 'nickname', value });
      },
      get() {
        return this.$store.state.user.editForms.nickname;
      }
    },
    email: {
      set(value) {
         this.setEditUserField({ fieldName: 'email', value });
      },
      get() {
        return this.$store.state.user.editForms.email;
      }
    }
  },
  created() {
    this.initPicker();
  },
  beforeRouteLeave(to, from, next) {
    this.updateUser();
    next();
  },
  methods: {
    ...mapMutations('user', ['setEditUserField']),
    ...mapActions('user', ['updateUser']),
    initPicker() {
      this.genderPick = this.$createPicker({
      title: ' ',
      selectedIndex: this.sex === '男' ? [0] : [1],
      data: [[{ text: '男', value: 1}, { text: '女', value: 0}]],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.setEditUserField({ fieldName: 'sex', value: selectedVal[0] });
      },
      onCancel: () => {
      }
    })
    },
    showGender() {
      this.genderPick.show()
    },
    toEditBirthday() {
      this.$router.push({
        name: 'birthday'
      })
    },
    toSetAvatar() {
      this.$router.push({
        name: 'avatar'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .edit-user 
    padding-top $hd-bar-height 

</style>

