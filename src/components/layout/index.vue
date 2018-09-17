<template>
  <div class="index-page">
    <headers></headers>
    <div class="g-tab border-px">
      <div class="m-table-item" :class="{active:currentRouter === 'goods'}" @click="goTo('goods')">商品</div>
      <div class="m-table-item" :class="{active:currentRouter === 'ratings'}" @click="goTo('ratings')">评论</div>
      <div class="m-table-item" :class="{active:currentRouter === 'sellers'}" @click="goTo('sellers')">商家</div>
    </div>
    <div class="g-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  import Headers from "../header/index.vue"

  export default {
    components: {
      Headers
    },
    data() {
      return {
        currentRouter: 'goods'
      }
    },
    created() {
      this.$router.push({
        name: this.currentRouter
      })
    },
    methods: {
      goTo(type) {
        this.currentRouter = type;
        this.$router.push({
          name: type
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .index-page
    .g-tab
      display: flex
      width: 100%
      height: 48px
      line-height 48px
      border-px(1px, rgba(7, 17, 27, 0.1))
      .m-table-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77, 85, 93)
      .active
        color: rgb(240, 20, 20)
</style>
