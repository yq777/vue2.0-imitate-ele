<template>
  <div class="cart-controll-page">
    <div class="g-cart-decrease" v-show="food.count>0"></div>
    <div class="g-count" v-show="food.count>0">{{food.count}}</div>
    <div class="g-cart-add" v-show="food.count>0"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-controll-page {
    .g-cart-decrease {
      display: inline-block;
    }
    .g-count {

    }
    .g-cart-add {

    }
  }
</style>
