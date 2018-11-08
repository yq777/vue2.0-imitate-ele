<template>
  <div class="g-header">
    <div class="g-content-wrapper">
      <div class="g-avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="g-content">
        <div class="m-title">
          <span class="u-brand"></span>
          <span class="u-name">{{seller.name}}</span>
        </div>
        <div class="m-description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="m-supports">
          <span class="u-icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="u-text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="g-support-count" v-if="seller.supports" @click="showDetail">
        <span class="u-count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="g-bulletin-wrapper" @click="showDetail">
      <span class="m-bulletin-title"></span>
      <span class="m-bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="g-background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="g-detail">
        <div class="g-detail-wrapper clearfix">
          <div class="m-detail-main">
            <h1 class="u-name">{{seller.name}}</h1>
            <div class="m-star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="m-title">
              <div class="u-line"></div>
              <div class="u-text">优惠信息</div>
              <div class="u-line"></div>
            </div>
            <ul v-if="seller.supports" class="m-supports">
              <li class="support-item" v-for="(item,index) in seller.supports"
                  :class="{last_child:index === seller.supports.length - 1}" :key="index">
                <span class="u-icon" :class="classMap[item.type]"></span>
                <span class="u-text">{{item.description}}</span>
              </li>
            </ul>
            <div class="m-title">
              <div class="u-line"></div>
              <div class="u-text">商家公告</div>
              <div class="u-line"></div>
            </div>
            <div class="bulletin">
              <div class="m-content">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="g-detail-close" @click="hiddenDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getSellers} from "../../api/index";
  import Star from "../star/index.vue"

  const ERR_OK = 0;

  export default {
    components: {
      Star
    },
    data() {
      return {
        seller: {},
        classMap: [],
        detailShow: false
      }
    },
    created() {
      this.getSellerList();
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      getSellerList() {
        getSellers().then(res => {
          if (res.errno === ERR_OK) {
            this.seller = res.data;
          }
        })
      },
      showDetail() {
        this.detailShow = true;
      },
      hiddenDetail() {
        this.detailShow = false;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .g-header {
    position: relative
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    .g-content-wrapper {
      position: relative
      padding 24px 12px 18px 24px;
      display: flex
      .g-avatar {
        img {
          border-radius: 2px
        }
      }
      .g-content {
        margin-left: 14px;
        .m-title {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2px 0 8px 0;
          .u-brand {
            bg-image("~assets/img/brand", 30px, 18px);
          }
          .u-name {
            margin-left: 6px;
            font-size: 16px;
            line-height 18px;
            font-weight: bold;
          }
        }
        .m-description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px
        }
        .m-supports {
          display: flex
          align-items: center
          .u-icon {
            margin-right: 4px;
            &.decrease {
              bg-image("~assets/img/decrease_1", 12px, 12px)
            }
            &.discount {
              bg-image("~assets/img/discount_1", 12px, 12px)
            }
            &.guarantee {
              bg-image("~assets/img/guarantee_1", 12px, 12px)
            }
            &.invoice {
              bg-image("~assets/img/invoice_1", 12px, 12px)
            }
            &.special {
              bg-image("~assets/img/special_1", 12px, 12px)
            }
          }
          .u-text {
            line-height: 12px
            font-size: 12px;
          }
        }
      }
      .g-support-count {
        position: absolute
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .u-count {
          font-size: 10px;
          vertical-align: top
        }
        .icon-keyboard_arrow_right {
          font-size: 10px
        }
      }
    }
    .g-bulletin-wrapper {
      display: flex;
      padding-left: 12px;
      align-items: center;
      background: rgba(7, 17, 27, 0.2)
      .m-bulletin-title {
        flex: 0 0 22px
        bg-image("~assets/img/bulletin", 22px, 12px)
      }
      .m-bulletin-text {
        height: 28px;
        line-height: 28px;
        font-size: 10px;
        margin: 0 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
      }
      .icon-keyboard_arrow_right {
        margin-right: 4px;
        font-size: 10px
      }
    }
    .g-background {
      position: absolute
      left: 0;
      top: 0;
      width: 100%;
      height: 100%
      z-index: -1;
      filter: blur(10px)
    }
    .fade-enter-active, .fade-leave-active {
      transition: all 0.5s;
      background: rgba(7, 17, 27, 0.8);
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    .g-detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200;
      height: 100%;
      width: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      -webkit-backdrop-filter: blur(10px);
      .g-detail-wrapper {
        min-height: 100%;
        width: 100%
        .m-detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .u-name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700
          }
          .m-star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
            display: flex;
            justify-content: center
          }
          .m-title {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .u-line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .u-text {
              padding: 0 12px;
              font-size: 14px;
              font-weight: 700
            }
          }
          .m-supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              display: flex;
              padding: 0 12px;
              margin-bottom: 12px;
              &.last_child {
                margin-bottom: 0;
              }
              .u-icon {
                margin-right: 6px;
                &.decrease {
                  bg-image("~assets/img/decrease_2", 16px, 16px)
                }
                &.discount {
                  bg-image("~assets/img/discount_2", 16px, 16px)
                }
                &.guarantee {
                  bg-image("~assets/img/guarantee_2", 16px, 16px)
                }
                &.invoice {
                  bg-image("~assets/img/invoice_2", 16px, 16px)
                }
                &.special {
                  bg-image("~assets/img/special_2", 16px, 16px)
                }
              }
              .u-text {
                line-height: 16px;
                font-size: 12px;
              }
            }
          }
          .bulletin {
            width: 80%;
            margin: 0 auto;
            .m-content {
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px
            }
          }
        }
      }
      .g-detail-close {
        position: relative;
        width: 32px;
        height 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px
        z-index: 100
        .icon-close {

        }
      }
    }
  }
</style>
