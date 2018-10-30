<template>
  <transition name="move">
    <div class="food-page" v-show="pageShow" ref="food">
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
          <div class="g-cartcontrol-wrapper">
            <cartcontroller :food="food" @add-cart="add"></cartcontroller>
          </div>
          <transition name="fade">
            <div class="g-buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="g-info" v-show="food.info">
          <h1 class="m-title">商品信息</h1>
          <p class="m-text">{{food.info}}</p>
        </div>
        <split v-show="food.ratings"></split>
        <div class="g-rating">
          <h1 class="m-title">商品评价</h1>
          <ratings-select @content-toggle="getContent" @rating-type="getType" :desc="desc" :selectType="selecttype" :onlyContent="onlycontent" :ratings="food.ratings"></ratings-select>
          <div class="g-rating-wrap">
            <ul class="g-list" v-if="food.ratings && food.ratings.length >0">
              <li class="m-list-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings">
                <div class="m-user">
                  <span class="u-name">{{rating.username}}</span>
                  <img class="u-avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="m-time">
                  {{formatDate(rating.rateTime)}}
                </div>
                <p class="m-text">
                  <span v-show="rating.rateType === 0" class="icon-thumb_up"></span>
                  <span v-show="rating.rateType === 1" class="icon-thumb_down"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-else>暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from "better-scroll";
  import Cartcontroller from "../../components/cartcontroller/cartcontroller.vue";
  import Split from "../../components/split/split.vue";
  import RatingsSelect from "../../components/ratings-select/index.vue"
  import {ratingSelect} from "../../utils/utils";
  import {DateUtil} from "../../common/js/date.js"

  export default {
    components: {
      Cartcontroller,
      Split,
      RatingsSelect
    },
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        pageShow: false,
        ratingSelect,
        selecttype: ratingSelect.ALL,
        onlycontent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created() {
    },
    methods: {
      show() {
        this.pageShow = true;
        this.selecttype = this.ratingSelect.ALL;
        this.onlycontent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.pageShow = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add-cart', event.target);
        this.$set(this.food, 'count', 1);
      },
      add(event) {
        this.$emit('add-cart', event);
      },
      getType(type) {
        this.selecttype = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      getContent(onlyContent) {
        this.onlycontent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      needShow(type, text) {
        if (this.onlycontent && !text) {
          return false;
        }
        if (this.selecttype === this.ratingSelect.ALL) {
          return true;
        } else {
          return type === this.selecttype;
        }
      },
      formatDate(time) {
        let date = new Date(time);
        return DateUtil(date, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
        position relative;
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
        .g-cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .g-buy {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          height: 24px;
          line-height: 24px
          padding: 0 12px;
          box-sizing: border-box;
          font-size: 10px;
          border-radius: 12px;
          color: #fff;
          background-color: rgb(0, 160, 220);
          &.fade-enter-active, &.fade-leave-active {
            transition: all 0.2s;
            opacity: 1;
          }
          &.fade-enter, &.fade-leave-to {
            opacity: 0;
          }
        }
      }
      .g-info {
        padding: 18px;
        .m-title {
          line-height: 14px;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .m-text {
          padding: 0 8px;
          line-height: 24px;
          font-size: 12px;
          color: rgb(77, 85, 93);
        }
      }
      .g-rating {
        padding-top: 18px;
        .m-title {
          margin-left: 18px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .g-rating-wrap {
          padding: 0 18px;

          .g-list {
            .m-list-item {
              position: relative;
              padding: 16px 0;
              border-px(rgba(7, 17, 27, 0.1), 1px);
              .m-user {
                position: absolute;
                right: 0;
                top: 16px;
                font-size: 0;
                line-height: 12px;
                .u-name {
                  display: inline-block;
                  margin-right: 6px;
                  vertical-align: top;
                  font-size: 10px;
                  color: rgb(147, 153, 159);
                }
                .u-avatar {
                  border-radius: 50%;
                }
              }
              .m-time {
                margin-bottom: 6px;
                font-size: 10px;
                line-height: 12px;
                color: rgb(147, 153, 159);
              }
              .m-text {
                line-height: 16px;
                font-size: 12px;
                color: rgb(7, 17, 27);
                .icon-thumb_up {
                  line-height: 16px;
                  margin-right: 4px;
                  font-size: 12px;
                  color: rgb(0, 166, 220);
                }
                .icon-thumb_down {
                  line-height: 16px;
                  margin-right: 4px;
                  font-size: 12px;
                  color: rgb(147, 153, 159);
                }
              }
            }
          }
          .no-rating {
            padding: 16px 0;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>
