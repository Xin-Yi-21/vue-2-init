import Vue from 'vue'
// ⭐ 项目全局配置
window.V = process.env
import { setConfig, cENV } from '@/api/system/config'
import App from './App'

// 样式相关
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import Element from 'element-ui'
import Cookies from 'js-cookie'
Vue.use(Element, { size: Cookies.get('size') || 'medium' })

// ⭐ 获取全局配置后执行的文件
setConfig().then(async () => {
  for (var k in cENV) {
    Vue.prototype[k] = cENV[k]
  }
  document.title = cENV.VUE_APP_TITLE
  await import('./utils/request.js')                         // import('./utils/request')
  await import('./permission.js')                            // import('./permission')
  await import('./permission.js')                            // import('./permission')
  const directive = (await import('./directive')).default    // import directive from './directive'
  const plugins = (await import('./plugins')).default        // import plugins from './plugins'
  const store = (await import('./store')).default            // import store from './store'
  const router = (await import('./router')).default          // import router from './router'
  Vue.use(directive)
  Vue.use(plugins)
  // 全局方法
  // getTableHeaderLRVByGlobal
  const dayjs = (await import('dayjs')).default
  const { $getEnumsLabel, $getEnumsLabelList, $exportEchartImg, $exportDomTable, $uniqueArray, $sortArray, } = await import("@/utils/common.js")
  const { throttle, debounce, deepClone } = await import("lodash")
  Vue.prototype.$bus = new Vue()
  Vue.prototype.$dayjs = dayjs
  Vue.prototype.$getEnumsLabel = $getEnumsLabel
  Vue.prototype.$getEnumsLabelList = $getEnumsLabelList
  Vue.prototype.$exportEchartImg = $exportEchartImg
  Vue.prototype.$exportDomTable = $exportDomTable
  Vue.prototype.$throttle = throttle
  Vue.prototype.$debounce = debounce
  Vue.prototype.$deepClone = deepClone
  // Vue.prototype.$downloadFile = $downloadFile
  // Vue.prototype.$previewFile = $previewFile
  // Vue.prototype.$loadingStart = $loadingStart
  // Vue.prototype.$loadingEnd = $loadingEnd
  Vue.prototype.$uniqueArray = $uniqueArray
  Vue.prototype.$sortArray = $sortArray

  // const echartTheme = themeFile[store.state.theme.currentTheme].echartScssFile()     // Echart主题变量
  // Vue.prototype.$echartTheme = echartTheme                                           // 挂载为全局变量
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    // beforeCreate() { Vue.prototype.$bus = this },
  })
})



// import './assets/icons' // icon



