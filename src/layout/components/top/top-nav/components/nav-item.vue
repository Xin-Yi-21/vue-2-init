<template>
  <div class="menu-item-container" v-if="!navInfo.hidden">
    <!-- [ 当前导航无子导航 , 当前导航有1个子导航 && 子导航无子项  && alwaysShow为true ] -->
    <Link v-if="judgeChild(navInfo.children, navInfo) && (!onlyOne.children || onlyOne.noshowChildren) && !navInfo.alwaysShow && onlyOne.meta" :to="handlePath(onlyOne.path, onlyOne.query)">
    <el-menu-item :index="handlePath(onlyOne.path)" :class="{ 'submenu-title-noDropdown': !isNest }" @click="handleGo(onlyOne)">
      <svg-icon :icon-class="onlyOne.meta.icon || (navInfo.meta && navInfo.meta.icon)" />
      <template #title><span class="menu-title" :title="hasTitle(onlyOne.meta.title)">{{ onlyOne.meta.title }}</span></template>
    </el-menu-item>
    </Link>
    <el-submenu v-else ref="subMenu" :index="handlePath(navInfo.path)" :popper-append-to-body="true" popper-class="top-nav-vertical-menu">
      <template v-if="navInfo.meta" #title>
        <svg-icon :icon-class="navInfo.meta && navInfo.meta.icon" />
        <span class="menu-title" :title="hasTitle(navInfo.meta.title)">{{ navInfo.meta.title }}</span>
      </template>
      <nav-item v-for="(item, index) in navInfo.children" :key="index" :isNest="true" :navInfo="item" :basePath="handlePath(navInfo.path)" />
    </el-submenu>
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate'
import Link from './link'
export default {
  components: { Link },
  name: 'NavItem',
  props: {
    navInfo: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    isTopPath: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      onlyOne: {},
      cWidth: 200
    }
  },

  methods: {
    // 导航子项判断
    // const onlyOne = ref({})
    judgeChild(children = [], parent) {
      const showChildren = children?.filter(item => !item.hidden) || []
      if (showChildren.length === 1) {
        this.$set(this, 'onlyOne', showChildren[0])
        return true
      }
      if (showChildren.length === 0) {
        this.$set(this, 'onlyOne', { ...parent, noshowChildren: true })
        return true
      }
      return false
    },

    // 处理index路径
    handlePath(routePath, routeQuery) {
      if (isExternal(routePath)) { return routePath }
      if (isExternal(this.basePath)) { return this.basePath }
      let path = this.getNormalPath(this.basePath + '/' + routePath)
      if (routeQuery) {
        return { path: path, query: JSON.parse(routeQuery) }
      }
      // console.log('查indexPath', getNormalPath(path))
      return this.getNormalPath(path)
    },

    // 路径规范化处理
    getNormalPath(p) {
      if (p.length === 0 || !p || p == 'undefined') {
        return p
      }
      let res = p.replace('//', '/')
      if (res[res.length - 1] === '/') {
        return res.slice(0, res.length - 1)
      }
      return res
    },
    // 标题处理
    hasTitle(title) {
      return title.length > 5 ? title : ''
    },

    handleGo(navItem) {
      let path = this.handlePath(navItem.path, navItem.query)
      if (isExternal(path)) {
        window.open(path, '_blank', 'noopener,noreferrer') // 出于安全考虑，防止新页面获取原页面的引用。
      } else {
        this.$router.push(path)
      }
    }
  },
}
</script>
