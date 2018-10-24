<template>
  <div class="rating-select-page">
    <div class="g-rating-type border-px">
      <span class="m-type positive" :class="{active:selectType===ratingSelect.ALL}">{{desc.all}}<span class="m-count">47</span></span>
      <span class="m-type positive" :class="{active:selectType===ratingSelect.POSITIVE}">{{desc.positive}}<span class="m-count">47</span></span>
      <span class="m-type negative" :class="{active:selectType===ratingSelect.NEGATIVE}">{{desc.negative}}<span class="m-count">47</span></span>
    </div>
    <div class="g-switch">
      <i class="icon-check_circle"></i>
      <span class="u-text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  import {ratingSelect} from "../../utils/utils"

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: 2
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '吐槽'
          }
        }
      }
    },
    data() {
      return {
        ratingSelect
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .rating-select-page {
    .g-rating-type {
      padding: 18px 0;
      margin: 0 18px;
      border-px(rgba(7, 17, 27, 0.1), 1px);
      font-size: 0
      .m-type {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        line-height: 16px;
        .m-count {
          font-size: 8px;
          margin-left: 2px;
        }
      }
      .positive {
        background: rgba(0, 160, 220, 0.2);
        &.active {
          background: rgb(0, 160, 220);
          color: #fff;
        }
      }
      .negative {
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background: rgb(77, 85, 93);
          color: #fff;
        }
      }
    }
    .g-switch {
      .u-text {

      }
    }
  }
</style>
