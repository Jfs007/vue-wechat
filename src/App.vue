<template lang="pug">
  div#app
    slide-bar( :isFloder="!slideBarIsShow")
      page-view.page-view

</template>

<script>
import '@/style/iconfont.css';
import '@/style/common.styl';
import '@/style/animate.css';
import pageView from '@/components/page-view'
import slideBar from '@/components/slide-bar'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: { pageView, slideBar },
  data() {
    return {
      direction: 'forward',
    }
  },
  computed: {
     ...mapState('system', ['slideBarIsShow'])
  },
  created() {
  },
}
</script>


<style lang="stylus" scoped>


</style>

