<template>
  <div class="shopcar-page">
    <div class="g-content-wrap" @click="toggleList">
      <div class="m-content-left">
        <div class="m-logo-wrap">
          <div class="m-logo" :class="{higlight:totalCount !== 0}">
            <span class="icon-shopping_cart" :class="{highlight:totalCount !== 0}"></span>
          </div>
          <div class="u-number" v-show="totalCount !== 0">{{totalCount}}</div>
        </div>
        <div class="m-price" :class="{highlight:totalPrice !==0}">￥{{totalPrice}}元</div>
        <div class="m-desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div v-if="totalPrice === 0" class="m-content-right">
        ￥{{minPrice}}元起送
      </div>
      <div v-if="totalPrice<minPrice && totalPrice !==0" class="m-content-right">
        还差￥{{minPrice - totalPrice}}元起送
      </div>
      <div v-if="totalPrice>=minPrice" class="m-content-right" :class="{highlight:totalPrice>=minPrice}">
        去结算
      </div>
    </div>
    <div class="g-ball-wrap">
      <transition-group name="drop"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter">
        <div v-for="(ball,index) in balls" :key="index" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="g-shopcart-list" v-show="listShow">
        <div class="m-list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="m-list-content">
          <ul class="g-lists">
            <li class="m-list-item" v-for="(food,index) in selectedFood" :key="index">
              <span class="u-name">{{food.name}}</span>
              <div class="m-price">
                <span class="u-price">￥{{food.price * food.count}}</span>
              </div>
              <div class="m-cart-wrapper">
                <cart-controller :food="food"></cart-controller>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import CartController from "../../components/cartcontroller/cartcontroller.vue"

  export default {
    components: {
      CartController
    },
    props: {
      selectedFood: {
        type: Array
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: false
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectedFood.forEach(item => {
          total += item.price * item.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectedFood.forEach(item => {
          count += item.count;
        });
        return count;
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        return !this.fold;
      }
    },
    created() {
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el, done) {
        /**/
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcar-page {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    height: 48px;
    background: #000;
    .g-content-wrap {
      display: flex;
      background: #141d27;
      font-size: 0;
      width: 100%;
      .m-content-left {
        flex: 1;
        .m-logo-wrap {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background: #141d27;
          z-index: 100;
          .m-logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            &.higlight {
              background: rgb(0, 160, 220)
            }
            .icon-shopping_cart {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight {
                color: #fff
              }
            }
          }
          .u-number {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 400;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
          }
        }
        .m-price {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin-top: 12px;
          box-sizing: border-box;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          &.highlight {
            color: #fff
          }
        }
        .m-desc {
          display: inline-block;
          vertical-align: top;
          margin: 12px 0 0 12px;
          line-height: 24px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
    .m-content-right {
      flex: 0 0 105px
      width: 105px;
      line-height: 44px;
      text-align: center;
      background: #2b343c;
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
      font-weight: 700;
      &.highlight {
        background: #00b43c;
        color: #fff;
      }
    }
    .drop-enter-active {
      transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .g-ball-wrap {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 1s linear;
        }
      }
    }
    .fold-enter-active {
      animation-name: foldOut;
      animation-duration: .4s;
      animation-fill-mode: both;
      animation-timing-function: linear;
    }
    .fold-leave-active {
      animation-name: foldIn;
      animation-duration: .4s;
      animation-fill-mode: both;
      animation-timing-function: linear;
    }
    @keyframes foldOut {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(0, -100%);
      }
    } @keyframes foldIn {
        0% {
          transform: translate(0, -100%);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    .g-shopcart-list {
      position: absolute;
      left: 0;
      bottom: 47px;
      z-index: -1;
      width: 100%;
      max-height: 65vh;
      .m-list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .m-list-content {
        padding: 0 18px;
        overflow: hidden;
        background: #fff;
        .g-lists {
          .m-list-item {
            position: relative;
            padding: 12px 0;
            box-sizing: border-box;
            border-px(1px, rgba(7, 17, 27, 0.1));
            .u-name {
              line-height: 24px;
              font-size: 14px;
              color: rgb(7, 17, 27);
            }
            .m-price {
              position: absolute;
              right: 90px;
              bottom: 12px;
              line-height: 24px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240, 20, 20);
              .u-price {

              }
            }
            .m-cart-wrapper {
              position: absolute;
              right: 0;
              bottom: 6px;
            }
          }
        }
      }
    }
  }
</style>
