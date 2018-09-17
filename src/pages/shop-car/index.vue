<template>
  <div class="shopcar-page">
    <div class="g-content-wrap">
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
  </div>
</template>

<script>
  export default {
    props: {
      selectedFood: {
        type: Array,
        default() {
          return [
            {
              price: 30,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    data() {
      return {}
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
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
  }
</style>
