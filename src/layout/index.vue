<template>
  <div class="layout-vue">
    <top-header @setLayout="setLayout" v-if="setting.topHeader.isShow"></top-header>
    <div class="main-container">
      <left-nav v-if="setting.leftNav.isShow"></left-nav>
      <div class="main-right-container">
        <div class="top-container">
          <top-nav v-if="setting.topNav.isShow"></top-nav>
          <top-bar v-if="setting.topBar.isShow"></top-bar>
          <top-tag v-if="setting.topTag.isShow"></top-tag>
        </div>
        <app-main v-if="isDataInitDone" />
      </div>
      <setting ref="settingRef"></setting>
    </div>
  </div>
</template>

<script>
import TopHeader from '@/layout/components/top/top-header/index.vue'
import TopBar from '@/layout/components/top/top-bar/index.vue'
import TopTag from '@/layout/components/top/top-tag/index.vue'
import TopNav from '@/layout/components/top/top-nav/index.vue'
import LeftNav from '@/layout/components/left-nav/index.vue'
import Setting from '@/layout/components/setting/index.vue'
import AppMain from '@/layout/components/app-main/index.vue'
export default {
  components: { TopHeader, TopBar, TopTag, TopNav, LeftNav, Setting, AppMain, },
  data() {
    return {
      isDataInitDone: false,
    }
  },
  computed: {
    setting() { return this.$store.state.setting || {} },
  },

  created() {
    this.init()
  },
  methods: {
    init() {
      this.getEnums()
    },
    async getEnums() {
      try { await this.$store.dispatch('GetEnums') } catch { }
      this.isDataInitDone = true
    },
    setLayout() {
      this.$refs.settingRef.openSetting()
    }
  },
}
</script>

<style lang="scss" scoped>
.layout-vue {
  width: 100%;
  height: 100%;
  background-color: var(--bg-layout);

  .top-header-vue {
    height: var(--top-header-height);
  }

  .main-container {
    display: flex;
    height: calc(100% - var(--top-header-height));

    .left-nav-vue {
      width: var(--left-nav-width);
      flex-shrink: 0;
    }

    .main-right-container {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: calc(100% - var(--left-nav-width));
      height: 100%;
      overflow: hidden;

      ::v-deep .app-main-vue {
        width: 100%;
        flex: 1;
        flex-shrink: 0;
        overflow: auto auto;

        &>* {
          // border-top: 1px solid transparent;
          height: 100%;
          overflow: hidden;
        }

        // 滚动条大小
        &::-webkit-scrollbar {
          display: block !important;
          width: 5px !important;
          height: 5px !important;
        }

        // 滚动条轨道
        &::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #efefef;
        }

        // 滚动条滑块
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: var(--tc);
        }

        // 滚动条右下角
        &::-webkit-scrollbar-corner {
          background: transparent;
        }
      }
    }
  }
}
</style>
