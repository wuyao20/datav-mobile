<template>
  <div class="app-container">
    <van-overlay :show="show">
      <div class="wrapper">
        <van-loading size="48px" color="#0094ff" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
    <van-nav-bar
      title="电商当月转化率"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <el-table
      fit
      border
      :data="list"
      highlight-current-row
      style="width: 100%;"
      :default-sort="{prop: 'conversionRate', order: 'descending'}"
      :cell-style="tableCellStyle"
      size="mini"
    >
<!--      <el-table-column label="id" width="80px" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.$index + 1 }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="区县" fixed align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column label="订单总数" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.ordersCount }}
        </template>
      </el-table-column>
      <el-table-column label="激活" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.activation }}
        </template>
      </el-table-column>
      <el-table-column label="50以上转化" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.fiftyMore }}
        </template>
      </el-table-column>
      <el-table-column label="100以上转化" align="center" width="70">
        <template slot-scope="scope">
          {{ scope.row.hundredMore }}
        </template>
      </el-table-column>
      <el-table-column
        prop="conversionRate"
        label="50以上转化率"
        :sortable="sortBoolean"
        :sort-method="(a, b) => percentSort(a, b)"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.conversionRate }}
        </template>
      </el-table-column>
      <el-table-column
        prop="conversionRate"
        label="100以上转化率"
        :sortable="sortBoolean"
        :sort-method="(a, b) => percentHundredSort(a, b)"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.hundredConversionRate }}
        </template>
      </el-table-column>
    </el-table>
    <div id="conversion-chart" style="width: 100%; height: 400px; margin-top: 50px; margin-bottom: 50px;" />
  </div>
</template>

<script>
import { commerceRate } from '@/api/commerce'
export default {
  name: 'ConversionRate',
  data () {
    return {
      sortBoolean: true,
      show: false,
      date: '',
      listQuery: {
        startTime: '',
        endTime: ''
      },
      list: [],
      xAxisData: [],
      yAxisOrderCount: [],
      yAxisActivation: [],
      yAxisFiftyMore: [],
      yAxisHundredMore: [],
      yAxisConversionRate: [],
      option: {},
      conversionChart: undefined
    }
  },
  mounted () {
    this.conversionChart = this.$echarts.init(document.getElementById('conversion-chart'))
    this.handleFilter()
  },
  methods: {
    onClickLeft () {
      this.$router.push({ path: '/home' })
    },
    tableCellStyle ({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      if (rowIndex <= 2 && columnIndex === 6) {
        return 'background-color: rgba(45,224,12,1);'
      }
      if (rowIndex >= 7 && columnIndex === 6) {
        return 'background-color: rgba(240,8,24,1);'
      }
      return ''
    },
    percentSort (a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.conversionRate)) - parseFloat(/\d+\.\d+/.exec(b.conversionRate))
    },
    percentHundredSort (a, b) {
      return parseFloat(/\d+\.\d+/.exec(a.hundredConversionRate)) - parseFloat(/\d+\.\d+/.exec(b.hundredConversionRate))
    },
    handleFilter () {
      this.show = true
      if (this.date === null) {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      } else {
        this.listQuery.startTime = this.date[0]
        this.listQuery.endTime = this.date[1]
      }
      commerceRate(this.listQuery).then(res => {
        this.list = res.obj.filter(item => {
          return item.area !== '整体'
        })
        this.xAxisData = this.list.map(item => item.area)
        this.yAxisOrderCount = this.list.map(item => {
          return item.ordersCount
        })
        this.yAxisActivation = this.list.map(item => {
          return item.activation
        })
        this.yAxisFiftyMore = this.list.map(item => {
          return item.fiftyMore
        })
        this.yAxisHundredMore = this.list.map(item => {
          return item.hundredMore
        })
        this.yAxisConversionRate = this.list.map(item => {
          return /\d+\.\d+/.exec(item.conversionRate)[0]
        })
        this.initOptions()
        this.show = false
      })
    },
    initOptions () {
      this.option = {
        title: {
          text: '电商转化报表'
        },
        grid: {
          left: '60px',
          right: '50px',
          top: '100px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          bottom: '-5%',
          data: ['订单量', '激活', '50以上转化', '100以上转化', '转化率']
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '订单量',
            axisLabel: {
              formatter: '{value}单'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            name: '转化率',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '订单量',
            type: 'bar',
            stack: 'orderNum',
            data: this.yAxisOrderCount,
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            name: '激活',
            type: 'bar',
            stack: 'orderNum',
            data: this.yAxisActivation
          },
          {
            name: '50以上转化',
            type: 'bar',
            stack: 'orderNum',
            data: this.yAxisFiftyMore
          },
          {
            name: '100以上转化',
            type: 'bar',
            stack: 'orderNum',
            data: this.yAxisHundredMore
          },
          {
            name: '转化率',
            type: 'line',
            yAxisIndex: 1,
            data: this.yAxisConversionRate
          }
        ]
      }
      this.conversionChart.setOption(this.option)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  align-items center
  justify-content center
  height 100%
</style>
