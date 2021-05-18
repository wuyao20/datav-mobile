<template>
  <div class="app-container">
    <van-swipe class="public-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid class="public-grid" square :column-num="3" :gutter="10">
      <van-grid-item @click="gridPublicClick">
        <div class="van-tabbar-item__icon iconfont icon-wode"></div>
        <div class="content">
          公众整体
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="van-tabbar-item__icon iconfont icon-shehui"></div>
        <div class="content">
          社会渠道
        </div>
      </van-grid-item>
      <van-grid-item @click="gridCommerceClick">
        <div class="van-tabbar-item__icon iconfont icon-dianshang"></div>
        <div class="content">
          电商
        </div>
      </van-grid-item>
      <van-grid-item>
        <div class="van-tabbar-item__icon iconfont icon-shangdian"></div>
        <div class="content">
          自营
        </div>
      </van-grid-item>
    </van-grid>
    <van-action-sheet v-model="publicShow" :actions="publicActions" cancel-text="取消" close-on-click-action description="公众报表" @select="onPublicActions" />
    <van-action-sheet v-model="commerceShow" :actions="commerceActions" cancel-text="取消" close-on-click-action description="电商报表" @select="onCommerceActions" />
  </div>
</template>

<script>
export default {
  name: 'Public',
  data () {
    return {
      publicShow: false,
      publicActions: [
        { name: '公众当月整体发展', key: 1 }
      ],
      commerceShow: false,
      commerceActions: [
        { name: '当月转化率', key: 1 },
        { name: '当天发展量', key: 2 }
      ]
    }
  },
  methods: {
    gridPublicClick () {
      this.publicShow = true
    },
    onPublicActions (item) {
      this.publicShow = false
      switch (item.key) {
        case 1:
          this.$router.push({ path: '/monthDev' })
          break
        default:
          break
      }
    },
    gridCommerceClick () {
      this.commerceShow = true
    },
    onCommerceActions (item) {
      this.commerceShow = false
      switch (item.key) {
        case 1:
          this.$router.push({ path: '/conversion' })
          break
        case 2:
          this.$router.push({ path: '/thatDay' })
          break
        default:
          this.commerceShow = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-container
  padding 10px
  .public-swipe
    .van-swipe-item
      color #fff
      font-size 20px
      line-height 150px
      text-align center
      background-color #39a9ed
  .public-grid
    margin-top 20px
    .content
      font-size 13px
      font-weight lighter
</style>
