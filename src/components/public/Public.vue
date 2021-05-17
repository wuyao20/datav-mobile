<template>
  <div>
    <van-grid :border="false" :column-num="3" :gutter="10">
      <van-grid-item text="公众整体发展" to="/monthDev">
        <van-icon class-prefix="icon" name="shehui" />
      </van-grid-item>
      <van-grid-item icon="photo-o" text="社渠" to="/">
        社渠
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字" to="/">
        自营
      </van-grid-item>
      <van-grid-item icon="photo-o" text="电商" to="/"></van-grid-item>
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
