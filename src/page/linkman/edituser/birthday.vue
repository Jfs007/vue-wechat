<template lang="pug">
  div.birthday
    hd-bar.messages-hd-bar( title-name="选择出生日期" )
      div( slot="sec-l", @click="$router.go(-1)" ) 
        span.icon.iconfont.icon-fanhui 
        span 返回 
    q-list 
      q-field( label="年龄", :readonly="true", :value="age", @click.native="showBirthday")
      q-field( label="星座", :readonly="true", :value="constellation", @click.native="showBirthday")      
</template>
<script>
import hdBar from '@/components/hd-bar';
import qField from '@/components/q-field';
import qList from '@/components/q-list';
import {mapState, mapMutations} from 'vuex'
import {dateBirth, dateFormat} from '@/util/misc';
export default {
  components: {
    hdBar, qField, qList
  },
  data() {
    return {
      birthdayDatePicker: null
    }
    
  },
  created() {
    this.initDatePicker()
    this.$nextTick(() => {
      this.showBirthday();
    })
  },
  computed: {
    birthday() {
      return this.$store.state.user.editForms.birthday;
    },
    age() {
      return dateBirth.getAge(this.birthday || '')+ '岁'
    },
    constellation() {
      return dateBirth.getConstellation(this.birthday || '')+ '座'
    }
  },
  methods: {
    ...mapMutations('user', ['initEditUserForm', 'setEditUserField']),
    initDatePicker() {
      let currDate = dateFormat(new Date(), 'yyyy-MM-dd');
      let birthday = this.birthday || currDate;
      let birthYMD = dateBirth.getYMD(birthday);
      let maxYMD = dateBirth.getYMD(currDate);
      let _this = this;
      this.birthdayDatePicker = this.$createDatePicker({
        title: ' ',
        min: new Date(1900, 7, 8),
        max: new Date(maxYMD.year, maxYMD.month, maxYMD.day),
        value: new Date(birthYMD.year, birthYMD.month, birthYMD.day),
        format: {
          year: 'yyyy年',
          month: 'MM月',
          date: 'DD日'
        },
        onSelect(value, date) {
          _this.setEditUserField({fieldName: 'birthday', value:date.join('-') })
        },
      })
    },
    showBirthday() {
      this.birthdayDatePicker.show()
    }
  }
}
</script>
<style lang="stylus" scoped>
.birthday 
  padding-top $hd-bar-height 

</style>


