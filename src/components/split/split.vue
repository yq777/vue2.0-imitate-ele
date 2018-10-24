<template>
  <div class="split-page">
    <div class="g-split-wrapper"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .split-page {
    .g-split-wrapper {
      width: 100%;
      height: 16px;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      background: #f3f5f7;
    }
  }
</style>
