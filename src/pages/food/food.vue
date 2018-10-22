<template>
  <transition name="move">
    <div class="food-page" v-show="pageShow">
      <div class="g-food-content">
        <div class="m-image-header">
          <img :src="food.image" class="u-image"/>
          <div class="m-back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="m-content">
          <h1 class="m-title">{{food.name}}</h1>
          <div class="m-detail">
            <span class="u-seller-count">月售{{food.sellCount}}份</span>
            <span class="u-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="m-price">
            <span class="u-now">￥{{food.price}}</span><span class="u-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
      },
      hide() {
        this.pageShow = false;
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
    &.move-enter-active, &.move-leave-active {
      transform: translate3d(0, 0, 0);
      transition: all 0.2s linear;
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .g-food-content {

      .m-image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .u-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .m-back {
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift {
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
          }
        }
      }
      .m-content {
        padding: 18px;
        .m-title {
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .m-detail {
          margin-bottom: 18px;
          line-height: 10px;
          height: 10px;
          font-size: 0;
          .u-seller-count {
            font-size: 10px;
            color: rgb(147, 153, 159);
            margin-right: 12px;
          }
          .u-rating {
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .m-price {
          font-weight: 700;
          line-height: 24px
          .u-now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20)
          }
          .u-old {
            font-size: 10px;
            text-decoration: line-through;
            color: rgb(147, 153, 159)
          }
        }
      }
    }
  }
</style>
