import defaultSetting from '@/setting'
const { defaultTitle, themeStyle, themeColor, themeSize, topHeader, leftNav, topNav, topBar, topTag, isDynamicTitle, isFullScreen } = defaultSetting
import { handleThemeColor } from '@/utils/theme'
const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const setting = {
  state: () => ({
    routeTitle: '',
    leftNav: {
      isShow: storageSetting.leftNav?.isShow === undefined ? leftNav.isShow : storageSetting.leftNav.isShow,
      isCollapse: storageSetting.leftNav?.isCollapse === undefined ? leftNav.isCollapse : storageSetting.leftNav.isCollapse,
      withoutAnimation: storageSetting.leftNav?.withoutAnimation === undefined ? leftNav.withoutAnimation : storageSetting.leftNav.withoutAnimation,
    },
    topHeader: {
      isShow: storageSetting.topHeader?.isShow === undefined ? topHeader.isShow : storageSetting.topHeader.isShow,
      isBreadcrumb: storageSetting.topHeader?.isBreadcrumb === undefined ? topHeader.isBreadcrumb : storageSetting.topHeader.isBreadcrumb,
    },
    topNav: {
      isShow: storageSetting.topNav?.isShow === undefined ? topNav.isShow : storageSetting.topNav.isShow,
    },
    topBar: {
      isShow: storageSetting.topBar?.isShow === undefined ? topBar.isShow : storageSetting.topBar.isShow,
    },
    topTag: {
      isShow: storageSetting.topTag?.isShow === undefined ? topTag.isShow : storageSetting.topTag.isShow,
    },
    themeStyle: storageSetting.themeStyle === undefined ? themeStyle : storageSetting.themeStyle,
    themeColor: storageSetting.themeColor === undefined ? themeColor : storageSetting.themeColor,
    themeSize: storageSetting.themeSize === undefined ? themeSize : storageSetting.themeSize,
    theme: {},
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
      let defaultTitle = window?.cEnv?.VUE_APP_TITLE || ''
      if (state.isDynamicTitle) {
        document.title = state.routeTitle + (defaultTitle ? ` - ${defaultTitle}` : '')
      } else {
        document.title = defaultTitle
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
    // 设置顶部页头
    setTopHeader(state) {
      if (state.topHeader.isShow) {
        document.body.setAttribute('topHeaderStatus', 'show')
      } else {
        document.body.setAttribute('topHeaderStatus', 'hide')
      }
    },
    // 设置主题风格
    setThemeStyle(state) {
      handleThemeStyle(state.themeStyle, state.theme)
    },
    // 设置主题颜色
    setThemeColor(state) {
      handleThemeColor(state.themeColor)
    },
    // 设置主题大小
    setThemeSize(state) {
      handleThemeSize(state.themeSize)
    },
    // 设置主题信息集合
    setTheme(state) {
      let newTheme = {}
      if (state.themeStyle === 'light') {
        newTheme.echartTheme = { bg: '#fff', fcp: '#333', fcs: '#666', fct: '#999', bcp: '#ccc', bcs: '#ddd', bct: '#eee', }
      } else if (this.themeStyle === 'dark') {
        newTheme.echartTheme = { bg: '#333', fcp: '#fff', fcs: 'rgba(255, 255, 255, 0.8)', fct: 'rgba(255, 255, 255, 0.6)', bcp: '#efefef', bcs: '#5d5d5d', bct: '#666', }
      }
      newTheme.themeSyle = state.themeStyle
      newTheme.themeColor = state.themeColor
      newTheme.themeSize = state.themeSize
      const htmlStyles = document.documentElement.style
      const cssV = {}
      for (let i = 0; i < htmlStyles.length; i++) {
        const property = htmlStyles[i]
        if (property?.startsWith('--')) {
          const value = htmlStyles.getPropertyValue(property).trim()
          const propertyName = property.slice(2)
          cssV[propertyName] = value
        }
      }
      newTheme.cssV = cssV
      state.theme = newTheme
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
    // 设置顶部页头
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
    // 设置主题大小
    setThemeSize({ commit }) {
      commit('setThemeStyle')
    },
    // 设置主题
    setTheme({ commit }) {
      commit('setTheme')
    },
  },
}


export default setting
