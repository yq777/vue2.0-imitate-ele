<template>
  <div class="g-star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="m-star-item">
    </span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data() {
      return {}
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        result[result.length - 1] = `${result[result.length - 1]} last-child`;
        return result;
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .g-star {
    display: flex;
    .m-star-item {
      margin-right: 5px;
    }
    &.star-48 {
      .on {
        bg-image('star48_on', 20px, 20px);
      }
      .half {
        bg-image('star48_half', 20px, 20px);
      }
      .off {
        bg-image('star48_off', 20px, 20px);
      }
      .last-child {
        margin-right: 0
      }
    }
    &.star-36 {
      margin-right: 5px;
      .on {
        bg-image('star36_on', 15px, 15px)
      }
      .half {
        bg-image('star36_half', 15px, 15px)
      }
      .off {
        bg-image('star36_off', 15px, 15px)
      }
      .last-child {
        margin-right: 0
      }
    }
    &.star-24 {
      margin-right: 3px;
      .on {
        bg-image('star24_on', 10px, 10px)
      }
      .half {
        bg-image('star24_half', 10px, 10px)
      }
      .off {
        bg-image('star24_off', 10px, 10px)
      }
      .last-child {
        margin-right: 0
      }
    }

  }
</style>
