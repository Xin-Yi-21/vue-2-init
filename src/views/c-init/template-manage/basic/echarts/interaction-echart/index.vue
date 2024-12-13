<template>
  <div class="interaction-echart-vue">
    <div class="v-operate">
      <div class="left">
        <el-form :model="form" ref="formRef">
          <el-form-item label="修改范围：" style="width:380px;margin:0;">
            <el-radio-group v-model="form.updateRange" @change="handleChangeUpdateRange">
              <el-radio v-for="(item, index) of enums.updateRange" :key="index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="修改方式：" prop="field" style="width:240px;margin:0;">
            <el-radio-group v-model="form.updateWay" @change="">
              <el-radio v-for="(item, index) of enums.updateWay" :key="index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="调整数值" prop="updateValue" v-if="form.updateWay === 'value'">
            <el-input-number v-model="form.updateValue" controls-position="right" @focus="(e) => handleRangeValue(e, 'focus')" @change="(e) => handleRangeValue(e, 'change')"></el-input-number><span class="unit">MW</span>
          </el-form-item>
          <el-form-item label="调整比例" prop="updateRatio" v-if="form.updateWay == 'percentage'">
            <el-input-number v-model="form.updateRatio" controls-position="right"></el-input-number> <span class="unit">%</span>
          </el-form-item>
        </el-form>
        <div class="up-down-button">
          <el-button @click="handleOperation('increase')">提升</el-button>
          <el-button @click="handleOperation('decrease')">降低</el-button>
          <el-button @click="handleOperation('assign')">赋值</el-button>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </div>
    </div>

    <div class="c-result">
      <div class="left">
        <div id="v-echart"></div>
      </div>
      <div class="right">
        <el-table :data="tableData" border class="c-table c-table-update" :stripe="false">
          <el-table-column label="时间" prop="time" align="center" width="180">
            <template slot-scope="scope"> {{ $dayjs(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }} </template>
          </el-table-column>
          <el-table-column :label="item" :prop="item" align="center" v-for="(item, index) in echartInfo.lData" :key="index">
            <template slot-scope="scope">
              <el-form class="only-validate-form" :model="scope.row" :rules="formRules" :ref="`columnRef-${index}-${scope.$index}`" @submit.native.prevent>
                <el-form-item label="" :prop="item" :rules="formRules.rain">
                  <el-input type="text" class="fit-table-cell" v-model="scope.row[item]" placeholder="" @change="(value) => handleChangeTableValue(value, scope.row, index, scope.$index)"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import _ from 'lodash'
import { nonNegativeNumberVerify } from '@/utils/verify.js'
export default {
  data() {
    return {
      form: {},
      enums: {},

      apiData: {},
      mData: [],
      initData: [],
      echartInfo: {},
      tableData: [],
      selectedData: [],

      formRules: { rain: [{ validator: nonNegativeNumberVerify, trigger: 'blur' },], },

      isBrushed: false,
    }
  },
  created() {
    this.init()
  },
  beforeDestroy() {
    this.echartInfo?.instance?.clear()
    this.echartInfo?.instance?.dispose()
  },
  methods: {
    // 模拟api
    echartDataGet() {
      return new Promise((resolve, reject) => {
        try {
          const data = {
            '济南': [
              { time: '2024-01-01 12:00:00', temperature: 1, rain: 10, windDirection: 350, windSpeed: 4, humidity: 70, pressure: 1030, },
              { time: '2024-04-01 12:00:00', temperature: 10, rain: 30, windDirection: 220, windSpeed: 3, humidity: 50, pressure: 1015, },
              { time: '2024-07-01 12:00:00', temperature: 25, rain: 120, windDirection: 150, windSpeed: 2, humidity: 80, pressure: 1010, },
              { time: '2024-10-01 12:00:00', temperature: 15, rain: 40, windDirection: 300, windSpeed: 4, humidity: 60, pressure: 1025, },
            ],
            '青岛': [
              { time: '2024-01-01 12:00:00', temperature: 5, rain: 20, windDirection: 320, windSpeed: 5, humidity: 70, pressure: 1020, },
              { time: '2024-04-01 12:00:00', temperature: 15, rain: 40, windDirection: 210, windSpeed: 4, humidity: 75, pressure: 1015, },
              { time: '2024-07-01 12:00:00', temperature: 22, rain: 180, windDirection: 180, windSpeed: 3, humidity: 85, pressure: 1010, },
              { time: '2024-10-01 12:00:00', temperature: 16, rain: 50, windDirection: 310, windSpeed: 4, humidity: 70, pressure: 1020, },
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
      this.getEnums()
      this.setDefaultParams()
      this.getData()
    },
    // 1、获取枚举
    getEnums() {
      let updateRange = [{ label: '单点调整', value: 'single' }, { label: '选区调整', value: 'range' }, { label: '全局调整', value: 'whole' },]
      let updateWay = [{ label: '数值', value: 'value' }, { label: '比例', value: 'percentage' },]
      this.$set(this.enums, 'updateRange', updateRange)
      this.$set(this.enums, 'updateWay', updateWay)
    },
    // 2、设置默认参数
    setDefaultParams() {
      this.$set(this.form, 'updateRange', this.enums.updateRange[0].value)
      this.$set(this.form, 'updateWay', this.enums.updateWay[0].value)
    },
    // 3、获取数据
    async getData() {
      const res = await this.echartDataGet()
      this.$set(this, 'apiData', res.data || {})
      this.handleMData(this.apiData || [], 'api')
      this.handleEchartInfo(this.mData)
      this.hadnleTableData(this.mData)
    },
    // 4、处理数据
    // (1) 处理中间数据
    handleMData(data, from) {
      if (data.length === 0) { return this.$set(this, 'mData', []) }
      if (from === 'api') {
        let mData = this.$completeTable(data, (rowItem, matchData, fromK) => { rowItem[fromK] = matchData.rain }, 'time', 'time') || []
        this.$set(this, 'mData', mData)
        this.$set(this, 'initData', JSON.parse(JSON.stringify(mData)))
      } else if (from === 'table') {
        this.$set(this, 'mData', data)
      } else if (from === 'echart') {
        let mData = []
        this.initData.forEach(item1 => {
          let mDataItem = { time: item1.time, }
          for (var k in data) {
            let matchItem = data[k].find(item2 => mDataItem.time === item2.value[0])?.value || {}
            mDataItem[k] = matchItem[1] || null
          }
          mData.push(mDataItem)
        })

        this.$set(this, 'mData', mData)
      }
      // console.log('查this.mData', this.mData)
    },
    // (2) 处理echart数据
    handleEchartInfo(mData) {
      let chart = { lData: [], xData: [], xyData: {}, sData: [], }
      for (var k in this.apiData) { chart.lData.push(k) }
      chart.lData.forEach(k => {
        chart.xyData[k] = []
        mData.forEach(item2 => {
          chart.xyData[k].push({ value: [item2.time, item2[k]] })
        })
      })
      let common = { smooth: true, showAllSymbol: true, symbol: 'circle', symbolSize: 4, connectNulls: false }
      let color = ['#549BDD', '#59D7D7', '#5ABCAA', '#93E42B', '#2ADE26', '#2981D2', '#C274E7']
      chart.lData.forEach((item, index) => {
        let sItem = {
          ...common,
          id: 'line' + (index + 1),
          type: 'line',
          name: item,
          itemStyle: {
            color: color[index],
            borderWidth: '2',
            borderColor: color[index]
          },
          lineStyle: { color: color[index] },
          data: chart.xyData[item],
        }
        chart.sData.push(sItem)
      })
      this.$set(this, 'echartInfo', Object.assign({}, this.echartInfo, chart))
      this.$nextTick(() => { this.initEchart() })
    },
    // (3) 处理表格数据
    hadnleTableData(mData) {
      this.$set(this, 'tableData', mData)
    },
    // 3、echart渲染
    // (1) 初始化
    initEchart() {
      this.echartInfo?.instance?.clear()
      this.echartInfo?.instance?.dispose()
      let chartDom = document.getElementById('v-echart')
      chartDom.removeAttribute('_echarts_instance_')
      let myChart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom)
      let option = {
        toolbox: { top: 10, right: 20, },
        grid: { top: 80, left: 70, right: 70, bottom: 50, containLabel: true },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.55)',
          padding: [0, 0],
          formatter: params => {
            // this.form.updateRange === 'single' ? params = [params] : ''
            let start = `<div class="c-echart-tooltip">
                           <div class="tooltip-title">${params[0].name}</div>
                           <div class="tooltip-content">`
            let end = ` </div></div>`
            let content = ''
            params.forEach(item => {
              let unit = ' MW'
              let text = `<div class="content-item">
                            <div class="item-cycle" style="background: ${item.color}"></div>
                            <div class="item-text">
                              <div class="text-left">${item.seriesName}</div>
                              <div class="text-right">${item.data.value[1] || item.data.value[1] === 0 ? item.data.value[1] + unit : '暂无数据'}</div>
                            </div>
                          </div>`
              content = content + text
            })
            return start + content + end
          },
        },
        dataZoom: [{ type: 'slider', realtime: true, handleSize: '100%', start: 0, end: 100, bottom: 10, textStyle: { color: '#1bb4f6' } }],
        legend: {
          top: 20,
          textStyle: { color: this.$echartTheme.fcs },
          data: this.echartInfo.lData
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
            name: '降水 ( mm )',
            nameTextStyle: {
              color: this.$echartTheme.fcs,
              fontFamily: 'Alibaba PuHuiTi',
              fontSize: 14,
              fontWeight: 600,
              padding: [0, 0, 0, -30]
            },
            nameGap: 15,
            max: function (value) { return value.max + 5 },
            axisLine: { show: true, lineStyle: { color: this.$echartTheme.bcp } },
            axisTick: { show: false },
            axisLabel: { color: this.$echartTheme.fcp, fontSize: 14 },
            splitLine: { show: true, lineStyle: { color: this.$echartTheme.bcs, type: 'dashed' } }
          },
        ],
        series: this.echartInfo.sData
      }

      if (this.form.updateRange === 'single') {
        option && myChart.setOption(option)
        this.handleEchartPointClick(myChart)
        // option.tooltip?.triggerOn = 'none'
        // delete option.tooltip.trigger
        // option && myChart.setOption(option)
        // this.handleEchartDrag(myChart)
      } else if (this.form.updateRange === 'range') {
        option.brush = {
          toolbox: ['rect', 'lineX', 'lineY', 'clear'],
          right: 20,
          xAxisIndex: 0,
          throttleType: 'deounce',
          throttleDelay: 1000,
        }
        option && myChart.setOption(option)
        this.handleEchartBrush(myChart, this.echartInfo.xyData)
      } else if (this.form.updateRange === 'whole') {
        option && myChart.setOption(option)
        let selectedData = []
        for (var k in this.echartInfo.xyData) {
          this.echartInfo.xyData[k].forEach(item => {
            selectedData.push({ value: item.value })
          })
        }
        this.$set(this, 'selectedData', selectedData)
        this.handleEchartHighlight(myChart)
      }
      this.$set(this.echartInfo, 'instance', myChart)
      window.addEventListener('resize', () => { myChart.resize() })
    },
    // (2) echart单点
    handleEchartPointClick(myChart) {
      myChart.on('click', e => {
        var selectedData = [{ value: e.value }]
        console.log('选中的点数据', selectedData)
        this.$set(this, 'selectedData', selectedData)
        this.handleEchartHighlight(myChart)
      })
    },
    // (3) echart拖拽
    handleEchartDrag(myChart) {
      let data = []
      for (var k in this.echartInfo.xyData) { data.push(...this.echartInfo.xyData[k]) }
      let lLength = this.echartInfo.lData.length
      let xLength = this.echartInfo.xData.length
      // 设置图形元素，允许每个折线的数据点进行拖拽
      myChart.setOption({
        graphic: echarts.util.map(data, (item, dataIndex) => {
          var lineIndex = Math.floor(dataIndex / xLength);  // 确定是属于哪条折线
          var pos = myChart.convertToPixel('grid', item);  // 获取转换后的坐标
          return {
            type: 'circle',
            x: pos[0],
            y: pos[1],
            shape: { r: 4 },
            invisible: true,
            draggable: true,
            ondrag: echarts.util.curry(onPointDragging, dataIndex, lineIndex), // 拖拽时处理
            // ondrag: _.debounce(echarts.util.curry(onPointDragging, dataIndex, lineIndex), 1000), // 拖拽时处理
            onmousemove: echarts.util.curry(showTooltip, dataIndex, xLength),
            onmouseout: echarts.util.curry(hideTooltip, dataIndex, xLength),
            z: 100
          }
        })
      })
      // 响应拖拽事件，更新数据
      function onPointDragging(dataIndex, lineIndex, dx, dy) {
        // 获取当前拖拽点的新位置
        var newPosition = myChart.convertFromPixel('grid', [this.x, this.y]);
        var newY = newPosition[1]
        // 更新对应折线的数据，只修改 Y 坐标
        data[dataIndex][1] = newY.toFixed(2)
        // 更新图表数据
        var updateSData = []
        for (var i = 0; i < lLength; i++) {
          updateSData.push({
            id: 'line' + (i + 1),
            type: 'line',
            smooth: true,
            symbolSize: 4,
            data: data.slice(i * xLength, (i + 1) * xLength),
          })
        }
        myChart.setOption({ series: updateSData })
        // 获取更新后的echart数据
        var newSData = myChart.getOption().series
        var xyData = {}
        newSData.forEach(item1 => { xyData[item1.name] = item1.data })
        // console.log('查myChart.getOption()', myChart.getOption())
        console.log("Updated ECharts Option:", xyData)

        this.$nextTick(() => {
          this.handleMData(xyData, 'echart')
          this.hadnleTableData(this.mData)
        })
      }
      // 显示提示框
      function showTooltip(dataIndex, xLength) {
        // let xLength = this.echartInfo.xData.length
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: Math.floor(dataIndex / xLength),
          dataIndex: dataIndex % xLength
        })
      }
      // 隐藏提示框
      function hideTooltip() {
        myChart.dispatchAction({ type: 'hideTip' })
      }
      // 监听窗口大小调整
      window.addEventListener('resize', function () {
        myChart.setOption({
          graphic: echarts.util.map(data, function (item, dataIndex) {
            var pos = myChart.convertToPixel('grid', item)
            return { x: pos[0], y: pos[1] }               // 更新 x 和 y 坐标
          })
        })
      })
    },
    // (4) echart刷选
    handleEchartBrush(myChart, xyData) {
      let isBrushed = false
      myChart.on('brushSelected', e => {
        this.$set(this, 'selectedData', [])
        let selectedRange = []
        e.batch.forEach(batchItem => {
          batchItem.areas.forEach(areaItem => {
            let rangeItem = {}
            switch (areaItem.brushType) {
              case 'rect':
                // areaItem.coordRange : [ [ x最小索引 , x最小索引 ] , [ y最小值 , y最小值 ] ],
                // areaItem.range : [ [ x最小像素 , x最小像素 ] , [ y最小像素 , y最大像素 ] ] 
                handleSelectedXIndex(areaItem.coordRange[0], areaItem.range[0])
                var xMin = areaItem.coordRange[0][0]
                var xMax = areaItem.coordRange[0][1]
                var yMin = areaItem.coordRange[1][0]
                var yMax = areaItem.coordRange[1][1]
                rangeItem = { xMin, xMax, yMin, yMax }
                break
              case 'lineX':
                handleSelectedXIndex(areaItem.coordRange, areaItem.range)
                var xMin = areaItem.coordRange[0]
                var xMax = areaItem.coordRange[1]
                var yMin = -Infinity
                var yMax = Infinity
                rangeItem = { xMin, xMax, yMin, yMax }
                break
              case 'lineY':
                var xMin = -Infinity
                var xMax = Infinity
                var yMin = areaItem.coordRange[0]
                var yMax = areaItem.coordRange[1]
                rangeItem = { xMin, xMax, yMin, yMax }
                break
            }
            selectedRange.push(rangeItem)
          })
        })
        let selectedData = handleSelectedData(xyData) || []
        this.$set(this, 'selectedData', selectedData)
        this.handleEchartHighlight(myChart)
        // console.log('echart刷选e', e)
        // console.log('selectedRange', selectedRange)
        // console.log('selectedData', selectedData)
        // 处理x轴选中范围
        function handleSelectedXIndex(coordRange, range, xAxisIndex = 0) {
          let startPointPixel = myChart.convertToPixel({ xAxisIndex: xAxisIndex }, coordRange[0])      // 初始最小索引对应像素
          let endPointPixel = myChart.convertToPixel({ xAxisIndex: xAxisIndex }, coordRange[1])        // 初始最大索引对应像素
          // 选中区域最小像素 > 初始最小索引对应像素 : 最小索引 + 1
          if (range[0] > startPointPixel) {
            coordRange[0] = coordRange[0] + 1
          }
          // 选中区域最大像素 < 初始最大索引对应像素 : 最大索引 - 1
          if (range[1] < endPointPixel) {
            coordRange[1] = coordRange[1] - 1
          }
          // 如选中区域无点，则 最大索引 < 最小索引，
        }

        // 处理选中数据
        function handleSelectedData(xyData) {
          xyData = JSON.parse(JSON.stringify(xyData))
          let selectedData = []
          for (var k in xyData) {
            let filteredData = xyData[k].filter((item1, index1) => {
              return selectedRange.some(item2 => {
                return index1 >= item2.xMin && index1 <= item2.xMax && item1.value[1] >= item2.yMin && item1.value[1] <= item2.yMax
              })
            })
            selectedData = selectedData.concat(filteredData)
          }
          return selectedData
        }
        isBrushed = e.batch[0].areas.length > 0
        this.isBrushed = isBrushed
      })

      // 监听 dataZoom 事件 
      myChart.on('dataZoom', _.debounce(e => {
        if (isBrushed) {
          myChart.dispatchAction({ type: 'brush', areas: [] })
          this.$message.warning('监测到缩放，请重新选择折线图数据进行修正！');
        }
      }, 500))
    },
    // (5) echart 选中高亮
    handleEchartHighlight(myChart) {
      var sData = myChart.getOption().series
      // console.log('查sData', sData)
      // console.log('查this.selectedData', this.selectedData)
      sData.forEach(item1 => {
        item1.data.forEach(item2 => {
          delete item2.itemStyle
          this.selectedData.forEach(item3 => {
            if (item2.value[0] == item3.value[0] && item2.value[1] == item3.value[1]) {
              item2.itemStyle = { color: 'red', borderColor: 'red' }
            }
          })
        })
      })
      myChart.setOption({ series: sData })
    },
    // 二、操作相关
    // 1、改变曲线修改范围
    handleChangeUpdateRange(updateType) {
      this.initEchart()
    },
    // 2、数值框事件
    handleRangeValue(e, type) {
      if (type === 'focus' && this.form.updateRange === 'range' && !this.isBrushed) {
        this.$message.warning('检测到当前并无选中区域，请选择某区域数据进行修改！')
      }
    },
    // 3、曲线修改运算
    handleOperation(type) {
      // console.log('查选中的点数据', this.selectedData)
      // console.log('查所有数据', this.echartInfo.xyData)
      // console.log('this.form.updateType', this.form.updateType)
      let xyData = this.echartInfo.xyData
      if (!this.form.updateValue) { this.form.updateValue = 0 }
      if (!this.form.updateRatio) { this.form.updateRatio = 0 }
      for (var k in xyData) {
        xyData[k].forEach((item1, index) => {
          this.selectedData.forEach(item2 => {
            if (item1.value[0] == item2.value[0] && item1.value[1] == item2.value[1]) {
              // 数值调整
              // 提升
              if (type === 'increase' && this.form.updateWay === 'value') {
                item1.value[1] = this.$accurate(item1.value[1] + this.form.updateValue, 3, false)
              }
              // 降低
              if (type === 'decrease' && this.form.updateWay === 'value') {
                item1.value[1] = this.$accurate(item1.value[1] - this.form.updateValue, 3, false)
              }
              // 赋值
              if (type === 'assign' && this.form.updateWay === 'value') {
                item1.value[1] = this.$accurate(this.form.updateValue, 3, false)
              }
              // 比例调整
              // 提升
              if (type === 'increase' && this.form.updateWay === 'percentage') {
                item1.value[1] = this.$accurate(item1.value[1] * (1 + this.form.updateRatio / 100), 3, false)
              }
              // 降低
              if (type === 'decrease' && this.form.updateWay === 'percentage') {
                item1.value[1] = this.$accurate(item1.value[1] * (1 - this.form.updateRatio / 100), 3, false)
              }
              // 赋值
              if (type === 'assign' && this.form.updateWay === 'percentage') {
                item1.value[1] = this.$accurate(item1.value[1] * (this.form.updateRatio / 100), 3, false)
              }
            }
          })
        })
      }
      // this.$set(this.echartInfo, 'xyData', xyData)
      // this.echartInfo.instance.setOption({ series: this.echartInfo.sData }, false, true)  // 保留刷选刷新
      this.initEchart()
      this.handleMData(this.echartInfo.xyData, 'echart')
      this.hadnleTableData(this.mData)
    },
    // 4、表格修改功率
    handleChangeTableValue(value, rowItem, columnIndex, rowIndex) {
      this.$nextTick(() => {
        const columnRef = this.$refs[`columnRef-${columnIndex}-${rowIndex}`]
        columnRef && columnRef[0] && columnRef[0].validate((valid) => {
          if (!valid) return this.$message.warning('数据格式为数字，请检查数据格式！')
          this.handleMData(this.tableData, 'table')
          this.handleEchartInfo(this.mData)
        })
      })
    },
    // 5、保存
    handleSave() {
      this.$confirm('确定保存已修改的数据吗？', '确认消息', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', customClass: 'c-message-confirm' }).then(() => {
        let changedData = []
        console.log('查this.initData', this.initData)
        console.log('查this.mData', this.mData)
        this.initData.forEach((item1) => {
          this.mData.forEach((item2) => {
            this.echartInfo.lData(item3 => {
              if (item1.time === item2.time && item1[item3] != item2[item3]) {
                changedData.push(item2)
              }
            })
          })
        })
        if (changedData.length === 0) { return this.$message.warning('检测到当前无数据更改！') }
        // dataCorrect(params).then(res => {
        //   if (res.code === 200) {
        //     this.$message.success('数据修改成功！')
        //     this.getData()
        //   }
        // })
      }).catch(() => { this.$message.warning('已取消修改！') })
    },
    // 6、取消
    handleCancel() {
      this.$confirm('确定取消已修改的数据吗？', '确认消息', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', customClass: 'c-message-confirm' }).then(() => {
        this.init()
      }).catch(() => { this.$message.warning('已取消还原！') })
    }
  },
}
</script>

