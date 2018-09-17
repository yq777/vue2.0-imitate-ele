<template>
  <div class="index-page">
    <layout>
      <router-view slot="content"></router-view>
    </layout>
  </div>
</template>

<script>
  import Layout from "../components/layout/index.vue"

  export default {
    components: {
      Layout
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
