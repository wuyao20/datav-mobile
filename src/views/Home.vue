<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item replace to="/home/public" icon="friends-o" name="public">公众</van-tabbar-item>
      <van-tabbar-item replace to="/home/company" icon="hotel-o" name="company">集团</van-tabbar-item>
      <van-tabbar-item replace to="/home/school" name="school">
        <template>
          <div class="van-tabbar-item__icon iconfont icon-school"></div>
        </template>
        <span>校园</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/commerce" icon="shop-o" name="commerce">电商</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      active: 'public'
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  font-size 16px
</style>
