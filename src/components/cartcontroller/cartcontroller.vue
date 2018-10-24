<template>
  <div class="cart-control-page">
    <transition name="move">
      <div class="g-cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="m-inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="g-count" v-show="food.count>0">{{food.count}}</div>
    <div class="g-cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
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
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add-cart', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control-page {
    font-size: 0;
    .move-enter, move-leave-to {
      opacity: 0;
    }
    .move-enter-active {
      opacity: 1;
      transition: all .4s linear;
      animation: decreaseEnter .4s linear;
    }
    .move-leave-active {
      opacity: 1;
      transition: all .4s linear;
      animation: decreaseLeave .4s linear;
    }

    @keyframes decreaseEnter {
      0% {
        transform: translate3d(24px, 0, 0) rotate(180deg);
      }
      100% {
        transform: translate3d(0, 0, 0) rotate(0);
      }
    }

    @keyframes decreaseLeave {
        0% {
          transform: translate3d(0, 0, 0) rotate(0);
        }
        100% {
          transform: translate3d(24px, 0, 0) rotate(180deg);
        }
    }
    .g-cart-decrease {
      display: inline-block;
      padding: 6px;
      .m-inner {
        display: inline-block
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
      }
    }
    .g-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .g-cart-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
    }
  }
</style>
