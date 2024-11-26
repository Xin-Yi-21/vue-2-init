import defaultSetting from '@/setting'
const { defaultTitle, themeStyle, themeColor, elSize, topHeader, leftNav, isTopNav, isTopBar, isTopTag, isDynamicTitle, isFullScreen } = defaultSetting
import { handleThemeColor } from '@/utils/theme'
const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const setting = {
  state: () => ({
    routeTitle: '',
    topHeader: {
      isShow: storageSetting.topHeader?.isShow === undefined ? topHeader.isShow : storageSetting.topHeader.isShow,
      isBreadcrumb: storageSetting.topHeader?.isBreadcrumb === undefined ? topHeader.isBreadcrumb : storageSetting.topHeader.isBreadcrumb,
    },
    leftNav: {
      isShow: storageSetting.leftNav?.isShow === undefined ? leftNav.isShow : storageSetting.leftNav.isShow,
      isCollapse: storageSetting.leftNav?.isCollapse === undefined ? leftNav.isCollapse : storageSetting.leftNav.isCollapse,
      withoutAnimation: storageSetting.leftNav?.withoutAnimation === undefined ? leftNav.withoutAnimation : storageSetting.leftNav.withoutAnimation,
    },
    themeStyle: storageSetting.themeStyle === undefined ? themeStyle : storageSetting.themeStyle,
    themeColor: storageSetting.themeColor === undefined ? themeColor : storageSetting.themeColor,
    elSize: storageSetting.elSize === undefined ? elSize : storageSetting.elSize,
    isTopNav: storageSetting.isTopNav === undefined ? isTopNav : storageSetting.isTopNav,
    isTopBar: storageSetting.isTopBar === undefined ? isTopBar : storageSetting.isTopBar,
    isTopTag: storageSetting.isTopTag === undefined ? isTopTag : storageSetting.isTopTag,
    isDynamicTitle: storageSetting.isDynamicTitle === undefined ? isDynamicTitle : storageSetting.isDynamicTitle,
    // isFullScreen: storageSetting.isFullScreen === undefined ? isFullScreen : storageSetting.isFullScreen,
  }),
  mutations: {
    // 修改布局设置
    changeSetting(state, data) {
      const { key, value } = data
      if (state.hasOwnProperty(key)) {
        state[key] = value
      }
    },
    // 设置网页标题
    setTitle(state, title) {
      state.routeTitle = title
      if (state.isDynamicTitle) {
        document.title = state.routeTitle + ' - ' + defaultTitle
      } else {
        document.title = defaultTitle
      }
    },
    setTopHeader(state) {
      if (state.topHeader.isShow) {
        document.body.setAttribute('topHeaderStatus', 'show')
      } else {
        document.body.setAttribute('topHeaderStatus', 'hide')
      }
    },
    // 设置左侧导航
    setLeftNav(state, withoutAnimation) {
      if (state.leftNav.isShow) {
        document.body.setAttribute('leftNavStatus', state.leftNav.isCollapse ? 'collapse' : 'expand')
      } else {
        document.body.setAttribute('leftNavStatus', 'hide')
      }
    },
    // 设置主题颜色
    setThemeColor(state) {
      console.log('查state', state)
      handleThemeColor(state.themeColor)
    },

  },
  actions: {
    // 修改布局设置
    changeSetting({ commit }, data) {
      commit('changeSetting', data)
    },
    // 设置网页标题
    setTitle({ commit }, title) {
      commit('setTitle', title)
    },
    // 设置头部
    setTopHeader({ commit }) {
      commit('setTopHeader')
    },
    // 切换左侧导航显示
    setLeftNav({ commit }, withoutAnimation) {
      commit('setLeftNav', withoutAnimation)
    },
    // 设置主题颜色
    setThemeColor({ commit }) {
      commit('setThemeColor')
    },
  },
}


export default setting
