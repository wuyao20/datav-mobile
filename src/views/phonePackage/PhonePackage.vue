<template>
  <div class="app-container">
    <van-overlay :show="show">
      <div class="wrapper">
        <van-loading class="block" type="spinner" color="#1989fa">
          加载中
        </van-loading>
      </div>
    </van-overlay>
    <van-nav-bar
      title="高套佣金明细"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="title">
      <van-icon name="user-o"></van-icon>
      <span>员工姓名: <span class="name">{{name}}</span></span>
    </div>
    <van-divider></van-divider>
    <div v-if="list.length > 0">
      <div class="content">个人佣金明细</div>
      <div class="commission" v-for="(item, index) in list" :key="index + 'person'">
        <van-cell title="套餐" :value="item.productName"></van-cell>
        <van-cell title="金融合约" :value="item.hbCount + '户'"></van-cell>
        <van-cell class="money" title="佣金T+0月" icon="refund-o">
          <template #right-icon>
            <span style="color: red">{{item.hbT0}}元</span>
          </template>
        </van-cell>
        <van-cell class="money" title="佣金T+1月" icon="refund-o">
          <template #right-icon>
            <span style="color: red">{{item.hbT1}}元</span>
          </template>
        </van-cell>
        <van-cell class="money" title="佣金T+3月" icon="refund-o">
          <template #right-icon>
            <span style="color: red">{{item.hbT3}}元</span>
          </template>
        </van-cell>
        <van-cell title="非金融" :value="item.dkCount + '户'"></van-cell>
        <van-cell class="money" title="佣金T+0月" icon="refund-o">
          <template #right-icon>
            <span style="color: red">{{item.dkT0}}元</span>
          </template>
        </van-cell>
        <van-cell class="money" title="佣金T+1月" icon="refund-o">
          <template #right-icon>
            <span style="color: red">{{item.dkT1}}元</span>
          </template>
        </van-cell>
        <van-cell class="money" title="佣金T+3月" icon="refund-o">
          <template #right-icon>
            <span style="color: red">{{item.dkT3}}元</span>
          </template>
        </van-cell>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
      </div>
    </div>
    <div v-if="channelList.length > 0" class="content">渠道佣金明细</div>
    <el-table
      v-if="channelList.length > 0"
      v-loading="tableLoading"
      fit
      border
      :data="channelList"
      highlight-current-row
      style="width: 100%;margin-top: 20px;"
      size="small"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <van-cell title="金融129套餐" :value="props.row.hbCount129"></van-cell>
          <van-cell title="金融159套餐" :value="props.row.hbCount159"></van-cell>
          <van-cell title="金融199套餐" :value="props.row.hbCount199"></van-cell>
          <van-cell title="金融239套餐" :value="props.row.hbCount239"></van-cell>
          <van-cell title="金融299套餐" :value="props.row.hbCount299"></van-cell>
          <van-cell title="金融399套餐" :value="props.row.hbCount399"></van-cell>
          <van-cell title="金融599套餐" :value="props.row.hbCount599"></van-cell>
          <van-cell title="金融799套餐" :value="props.row.hbCount799"></van-cell>
          <van-cell title="金融999套餐" :value="props.row.hbCount999"></van-cell>
          <van-cell title="非金融129套餐" :value="props.row.dkCount129"></van-cell>
          <van-cell title="非金融159套餐" :value="props.row.dkCount159"></van-cell>
          <van-cell title="非金融199套餐" :value="props.row.dkCount199"></van-cell>
          <van-cell title="非金融239套餐" :value="props.row.dkCount239"></van-cell>
          <van-cell title="非金融299套餐" :value="props.row.dkCount299"></van-cell>
          <van-cell title="非金融399套餐" :value="props.row.dkCount399"></van-cell>
          <van-cell title="非金融599套餐" :value="props.row.dkCount599"></van-cell>
          <van-cell title="非金融799套餐" :value="props.row.dkCount799"></van-cell>
          <van-cell title="非金融999套餐" :value="props.row.dkCount999"></van-cell>
        </template>
      </el-table-column>
      <el-table-column label="渠道名称" align="center">
        <template slot-scope="{row}">
          <van-tag type="primary" plain><span @click="channelClick(row)">{{row.channelName}}</span></van-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gtCount" label="发展总量" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { channelCommission, commission } from '@/api/public'
import { mapGetters } from 'vuex'
import { notify } from '@/utils'
export default {
  name: 'PhonePackage',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data () {
    return {
      show: true,
      tableLoading: false,
      list: [],
      total: 0,
      channelList: [],
      channelTotal: 0
    }
  },
  mounted () {
    this.show = true
    commission().then(res => {
      const { msg, obj, success } = res
      if (success) {
        this.list = obj
      } else {
        notify(msg, success)
      }
    })
    channelCommission().then(res => {
      const { msg, obj, success } = res
      setTimeout(() => {
        this.show = false
      }, 500)
      if (success) {
        this.channelList = obj
      } else {
        notify(msg, success)
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.push({ path: '/home' })
    },
    channelClick (row) {
      this.$router.push({ path: '/channelPhonePackage', query: { telNum: row.telNum } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-container
  .wrapper
    display flex
    align-items center
    justify-content center
    height 100%
  .title
    margin-top 10px
    display flex
    align-items center
  & >>> thead
    font-weight bold
    color black
  .content
    text-align center
    font-weight bold
    letter-spacing 1px
</style>
