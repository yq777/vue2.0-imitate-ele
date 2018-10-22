<template>
  <div class="goods-page">
    <div class='g-menu' ref="menuwrapper">
      <ul>
        <li v-for="(item,index) in goods" @click="selectMenu(index,$event)" :class="{current:currentIndex === index}"
            :key="index" class="m-menu-item">
          <div class="m-text border-px">
            <span v-show="item.type>0" class="u-icon" :class="classMap[item.type]"></span>{{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="g-foods" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="m-food-list food-list-hook">
          <h1 class="u-title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,foodIndex) in item.foods" @click="selectFood(food,$event)" :key="foodIndex" class="m-food-item border-px"
                :class="{last_child:foodIndex === (item.foods.length-1)}">
              <div class="m-icon">
                <img :src="food.icon" width="57px" height="57px"/>
              </div>
              <div class="m-content">
                <h2 class="u-name">{{food.name}}</h2>
                <p class="u-desc">{{food.description}}</p>
                <div class="m-extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span class="u-count">好评{{food.rating}}%</span>
                </div>
                <div class="m-price">
                  <span class="u-now">￥{{food.price}}</span>
                  <span class="u-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="g-cart-wrap">
                  <cart-controll :food="food" @add-cart="getCart"></cart-controll>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-car ref="shopCart" :selectedFood="selectFoods" :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"></shop-car>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import {getGoods, getSellers} from "../../api/index";
  import BScroll from "better-scroll";
  import ShopCar from "../shop-car/index.vue";
  import Food from "../food/food.vue"
  import CartControll from "../../components/cartcontroller/cartcontroller.vue"

  const ERR_OK = 0;
  export default {
    components: {
      ShopCar,
      CartControll,
      Food
    },
    data() {
      return {
        seller: {},
        goods: [],
        classMap: [],
        meunScroll: {},
        foodsScrool: {},
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food);
            }
          })
        });
        return foods;
      }
    },
    created() {
      this.getGoodsList();
      this._getSellers();
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      getGoodsList() {
        getGoods().then(res => {
          if (res.errno === ERR_OK) {
            this.goods = res.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calulateHeight();
            })
          }
        })
      },
      selectFood(item, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = item;
        console.log(this.selectedFood);
        this.$refs.food.show();
      },
      _getSellers() {
        getSellers().then(res => {
          if (res.errno === ERR_OK) {
            this.seller = res.data;
          }
        })
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on("scroll", (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calulateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      getCart(target) {
        this._drop(target);
      },
      _drop(target) {
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target);
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods-page {
    position: absolute;
    top: 183px;
    bottom: 46px;
    left: 0;
    width: 100%;
    display: flex;
    overflow: hidden;
    .g-menu {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7
      .m-menu-item {
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .m-text {
            border: none;
          }
        }
        .m-text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          border-px(1px, rgba(7, 17, 27, 0.1))
          font-size: 12px
          .u-icon {
            margin-right: 2px;
            &.decrease {
              bg-image("decrease_3", 12px, 12px)
            }
            &.discount {
              bg-image("discount_3", 12px, 12px)
            }
            &.guarantee {
              bg-image("guarantee_3", 12px, 12px)
            }
            &.invoice {
              bg-image("invoice_3", 12px, 12px)
            }
            &.special {
              bg-image("special_3", 12px, 12px)
            }
          }
        }
      }
    }
    .g-foods {
      flex: 1
      .m-food-list {
        .u-title {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d0dde1;
          font-size: 12px;
          color: rgb(147, 153, 159);
          background: #f3f5f7
        }
        .m-food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          border-px(1px, rgba(7, 17, 27, 0.1))
          &.last_child {
            border-none();
            margin-bottom: 0
          }
          .m-icon {
            flex: 0 0 57px;
            margin-right: 10px
          }
          .m-content {
            flex: 1;
            .u-name {
              margin: 2px 0 8px 0;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: rgb(7, 17, 27)
            }
            .u-desc {
              margin-bottom: 8px;
              line-height: 14px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .m-extra {
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
              .u-count {
                margin-left: 12px;
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
            .g-cart-wrap {
              position: absolute;
              right: 0;
              bottom: 12px;
            }
          }
        }
      }
    }
  }
</style>
