<template>
  <div class="commerce">
    <van-grid clickable :column-num="3">
      <van-grid-item icon="shop-collect-o" text="电商" to="/conversion" />
      <van-grid-item icon="shop-collect-o" text="URL 跳转" url="/vant/mobile.html" />
      <van-grid-item icon="shop-collect-o" text="URL 跳转" url="/vant/mobile.html" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'Commerce'
}
</script>

<style lang="stylus" scoped>
</style>
