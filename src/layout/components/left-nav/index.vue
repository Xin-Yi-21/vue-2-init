<template>
  <div :class="['left-nav-vue', isCollapse ? 'is-collapse' : 'is-expand']">
    <el-scrollbar wrap-class="c-el-scrollbar">
      <el-menu mode="vertical" :collapse="isCollapse" :unique-opened="false" :collapse-transition="false" :default-active="activeMenu" class="left-nav-menu">
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
  width: 200px;
  height: 100%;
  border-right: 1px solid #ccc;
  box-sizing: border-box;

  ::v-deep .left-nav-menu {
    width: 100%;
    border-right: 0;

    .menu-item-container {
      min-height: 60px;

      a {
        color: #333;
        text-decoration: none;
      }

      .svg-icon {
        font-size: 18px;
        font-weight: 700;
        flex-shrink: 0;
      }

      li {
        height: 100%;

        &.is-active {
          font-weight: 700;
        }

        &.el-menu-item {
          min-width: 0;
          display: flex;
          align-items: center;
          height: 60px;
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
          margin: 0 20px 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  &.is-collapse {
    ::v-deep .left-nav-menu {
      .menu-title {
        margin-left: 0;
      }

      .el-submenu__icon-arrow {
        &::before {
          display: none;
        }
      }
    }
  }

  &.is-expand {
    width: 200px;
  }
}
</style>
<style lang="scss">
// 组件内全局样式
.left-nav-vertical-menu {
  .el-menu--popup {
    padding: 0;

    .menu-item-container {
      border-bottom: 1px solid #ccc;
      min-height: 50px;

      &:last-child {
        border-bottom: 0;
      }

      a {
        color: #333;
        text-decoration: none;
      }

      .svg-icon {
        font-size: 16px;
        font-weight: 700;
      }

      li {
        &.is-active {
          font-weight: 700;
        }

        &.el-menu-item {
          height: 100%;
          display: flex;
          align-items: center;
        }

        &.el-submenu {
          // display: flex;
          // align-items: center;

          .el-submenu__title {
            // width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
          }
        }

        .menu-title {
          // flex: 1;
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          margin: 0 20px 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  // .menu-title {
  //   height: 60px;
  //   line-height: 60px;
  //   font-size: 14px;
  //   margin: 0 10px;
  // }
}
</style>