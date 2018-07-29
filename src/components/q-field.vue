<template lang="pug">
  qItem.q-field( :is-link="isLink")
    div.q-field-wrapper( slot="label")
      label.q-field__label
        span {{label}}
      slot(name="input")   
        div.q-field__input
          input.q-field__inner-input( 
            :placeholder="placeholder", 
            v-model="innerValue",
            @change="change",
            :maxlength="maxlength",
            :readonly="readonly",
            @focus="focus",
            @blur="blur"
            )
    
</template>

<script>
import qItem from '@/components/q-item';
export default {
  components: {
    qItem
  },
  data() {
    return {
      innerValue: this.value
    }
  },
  props: {
    label: String,
    isLink: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    value: '',
    maxlength: {
      type: Number,
      default: 16
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newValue) {
      this.innerValue = newValue;
    },
    innerValue(newValue) {
      this.$emit('input', newValue);
    },
   
  },
  methods: {
    change() {
      this.$emit('change', this.innerValue);
    },
    focus() {
      this.$emit('focus', this.innerValue);
    },
    blur() {
      this.$emit('blur', this.innerValue);
    }

  }
 
}
</script>
<style lang="stylus" scoped>
  .q-field 
    .q-field-wrapper 
      display flex
      .q-field__label 
        width $pxTorem(217)
      .q-field__input
        flex 1  
        .q-field__inner-input
          width 100%



</style>

