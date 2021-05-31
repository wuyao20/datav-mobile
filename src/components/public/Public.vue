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
      <van-grid-item @click="fiveGenClick">
        <div class="van-tabbar-item__icon iconfont icon-5G">
        </div>
        <div class="content">
          5G登网
        </div>
      </van-grid-item>
      <van-grid-item @click="phonePackagesClick">
        <van-icon class="van-tabbar-item__icon" name="balance-o"></van-icon>
        <div class="content">
          高套佣金
        </div>
      </van-grid-item>
    </van-grid>
    <van-action-sheet v-model="publicShow" :actions="publicActions" cancel-text="取消" close-on-click-action description="公众报表" @select="onPublicActions" />
    <van-action-sheet v-model="commerceShow" :actions="commerceActions" cancel-text="取消" close-on-click-action description="电商报表" @select="onCommerceActions" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { notify } from '@/utils'

export default {
  name: 'Public',
  data () {
    return {
      publicShow: false,
      publicActions: [
        { name: '公众当月整体发展', key: 1 },
        { name: '大公众日发展报表', key: 2 }
      ],
      commerceShow: false,
      commerceActions: [
        { name: '当月转化率', key: 1 },
        { name: '当天发展量', key: 2 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    phonePackagesClick () {
      if (this.roles.indexOf('admin') > -1) {
        this.$router.push({ path: '/phonePackage' })
      } else {
        notify('您没有对应权限，无法访问', false)
      }
    },
    gridCommerceClick () {
      if (this.roles.indexOf('admin') > -1) {
        this.commerceShow = true
      } else {
        if (this.roles.indexOf('commerce') > -1) {
          this.commerceShow = true
        } else {
          notify('您无权访问此菜单', false)
        }
      }
    },
    fiveGenClick () {
      if (this.roles.indexOf('admin') > -1) {
        this.commerceShow = true
      } else {
        if (this.roles.indexOf('5G') > -1) {
          this.$router.push({ path: '/5g' })
        } else {
          notify('您无权访问此菜单', false)
        }
      }
    },
    gridPublicClick () {
      if (this.roles.indexOf('admin') > -1) {
        this.commerceShow = true
      } else {
        if (this.roles.indexOf('whole') > -1 || this.roles.indexOf('dayDev') > -1) {
          this.publicShow = true
        } else {
          notify('您无权访问此菜单', false)
        }
      }
    },
    onPublicActions (item) {
      this.publicShow = false
      switch (item.key) {
        case 1:
          this.$router.push({ path: '/monthDev' })
          break
        case 2:
          this.$router.push({ path: '/dayDev' })
          break
        default:
          break
      }
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
