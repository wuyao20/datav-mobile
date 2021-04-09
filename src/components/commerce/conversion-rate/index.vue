<template>
  <div class="conversion">
    <van-overlay :show="show">
      <div class="wrapper">
        <van-loading size="48px" color="#0094ff" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
    conversion rate
    <div id="conversion-chart" style="width: 100%; height: 400px; margin-top: 50px;" />
  </div>
</template>

<script>
import { commerceRate } from '@/api/commerce'
export default {
  name: 'ConversionRate',
  data () {
    return {
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
        this.list = res.obj
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
            data: this.yAxisOrderCount
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
.conversion
  .wrapper
    display flex
    align-items center
    justify-content center
    height 100%
</style>
