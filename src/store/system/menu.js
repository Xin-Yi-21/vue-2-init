import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { menuGet } from '@/api/system/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/system/parent-view'
import InnerLink from '@/components/system/inner-link'

const menu = {
  state: {
    // 全部结构路由(routes) = 常量路由(constantRoutes) + 动态路由(dynamicRoutes) + 后端路由(backendRoutes)
    // 全部可访问路由(accessRoutes) = 常量路由(constantRoutes) + 动态路由(dynamicRoutes) + 后端可访问路由(accessBackendRoutes)
    // 系统运行添加的路由(addRoutes) = 动态路由(dynamicRoutes) + 后端可访问路由(accessBackendRoutes)
    routes: [],
    addRoutes: [],
    leftNavRoutes: [],     // 左侧导航结构路由
    topNavRoutes: [],      // 顶部导航结构路由
  },
  mutations: {
    // SET_ROUTES: (state, routes) => {
    //   state.addRoutes = routes
    //   state.routes = constantRoutes.concat(routes)
    // },
    // SET_DEFAULT_ROUTES: (state, routes) => {
    //   state.defaultRoutes = constantRoutes.concat(routes)
    // },
    // SET_TOPBAR_ROUTES: (state, routes) => {
    //   state.topbarRouters = routes
    // },
    // SET_SIDEBAR_ROUTERS: (state, routes) => {
    //   state.sidebarRouters = routes
    // },

    // 设置 结构路由
    setRoutes(state, routes) {
      state.routes = routes
    },
    // 设置增加路由
    setAddRoutes(state, routes) {
      state.addRoutes = routes
    },
    // 设置 左侧导航结构路由
    setLeftNavRoutes(state, routes) {
      state.leftNavRoutes = routes
    },
    // 设置 顶部导航结构路由
    setTopNavRoutes(state, routes) {
      state.topNavRoutes = routes
    },
  },
  actions: {
    // 生成路由
    generateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        menuGet().then(res => {
          const dyRoutes = handleDynamicRoutes(dynamicRoutes)
          // dyRoutes.forEach(item => { router.addRoute(item) })

          const resData1 = JSON.parse(JSON.stringify(res.data))
          const backendRoutes = handleBackendRoutes(resData1)
          const structureRoutes = constantRoutes.concat(dyRoutes, backendRoutes,)

          const resData2 = JSON.parse(JSON.stringify(res.data))
          const accessBackendRoutes = handleBackendRoutes(resData2, false, true,)
          const addRoutes = accessBackendRoutes.concat(dyRoutes)

          commit('setRoutes', structureRoutes)
          commit('setTopNavRoutes', structureRoutes)
          commit('setLeftNavRoutes', structureRoutes)
          commit('setAddRoutes', addRoutes)

          // this.setRoutes(structureRoutes)
          // this.setTopNavRoutes(structureRoutes)
          // this.setLeftNavRoutes(structureRoutes)
          // this.setAddRoutes(addRoutes)

          // console.log('后端结构路由backendRoutes', backendRoutes)
          // console.log('后端访问路由accessBackendRoutes', accessBackendRoutes)
          // console.log('全部路由(结构) routes', this.routes)
          // console.log('左侧导航路由(结构) leftNavRoutes', this.leftNavRoutes)
          // console.log('顶部导航路由(结构) topNavRoutes', this.topNavRoutes)
          // console.log('运行添加路由 addRoutes', this.addRoutes)
          resolve(addRoutes)
        })
      })
    }
  }
}
// 处理动态路由
export function handleDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}
// 处理后台路由(type 为 false 返回后端结构路由 ，type 为 true 返回后端可访问路由)
function handleBackendRoutes(asyncRouterMap, lastRouter = false, type = false,) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = handleChildren(route.children)
    }
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = handleBackendRoutes(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}
// 处理后台路由子项
function handleChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(handleChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
      if (el.children && el.children.length) {
        children = children.concat(handleChildren(el.children, el))
        return
      }
    }
    children = children.concat(el)
  })
  return children
}
// 处理后台路由component
// const modules = import.meta.glob('./../../views/**/*.vue') // 匹配views里面所有的.vue文件
// export const loadView = (view) => {
//   let res
//   for (const path in modules) {
//     const dir = path.split('views/')[1].split('.vue')[0]
//     if (dir === view) {
//       res = () => modules[path]()
//     }
//   }
//   return res
// }
export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}

export default menu
