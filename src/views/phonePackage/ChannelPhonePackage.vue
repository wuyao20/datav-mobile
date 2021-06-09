<template>
  <div class="app-container">
    <van-overlay :show="show">
      <div class="wrapper">
        <van-loading class="block" type="spinner" color="#1989fa" vertical>
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
    <div class="title">渠道高套佣金明细</div>
    <el-table
      v-if="list.length > 0"
      fit
      border
      :data="list"
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
      <el-table-column prop="channelName" label="渠道名称" align="center"></el-table-column>
      <el-table-column prop="gtCount" label="发展总量" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ChannelCommissionDetail } from '@/api/public'
import { notify } from '@/utils'

export default {
  name: 'ChannelPhonePackage',
  data () {
    return {
      show: false,
      list: []
    }
  },
  mounted () {
    this.show = true
    ChannelCommissionDetail(this.$route.query.telNum).then(res => {
      const { msg, obj, success } = res
      setTimeout(() => {
        this.show = false
      }, 500)
      if (success) {
        this.list = obj
      } else {
        notify(msg, success)
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.push({ path: '/phonePackage' })
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
</style>
