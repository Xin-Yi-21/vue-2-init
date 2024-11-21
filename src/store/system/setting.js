import defaultSetting from '@/setting'
// import { useDynamicTitle } from '@/utils/dynamicTitle'
import Cookies from 'js-cookie'
const { defaultTitle, themeStyle, themeColor, elSize, leftNav, isTopNav, isTopBar, isBreadcrumb, isTopTag, isDynamicTitle, isFixHeader, isFullScreen } = defaultSetting
const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''
const setting = {
  state: () => ({
    routeTitle: '',
    leftNav: {
      isCollapse: storageSetting.leftNav?.isCollapse === undefined ? leftNav.isCollapse : storageSetting.leftNav.isCollapse,
      withoutAnimation: storageSetting.leftNav?.withoutAnimation === undefined ? leftNav.withoutAnimation : storageSetting.leftNav.withoutAnimation,
      isShow: storageSetting.leftNav?.isShow === undefined ? leftNav.isShow : storageSetting.leftNav.isShow,
    },
    // theme: storageSetting.theme || '#409EFF',
    // sideTheme: storageSetting.sideTheme || sideTheme,
    // showSettings: showSettings,
    // fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
    themeStyle: storageSetting.themeStyle === undefined ? themeStyle : storageSetting.themeStyle,
    themeColor: storageSetting.themeColor === undefined ? themeColor : storageSetting.themeColor,
    elSize: storageSetting.elSize === undefined ? elSize : storageSetting.elSize,
    // isLeftNav: storageSetting.isLeftNav === undefined ? isLeftNav : storageSetting.isLeftNav,
    isTopNav: storageSetting.isTopNav === undefined ? isTopNav : storageSetting.isTopNav,
    isTopBar: storageSetting.isTopBar === undefined ? isTopBar : storageSetting.isTopBar,
    isTopTag: storageSetting.isTopTag === undefined ? isTopTag : storageSetting.isTopTag,
    isBreadcrumb: storageSetting.isBreadcrumb === undefined ? isBreadcrumb : storageSetting.isBreadcrumb,
    isDynamicTitle: storageSetting.isDynamicTitle === undefined ? isDynamicTitle : storageSetting.isDynamicTitle,
    isFixHeader: storageSetting.isFixHeader === undefined ? isFixHeader : storageSetting.isFixHeader,
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
    // 切换左侧导航显示
    setLeftNav(state, withoutAnimation) {
      if (state.leftNav.isShow) {
        document.body.setAttribute('leftNavStatus', state.leftNav.isCollapse ? 'collapse' : 'expand')
      } else {
        document.body.setAttribute('leftNavStatus', 'hide')
      }
      // state.leftNav.withoutAnimation = withoutAnimation
      // Cookies.set('leftNavStatus', state.leftNav.isCollapse ? true : false)
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
    // 切换左侧导航显示
    setLeftNav({ commit }, withoutAnimation) {
      commit('setLeftNav', withoutAnimation)
    },
  },
}


export default setting
