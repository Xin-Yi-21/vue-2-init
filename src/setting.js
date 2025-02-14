export default {
  // 动态标题
  isDynamicTitle: true,
  // 主题风格
  themeStyle: 'light',
  // 主题颜色
  themeColor: '#55c791',
  // 主题大小
  themeSize: 'large',
  // 主题轻量级颜色
  themeLightColor: '#55c79166',
  // 显示布局
  showSettings: true,
  // 左侧导航
  leftNav: {
    isShow: true,
    isCollapse: false,
    withoutAnimation: false,
  },
  // 顶部页头
  topHeader: {
    isShow: true,
    isBreadcrumb: true,
  },
  // 顶部导航
  topNav: {
    isShow: true,
  },
  // 顶部工具
  topBar: {
    isShow: false,
  },
  // 顶部标签
  topTag: {
    isShow: false,
  },
  // 是否全屏
  isFullScreen: false,
  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
