<template>
  <div :class="['left-nav-vue', isCollapse ? 'is-collapse' : 'is-expand']">
    <!-- :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
    :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
    :active-text-color="theme"
    :default-active="activeMenu"
    -->
    <el-scrollbar wrap-class="c-el-scrollbar">
      <el-menu :collapse="isCollapse" :unique-opened="false" :collapse-transition="false" :default-active="activeMenu" popper-class="left-nav-menu-modal">
        <nav-item v-for="(item, index) in leftNavRoutes" :key="index" :navInfo="item" :isNest="true" :basePath="''" />
      </el-menu>
    </el-scrollbar>
  </div>

</template>


<script>
import NavItem from './components/nav-item'
export default {
  components: { NavItem },
  computed: {
    isCollapse() { return this.$store.state.setting.leftNav.isCollapse },
    leftNavRoutes() { return this.$store.state.menu.leftNavRoutes },
    activeMenu() {
      if (this.$route.meta.activeMenu) {
        return this.$route.meta.activeMenu
      }
      return this.$route.path
    },
  },
  data() {
    return {

    }
  },

  methods: {

  },
}
</script>


<style lang="scss" scoped>
.left-nav-vue {
  height: 100%;
  overflow: hidden;
  border-right: 1px solid #ccc;

  ::v-deep .el-menu {
    width: 100%;
    height: 100%;
    border-right: 0;

    a {
      color: #333;
      text-decoration: none;
    }

    .svg-icon {
      font-size: 18px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .menu-item-container {
      width: 100%;
      min-height: 60px;

      li {
        height: 100%;

        &.el-menu-item {
          display: flex;
          align-items: center;
          height: 60px;

          &.is-active {
            font-weight: 700;
          }
        }

        &.el-submenu {
          .el-submenu__title {
            height: 60px;
            display: flex;
            align-items: center;
          }
        }

        .menu-title {
          flex: 1;
          height: 60px;
          line-height: 60px;
          font-size: 14px;
          margin: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  &.is-collapse {
    width: 60px;

    ::v-deep .el-menu {
      .menu-title {
        margin-left: 0;
      }
    }
  }

  &.is-expand {
    width: 200px;
  }
}
</style>
<!-- <style lang="scss">
// 组件内全局样式
.left-nav-menu-modal {
  a {
    color: #333;
    text-decoration: none;
  }

  .svg-icon {
    font-size: 16px;
    font-weight: 700;
  }

  .menu-title {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    margin: 0 10px;
  }
}
</style> -->