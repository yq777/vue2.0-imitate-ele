<template>
  <div class="food-page" v-show="pageShow">

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
      return {
        pageShow: false
      }
    },
    created() {
    },
    methods: {
      show() {
        this.pageShow = true;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food-page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    z-index: 30;
    background: #fff;
  }
</style>
