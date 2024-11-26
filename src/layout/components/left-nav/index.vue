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
  height: 100%;
  border-right: 1px solid var(--bcp);
  box-sizing: border-box;
  background-color: var(--bg-primary);

  ::v-deep .left-nav-menu {
    width: 100%;
    border-right: 0;

    .menu-item-container {
      min-height: 60px;

      a {
        text-decoration: none;
      }

      .svg-icon {
        font-size: 18px;
        font-weight: 700;
        flex-shrink: 0;
      }

      li {
        height: 100%;
        background-color: var(--bg-primary);

        .menu-title {
          flex: 1;
          height: 60px;
          line-height: 60px;
          font-size: 14px;
          margin: 0 20px 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: inherit;
        }

        &.el-menu-item {
          min-width: 0;
          display: flex;
          align-items: center;
          height: 60px;
          color: var(--fcp);

          &.is-active {
            font-weight: 700;

            & * {
              color: var(--tc);
            }
          }

          &:hover {
            background-color: var(--tc);

            & * {
              color: var(--fcp);
            }

          }
        }

        &.el-submenu {

          &.is-active {
            .el-submenu__title {
              font-weight: 700;
            }
          }

          .el-submenu__title {
            height: 60px;
            display: flex;
            align-items: center;
            color: var(--fcp);

            &:hover {
              background-color: var(--tc);

              & * {
                color: var(--fcp);
              }
            }
          }
        }
      }
    }
  }

  &.is-collapse {
    ::v-deep .left-nav-menu {
      .menu-title {
        // margin-left: 0;
        display: none;
      }

      .el-submenu__icon-arrow {
        &::before {
          display: none;
        }
      }

      .el-menu-item {
        padding: 0 !important;

        .el-tooltip {
          padding: 0 !important;
          text-align: center;
        }
      }

      .el-submenu__title {
        padding: 0 !important;
        justify-content: center;
      }
    }
  }
}
</style>
<style lang="scss">
// 组件内全局样式
.left-nav-vertical-menu {
  .el-menu--popup {
    padding: 0;

    .menu-item-container {
      border-bottom: 1px solid var(--bcp);
      min-height: 50px;

      &:last-child {
        border-bottom: 0;
      }

      a {
        color: var(--fcp);
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
          background-color: var(--bg-primary);
          color: var(--fcp);

          &.is-active {
            font-weight: 700;

            & * {
              color: var(--tc);
            }
          }

          &:hover {
            background-color: var(--tc);

            & * {
              color: var(--fcp);
            }
          }
        }

        &.el-submenu {
          background-color: var(--bg-primary);

          &.is-active {
            .el-submenu__title {
              font-weight: 700;

              & * {
                color: var(--tc);
              }
            }
          }

          .el-submenu__title {
            height: 50px;
            display: flex;
            align-items: center;
            background-color: var(--bg-primary);
            color: var(--fcp);

            &:hover {
              background-color: var(--tc);

              & * {
                color: var(--fcp);
              }
            }

            .el-submenu__icon-arrow {
              width: auto;
              right: 10px;

              &::before {
                content: "\e791";
                font-size: 16px;
                // color: var(--fcp);
              }
            }
          }
        }

        .menu-title {
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          margin: 0 20px 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: inherit;
        }
      }
    }
  }
}
</style>