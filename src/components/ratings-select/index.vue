<template>
  <div class="rating-select-page">
    <div class="g-rating-type border-px">
      <span class="m-type positive" @click="select(2,$event)" :class="{active:type===ratingSelect.ALL}">{{desc.all}}<span class="m-count">{{ratings.length}}</span></span>
      <span class="m-type positive" @click="select(0,$event)" :class="{active:type===ratingSelect.POSITIVE}">{{desc.positive}}<span class="m-count">{{positives.length}}</span></span>
      <span class="m-type negative" @click="select(1,$event)" :class="{active:type===ratingSelect.NEGATIVE}">{{desc.negative}}<span class="m-count">{{negatives.length}}</span></span>
    </div>
    <div class="g-switch" @click="toggleContent($event)" :class="{on:content}">
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
        ratingSelect,
        type: this.selectType,
        content: this.onlyContent
      }
    },
    computed: {
      positives() {
        return this.ratings.filter(item => {
          return item.rateType === this.ratingSelect.POSITIVE;
        })
      },
      negatives() {
        return this.ratings.filter(item => {
          return item.rateType === this.ratingSelect.NEGATIVE;
        })
      }
    },
    watch: {
      selectType(val) {
        this.type = val;
      },
      onlyContent(val) {
        this.content = val;
      }
    },
    created() {
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.type = type;
        this.$emit('rating-type', this.type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.content = !this.content;
        this.$emit('content-toggle', this.content);
      }
    }
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
      padding: 12px 18px;
      line-height: 24px;
      font-size: 0;
      color: rgb(147, 153, 159);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        margin-right: 4px;
      }
      .u-text {
        font-size: 12px;
      }
    }
  }
</style>
