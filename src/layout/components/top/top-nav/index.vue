<template>
  <div class="top-nav-vue">
    <el-scrollbar wrap-class="c-el-scrollbar">
      <el-menu :unique-opened="true" :collapse-transition="false" mode="horizontal" :ellipsis="false" :default-active="activeMenu" menu-trigger="hover" class="top-nav-menu">
        <nav-item v-for="(item, index) in topNavRoutes" :key="index" :navInfo="item" :isNest="true" :basePath="''" />
      </el-menu>
    </el-scrollbar>
  </div>

</template>
<script>
import NavItem from './components/nav-item'
export default {
  components: { NavItem },
  computed: {
    topNavRoutes() { return this.$store.state.menu.topNavRoutes },
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
.top-nav-vue {
  width: 100%;
  height: var(--top-nav-height);

  ::v-deep .top-nav-menu {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: var(--bg-primary);
    border-bottom: 1px solid var(--bcp);

    .menu-item-container {
      // width: 400px;
      flex: 1;
      flex-shrink: 0;
      height: 100%;
      border-right: 1px solid var(--bcp);

      &:last-child {
        border-right: 0;
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
        height: 100%;
        position: relative;

        &.el-menu-item {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fcp);
          background-color: var(--bg-primary);

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
          display: flex;
          align-items: center;
          justify-content: center;

          &.is-active {
            .el-submenu__title {
              font-weight: 700;

              & * {
                color: var(--tc);
              }
            }
          }

          .el-submenu__title {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 0;
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
                content: "\e790";
                font-size: 16px;
              }
            }

          }
        }

        .menu-title {
          height: 100%;
          margin: 0 10px;
          line-height: 49px;
          font-size: 14px;
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
<style lang="scss">
.top-nav-vertical-menu {

  // width: calc((100% - var(--left-nav-width)) / 5);
  .el-menu--popup {
    padding: 0;

    .menu-item-container {
      border-bottom: 1px solid var(--bcp);

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
        .menu-title {
          height: 100%;
          margin: 0 20px 0 10px;
          line-height: 36px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--fcp);
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
          display: flex;
          align-items: center;

          &.is-active {
            .el-submenu__title {
              font-weight: 700;

              & * {
                color: var(--tc);
              }
            }
          }

          .el-submenu__title {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            border-bottom: 0;
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
              }
            }

          }
        }


      }
    }
  }
}
</style>
