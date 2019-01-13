<template>
 <div class="numcart">
  <span :class="{min:!isselect}" @click="min">-</span>
  <span
 :class="{active:!isselect,none:true}">{{value}}</span>
  <span @click="plus">+</span>
</div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      count: this.value
    }
  },
  watch: {
    count (curCount) {
      this.$emit('input', curCount)
      this.$emit('selectGoods')
    }
  },
  computed: {
    isselect () {
      return this.count > 0
    }
  },
  methods: {
    plus () {
      this.count++
    },
    min () {
      this.count--
    }
  }
}
</script>
<style>
.ul-right .numcart{
  position: absolute;
  right: 20px;
  bottom: 0;
}
.ul-right .numcart span.min{
  visibility: hidden;
}
.ul-right .numcart span{
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid red;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
}
.ul-right .numcart span.none{
  border: 0;
}
.ul-right .numcart span.active{
 visibility: hidden
}
</style>
