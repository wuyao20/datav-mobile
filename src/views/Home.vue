<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item replace to="/home/public" icon="friends-o" name="public">公众</van-tabbar-item>
      <van-tabbar-item replace to="/home/company" icon="hotel-o" name="company">集团</van-tabbar-item>
      <van-tabbar-item replace to="/home/school" name="school">
        <template>
          <div class="van-tabbar-item__icon iconfont icon-school"></div>
        </template>
        <span>校园</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine" name="mine">
        <template>
          <div class="van-tabbar-item__icon iconfont icon-wode"></div>
        </template>
        <span>我的</span>
      </van-tabbar-item>
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
  height inherit
  font-size 16px
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s;
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
