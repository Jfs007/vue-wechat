<template lang="pug">
  .avatar-upload 
    .avatar-upload-img.q-avatar 
      img( :src="innerUrl" )
    input.avatar-input( type="file", ref="fileUpload", @change="upload" )  

</template>
<script>
import {avatarUplad} from '@/api/upload';
export default {
  props: {
    url: String
  },
  data() {
    return {
      innerUrl: this.url
    }
  },
  created() {

  },
  methods: {
    async upload(e) {
      let file = e.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        const imgDataUrl = event.target.result;
        this.innerUrl = imgDataUrl;
      };
      let formData = new FormData()
      formData.append('avatar', file);
      let ret = await avatarUplad(formData);
      console.log(ret, 'ret')
      // this.$refs['fileUpload'].click();
    },
    getBase64() {

    }
  }
}
</script>
<style lang="stylus" scoped>
  .avatar-upload  
    margin 0 auto
    position relative
    .avatar-upload-img
      width 100%
      height 100%
    .avatar-input 
      position absolute 
      left 0 
      top 0 
      right 0 
      bottom 0
      width 100%
      opacity 0
      z-index 4
    
</style>


