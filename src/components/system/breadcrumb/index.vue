<template>
  <el-breadcrumb :separator="separator">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>


<script>
export default {
  props: {
    separator: { type: String, default: '/' }
  },
  data() {
    return {
      levelList: [],
    }
  },
  watch: {
    '$route': {
      handler: function () {
        if (this.$route.path.startsWith('/redirect/')) { return }
        this.getBreadcrumb()
      },
    },
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      function isHome(route) {
        const name = route && route.name
        return !name ? false : name.trim() === 'Index'
      }
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // 判断是否为首页
      if (!isHome(matched[0])) {
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      }
      // 设置面包屑
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    handleLink(item) {
      const { redirect, path } = item
      redirect ? this.$router.push(redirect) : this.$router.push(path)
    }

  },
}
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  height: 100%;
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;

  a {
    color: var(--fcpl);
  }

  .no-redirect {
    color: var(--fcs);
    cursor: text;
  }
}
</style>