<template >
  <ul class="ui-list ui-list-single ui-list-link ui-border-tb">
    <li class="ui-border-t">
        <div class="ui-list-info">
            <h4 class="ui-nowrap">性别</h4>
            <div class="ui-txt-info">男</div>
        </div>
    </li>
  </ul>  
  
   
</template>
<script>
export default {
  data() {
    return {
      nameIsSet: false,
      value: '',
      person: '',
      msg: '',
      smsg: ''
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
  input 
    border 1px solid #000
</style>




