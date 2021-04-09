<template>
  <div class="public">
    <van-grid clickable :column-num="3">
      <van-grid-item icon="shop-collect-o" text="URL 跳转" to="/vant/mobile.html" />
      <van-grid-item icon="shop-collect-o" text="URL 跳转" url="/vant/mobile.html" />
      <van-grid-item icon="shop-collect-o" text="URL 跳转" url="/vant/mobile.html" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'Public'
}
</script>

<style scoped>

</style>
