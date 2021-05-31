<template>
  <div class="app-container">
    <div class="title">
      <van-icon name="user-o"></van-icon>
      <span>员工姓名: <span class="name">{{name}}</span></span>
    </div>
    <van-divider></van-divider>
    <div class="content">佣金明细</div>
    <div class="commission" v-for="item in list" :key="item">
      <van-cell title="套餐" :value="item.productName"></van-cell>
      <van-cell title="金融合约" :value="item.hbCount + '户'"></van-cell>
      <van-cell class="money" title="佣金" icon="refund-o" :value="calcCommission(item) + '元'"></van-cell>
      <van-cell title="非金融" :value="item.dkCount + '户'"></van-cell>
      <van-cell class="money" title="佣金" icon="refund-o" :value="calcNOCommission(item) + '元'"></van-cell>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
    </div>
    <div>
      <van-cell title="总计" :value="total"></van-cell>
    </div>
  </div>
</template>

<script>
import { commission } from '@/api/public'
import { mapGetters } from 'vuex'
import { notify, calcCommission } from '@/utils'
export default {
  name: 'PhonePackage',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data () {
    return {
      list: [],
      total: 0
    }
  },
  created () {
    commission().then(res => {
      const { msg, success, obj } = res
      if (success) {
        this.list = obj
      } else {
        notify(msg, success)
      }
    })
  },
  methods: {
    calcCommission (item) {
      switch (item.productName) {
        case '畅爽冰激凌5G套餐129元':
          this.total = this.total + calcCommission(item.hbCount, 645, 774, 903)
          return calcCommission(item.hbCount, 645, 774, 903)
        case '畅爽冰激凌5G套餐159元-优化版':
          this.total = this.total + calcCommission(item.hbCount, 795, 954, 1113)
          return calcCommission(item.hbCount, 795, 954, 1113)
        case '畅爽冰激凌5G套餐199元（极速）':
          this.total = this.total + calcCommission(item.hbCount, 995, 1194, 1393)
          return calcCommission(item.hbCount, 995, 1194, 1393)
        case '畅爽冰激凌5G套餐239元':
          this.total = this.total + calcCommission(item.hbCount, 1195, 1434, 1637)

          return calcCommission(item.hbCount, 1195, 1434, 1637)
        case '智慧沃家5G极享三千兆套餐-239元档':
          this.total = this.total + calcCommission(item.hbCount, 1195, 1434, 1673)

          return calcCommission(item.hbCount, 1195, 1434, 1673)
        case '畅爽冰激凌5G套餐299元':
          this.total = this.total + calcCommission(item.hbCount, 1495, 1794, 2093)

          return calcCommission(item.hbCount, 1495, 1794, 2093)
        case '5G畅爽冰激凌套餐399元':
          this.total = this.total + calcCommission(item.hbCount, 1795, 2094, 2393)

          return calcCommission(item.hbCount, 1795, 2094, 2393)
        case '畅爽冰激凌5G套餐999元':
          this.total = this.total + calcCommission(item.hbCount, 3595, 3894, 4193)
          return calcCommission(item.hbCount, 3595, 3894, 4193)
        default:
          return 0
      }
    },
    calcNOCommission (item) {
      switch (item.productName) {
        case '畅爽冰激凌5G套餐129元':
          this.total = this.total + calcCommission(item.dkCount, 620, 749, 878)

          return calcCommission(item.dkCount, 620, 749, 878)
        case '畅爽冰激凌5G套餐159元-优化版':
          this.total = this.total + calcCommission(item.dkCount, 770, 929, 1088)

          return calcCommission(item.dkCount, 770, 929, 1088)
        case '畅爽冰激凌5G套餐199元（极速）':
          this.total = this.total + calcCommission(item.dkCount, 970, 1169, 1368)

          return calcCommission(item.dkCount, 970, 1169, 1368)
        case '畅爽冰激凌5G套餐239元':
          this.total = this.total + calcCommission(item.dkCount, 1170, 1409, 1648)

          return calcCommission(item.dkCount, 1170, 1409, 1648)
        case '智慧沃家5G极享三千兆套餐-239元档':
          this.total = this.total + calcCommission(item.dkCount, 1170, 1409, 1648)

          return calcCommission(item.dkCount, 1170, 1409, 1648)
        case '畅爽冰激凌5G套餐299元':
          this.total = this.total + calcCommission(item.dkCount, 1470, 1769, 2068)

          return calcCommission(item.dkCount, 1470, 1769, 2068)
        case '5G畅爽冰激凌套餐399元':
          this.total = this.total + calcCommission(item.dkCount, 1770, 2069, 2368)

          return calcCommission(item.dkCount, 1770, 2069, 2368)
        case '畅爽冰激凌5G套餐999元':
          this.total = this.total + calcCommission(item.dkCount, 3570, 3869, 4168)

          return calcCommission(item.dkCount, 3570, 3869, 4168)
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  margin-top 10px
  display flex
  align-items center
  span
    font-size 18px
    .name
      color gray
.content
  text-align center
  font-size 20px
  font-weight bold
  letter-spacing 1px
  .money
    color red
</style>
