<template>
  <div class="line-vue">
    <div class="echart-title">折线图</div>
    <c-icon class="echart-export" i="c-download" tip="导出图片" size="20" cursor="pointer" :color="$store.state.setting.themeColor" :hoverColor="$theme['--tc']" showType="el" @click="handleExportEchart()"></c-icon>
    <div id="line-echart"> </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      apiData: {},
      echartData: {},
      timer: null,
      resizer: null,
    }
  },
  created() {
    this.init()
    this.timer = setInterval(() => { this.init() }, 60000)
  },
  mounted() {

  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.echartData?.instance?.clear()
    this.echartData?.instance?.dispose()
    this.resizer?.disconnect()
    // window.removeEventListener('theme-style-change')
  },
  watch: {
    '$store.state.setting.themeStyle'() {
      // setTimeout(() => {
      //   this.initEchart()
      // }, 5000)
      this.$nextTick(() => { this.initEchart() })
    },
  },
  methods: {
    // 模拟api
    lineEchartDataGet() {
      return new Promise((resolve, reject) => {
        try {
          const data = {
            '济南': [
              { time: '2024-01-01 12:00:00', temperature: 1, rain: 10, humidity: 70, pressure: 1030, },
              { time: '2024-04-01 12:00:00', temperature: 10, rain: 30, humidity: 50, pressure: 1015, },
              { time: '2024-07-01 12:00:00', temperature: 25, rain: 120, humidity: 80, pressure: 1010, },
              { time: '2024-10-01 12:00:00', temperature: 15, rain: 40, humidity: 60, pressure: 1025, },
            ],
            '青岛': [
              { time: '2024-01-01 12:00:00', temperature: 5, rain: 20, humidity: 70, pressure: 1020, },
              { time: '2024-04-01 12:00:00', temperature: 15, rain: 40, humidity: 75, pressure: 1015, },
              { time: '2024-07-01 12:00:00', temperature: 22, rain: 180, humidity: 85, pressure: 1010, },
              { time: '2024-10-01 12:00:00', temperature: 16, rain: 50, humidity: 70, pressure: 1020, },
            ],
          }
          resolve({ code: 200, data: data, msg: '请求成功！' })
        } catch {
          reject({ code: 500, data: {}, msg: '请求失败！' })
        }
      })
    },
    // 一、初始化相关
    // 0、初始化总调用
    init() {
      this.getEchartData()
    },
    // 1、获取echart数据
    async getEchartData() {
      const res = await this.lineEchartDataGet()
      this.$set(this, 'apiData', res.data || {})
      this.handleEchartData()
    },
    // 2、处理echart数据
    handleEchartData() {
      let chart = {
        lData: [],
        xyData: {},
        sData: [],
        tableData: [],
      }
      let apiData = JSON.parse(JSON.stringify(this.apiData || {}))
      for (var k in apiData) {
        chart.lData.push(k)
        chart.xyData[k] = []
        apiData[k].forEach(item => { chart.xyData[k].push([item.time, item.temperature?.toFixed(2)]) })
      }
      this.$completeEchart(chart)
      let common = {
        smooth: true,
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        connectNulls: false
      }
      let color = ['#549BDD', '#59D7D7', '#5ABCAA', '#93E42B', '#2ADE26', '#2981D2', '#C274E7']
      chart.lData.forEach((item, index) => {
        let sItem = {
          ...common,
          type: 'line',
          name: item,
          itemStyle: {
            color: '#fff',
            borderWidth: '2',
            borderColor: color[index],
          },
          lineStyle: { color: color[index] },
          data: chart.xyData[item]
        }
        chart.sData.push(sItem)
      })
      this.$set(this, 'echartData', Object.assign({}, this.echartData, chart))
      this.$nextTick(() => { this.initEchart() })
    },
    // 3、渲染echart
    initEchart() {
      this.echartData?.instance?.clear()
      this.echartData?.instance?.dispose()
      this.resizer?.disconnect()
      let chartDom = document.getElementById('line-echart')
      if (!chartDom) return
      chartDom && chartDom.removeAttribute('_echarts_instance_')
      let myChart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom)
      let option = {
        grid: { top: 70, left: 50, right: 50, bottom: 20, containLabel: true, },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.55)',
          padding: [0, 0],
          formatter: params => {
            let start = `<div class="c-echart-tooltip">
                           <div class="tooltip-title">${params[0].name}</div>
                           <div class="tooltip-content">`
            let end = ` </div></div>`
            let content = ''
            params.forEach(item => {
              let unit = ' ℃'
              let text = `<div class="content-item">
                            <div class="item-cycle" style="background: ${item.borderColor}"></div>
                            <div class="item-text">
                              <div class="text-left">${item.seriesName}</div>
                              <div class="text-right">${item.data[1] || item.data[1] === 0 ? item.data[1] + unit : '暂无数据'}</div>
                            </div>
                           </div>`
              content = content + text
            })
            return start + content + end
          }
        },
        // dataZoom: [
        //   {
        //     type: 'slider',
        //     realtime: true,
        //     handleSize: '100%',      // 滑动条两侧的大小
        //     start: 0,                // 开始位置
        //     end: 100,                // 结束位置
        //     bottom: 10,              // 居下的距离
        //     textStyle: { color: '#1bb4f6' }
        //   }
        // ],
        legend: {
          top: 30,
          textStyle: { color: this.$echartTheme.fcs },
          data: this.echartData.lData
        },
        xAxis: {
          type: 'category',
          axisLine: { show: true, lineStyle: { color: this.$echartTheme.bcp } },
          axisTick: { show: true, lineStyle: { color: this.$echartTheme.bcs }, alignWithLabel: true },
          axisLabel: {
            show: true, color: this.$echartTheme.fcp, align: 'center',
            showMinLabel: true,
            showMaxLabel: true,
            formatter: (value) => {
              const time = value ? this.$dayjs(value).format('MM-DD HH:mm') : '?'
              return time
            }
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '气温 ( ℃ )',
            nameTextStyle: {
              color: this.$echartTheme.fcs,
              fontFamily: 'Alibaba PuHuiTi',
              fontSize: 14,
              fontWeight: 600,
              padding: [0, 0, 0, -30]
            },
            nameGap: 15,
            axisLine: { show: true, lineStyle: { color: this.$echartTheme.bcp } },
            axisTick: { show: false },
            axisLabel: { color: this.$echartTheme.fcp, fontSize: 14 },
            splitLine: { show: true, lineStyle: { color: this.$echartTheme.bcs, type: 'dashed' } }
          }
        ],
        series: this.echartData.sData
      }
      option && myChart.setOption(option, true)
      // 实例化
      this.$set(this.echartData, 'instance', myChart)
      // 监听容器大小变化
      this.resizer = this.$newResizeObserver(() => myChart.resize(), true)
      this.resizer.observe(chartDom)
    },
    // 4、导出echart
    handleExportEchart() {
      let exportFileName = '折线图'
      this.$exportEchartImg(this.echartData.instance, { name: exportFileName, type: 'png', pixelRatio: 10, backgroundColor: this.$echartTheme.bg })
    },
  },

}
</script>

<style lang="scss" scoped>
.line-vue {
  width: 100%;
  height: 100%;
  position: relative;
  color: var(--fcp);

  .echart-title {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 700;
    color: var(--fcp);
    z-index: 9;
  }

  .echart-export {
    position: absolute;
    top: 5px;
    right: 10px;
    font-weight: 700;
    z-index: 9;
    // color: var(--tc);
  }

  #line-echart {
    width: 100%;
    height: 100%;
  }
}
</style>