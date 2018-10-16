<template>
  <div class="cart-controll-page">
    <transition name="move">
      <div class="g-cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="m-inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <transition name="move">
      <div class="g-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="g-cart-add icon-add_circle" @click="addCart"></div>
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
  .cart-controll-page {
    font-size: 0;
    .move-enter, move-leave-to {
      opacity: 1;
      transform: translate3D(0, 0, 0);
    }
    .move-enter-active, .move-leave-active {
      opacity: 0;
      transform: translate3D(24px, 0, 0);
    }

    .g-cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all 0.4s linear;
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
      transition: all 0.4s linear;
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
