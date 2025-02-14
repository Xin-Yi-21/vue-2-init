
import auth from './auth'
import modal from './modal'
import tab from './tab'

export default {
  install(Vue) {
    // 认证对象
    Vue.prototype.$auth = auth
    // 模态框对象
    Vue.prototype.$modal = modal
    // 页签操作
    Vue.prototype.$tab = tab
  }
}