<style lang="scss" scoped>
.interaction-echart-vue {
  height: 100%;
  position: relative;

  .v-operate {
    display: flex;
    width: 100%;
    height: 60px;
    margin: 0 0 10px;
    padding: 0 10px;
    background-color: var(--bg-card);
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 4px 4px 4px 4px;

    .left {
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;

      ::v-deep .el-form {
        display: flex;
        align-items: center;
        height: 100%;

        .el-form-item {
          display: flex;
          margin: 0 20px 0 0;

          .el-form-item__label {
            flex-shrink: 0;
            padding-right: 10px;
            width: 100px;
          }

          .el-form-item__content {
            flex-grow: 1;
            min-width: 80px;

            .el-input {
              width: 100%;
            }

            .el-select {
              width: 100%;
            }
          }
        }

        .el-radio-group {
          .el-radio {
            margin-right: 15px;

            .el-radio__label {
              padding-left: 5px;
            }
          }
        }

        .el-input-number {
          width: 120px;
        }
      }

      .unit {
        padding-left: 5px;
      }

      .up-down-button {
        margin-left: 10px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
      width: 200px;
      height: 100%;
    }
  }

  .c-result {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100% - 70px);
    border-radius: 4px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    margin: 0;

    .left {
      width: calc(100% - 400px);
      height: 100%;
      position: relative;

      #v-echart {
        width: 100%;
        height: 100%;
      }
    }

    .right {
      width: 400px;
      height: 100%;
      border-left: 1px solid #ccc;
      padding: 10px 0;

      .el-table {
        width: calc(100% - 20px);
        height: calc(100% - 0px);
        margin: 0 10px;
      }
    }
  }
}
</style>
