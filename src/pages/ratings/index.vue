<template>
  <div class="ratings-page" ref="ratings">
    <div class="g-ratings-cotent">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select @content-toggle="getContent" @rating-type="getType" :selectType="selecttype" :onlyContent="onlycontent" :ratings="ratings" :desc="desc"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wraper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{formatDate(rating.rateTime)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  import {getRatings, getSellers} from "../../api/index";
  import Star from "../../components/star/index.vue";
  import Split from "../../components/split/split.vue";
  import RatingSelect from "../../components/ratings-select/index.vue";
  import {ratingSelect} from "../../utils/utils";
  import {DateUtil} from "../../common/js/date";

  const ERR_OK = 0;
  export default {
    components: {
      Star,
      Split,
      RatingSelect
    },
    data() {
      return {
        seller: {},
        ratings: [],
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
      this._getSellers();
      this._getRatings();
    },
    methods: {
      _getSellers() {
        getSellers().then(res => {
          if (res.errno === ERR_OK) {
            this.seller = res.data;
          }
        })
      },
      _getRatings() {
        getRatings().then(res => {
          if (res.errno === ERR_OK) {
            this.ratings = res.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            });
          }
        })
      },
      getContent(type) {
        this.onlycontent = type;
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      getType(type) {
        this.selecttype = type;
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      formatDate(time) {
        let date = new Date(time);
        return DateUtil(date, 'yyyy-MM-dd hh:mm:ss');
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ratings-page {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .g-ratings-cotent {
      .overview {
        display: flex;
        padding: 18px 0;
        border-px(rgba(7, 17, 27, 0.1), 1px);
        .overview-left {
          flex: 0 0 137px;
          width: 137px;
          padding: 6px 0;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          @media only screen and (max-width: 320px) {
            flex: 0 0 120px;
            width: 120px;
          }
          .score {
            margin-bottom: 6px;
            line-height: 28px;
            font-size: 24px;
            color: rgb(255, 153, 0)
          }
          .title {
            margin-bottom: 8px;
            line-height: 12px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .rank {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .overview-right {
          flex: 1;
          padding: 6px 0 6px 24px;
          @media only screen and (max-width: 320px) {
            padding-left: 6px;
          }
          .score-wrapper {
            margin-bottom: 8px;
            font-size: 0;
            .title {
              display: inline-block;
              line-height: 18px;
              vertical-align: top;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .g-star {
              display: inline-block;
              vertical-align: top;
              margin: 0 12px;
            }
            .score {
              display: inline-block;
              vertical-align: top;
              line-height: 18px;
              font-size: 12px;
              color: rgb(255, 153, 0);
            }
          }
          .delivery-wrapper {
            font-size: 0;
            .title {
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .delivery {
              margin-left: 12px;
              font-size: 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .rating-wrapper {
        padding: 0 18px;
        .rating-item {
          display: flex;
          padding: 18px 0;
          border-px(rgba(7, 17, 27, 0.1), 1px);
          .avatar {
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img {
              border-radius: 50%;
            }
          }
          .content {
            position: relative;
            flex: 1;
            .name {
              margin-bottom: 4px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(7, 17, 27);
            }
            .star-wraper {
              margin-bottom: 6px;
              font-size: 0;
              .g-star {
                display: inline-block;
                margin-right: 6px;
                vertical-align: top;
              }
              .delivery {
                display: inline-block;
                vertical-align: top;
                line-height: 12px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }
            .text {
              margin-bottom: 8px;
              line-height: 18px;
              color: rgb(7, 17, 27);
              font-size: 12px;
            }
            .recommend {
              line-height: 16px;
              .icon-thumb_up, .item {
                display: inline-block;
                margin: 0 8px 4px 0;
                font-size: 9px;
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              .item {
                padding: 0 6px;
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px;
                color: rgb(147, 153, 159);
                background: #fff;
              }
            }
            .time {
              position: absolute;
              top: 0;
              right: 0;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }
</style>
