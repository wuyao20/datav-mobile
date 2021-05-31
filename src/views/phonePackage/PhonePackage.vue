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
          if (item.hbCount === 1) {
            return 1 * 645
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 774 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 903 * item.hbCount
          } else {
            return 0
          }
        case '畅爽冰激凌5G套餐159元-优化版':
          if (item.hbCount === 1) {
            return 1 * 795
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 954 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 1113 * item.hbCount
          } else {
            return 0
          }
        case '畅爽冰激凌5G套餐199元（极速）':
          if (item.hbCount === 1) {
            return 1 * 995
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 1194 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 1393 * item.hbCount
          } else {
            return 0
          }
        case '畅爽冰激凌5G套餐239元':
          if (item.hbCount === 1) {
            return 1 * 1195
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 1434 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 1673 * item.hbCount
          } else {
            return 0
          }
        case '智慧沃家5G极享三千兆套餐-239元档':
          if (item.hbCount === 1) {
            return 1 * 1195
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 1434 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 1673 * item.hbCount
          } else {
            return 0
          }
        case '畅爽冰激凌5G套餐299元':
          if (item.hbCount === 1) {
            return 1 * 1495
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 1794 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 2093 * item.hbCount
          } else {
            return 0
          }
        case '5G畅爽冰激凌套餐399元':
          if (item.hbCount === 1) {
            return 1 * 1795
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 2094 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 2393 * item.hbCount
          } else {
            return 0
          }
        case '畅爽冰激凌5G套餐999元':
          if (item.hbCount === 1) {
            return 1 * 3595
          } else if (item.hbCount >= 2 && item.hbCount <= 5) {
            return 3894 * item.hbCount
          } else if (item.hbCount >= 6) {
            return 4193 * item.hbCount
          } else {
            return 0
          }
      }
    },
    calcNOCommission (item) {
      switch (item.productName) {
        case '畅爽冰激凌5G套餐129元':
          return calcCommission(item.dkCount, 620, 749, 878)
        case '畅爽冰激凌5G套餐159元-优化版':
          return calcCommission(item.dkCount, 770, 929, 1088)
        case '畅爽冰激凌5G套餐199元（极速）':
          return calcCommission(item.dkCount, 970, 1169, 1368)
        case '畅爽冰激凌5G套餐239元':
          return calcCommission(item.dkCount, 1170, 1409, 1648)
        case '智慧沃家5G极享三千兆套餐-239元档':
          return calcCommission(item.dkCount, 1170, 1409, 1648)
        case '畅爽冰激凌5G套餐299元':
          return calcCommission(item.dkCount, 1470, 1769, 2068)
        case '5G畅爽冰激凌套餐399元':
          return calcCommission(item.dkCount, 1770, 2069, 2368)
        case '畅爽冰激凌5G套餐999元':
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
