const common = {
  VUE_APP_TITLE: 'V2项目初始化系统',
  // VUE_APP_PATH: '/power-prediction-yl',
}
const ip = {
  'slx': '192.168.120.19',
  'zjj': '',
  'axk': '192.168.120.34',
  'tey': '192.168.120.60',
  'dev': '',
  'test': '192.168.120.26',
  'prod': '192.168.120.26',
}
const config = {
  'development': {
    ...common,
    VUE_APP_BASE_API: `http://${ip.dev}:10046/power`,
  },
  'test': {
    ...common,
    VUE_APP_BASE_API: `http://${ip.test}:10046/view`,
  },
  'production': {
    ...common,
    VUE_APP_BASE_API: `http://${ip.prod}:10046/view`,
  }
}

return config[window.vEnv.NODE_ENV]

