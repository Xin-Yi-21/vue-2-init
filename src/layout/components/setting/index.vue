<template>
  <el-drawer :visible.sync="isShowSet" :withHeader="false" direction="rtl" size="320px">
    <div class="setting-part">
      <div class="setting-item">
        <span class="setting-label">主题风格</span>
        <el-radio-group v-model="setting.themeStyle">
          <el-radio label="light">浅色</el-radio>
          <el-radio label="dark">深色</el-radio>
        </el-radio-group>
      </div>
      <div class="setting-item">
        <span class="setting-label">主题颜色</span>
        <el-color-picker v-model="setting.themeColor" :predefine="predefineColors" @change="handleThemeColor" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启左侧导航</span>
        <el-switch v-model="setting.leftNav.isShow" @change="handleLeftNav" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启左侧折叠</span>
        <el-switch v-model="setting.leftNav.isCollapse" @change="handleLeftNav" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启顶部页头</span>
        <el-switch v-model="setting.topHeader.isShow" @change="handleTopHeader" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启顶部导航</span>
        <el-switch v-model="setting.topNav.isShow" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启顶部工具</span>
        <el-switch v-model="setting.topBar.isShow" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启顶部标签</span>
        <el-switch v-model="setting.topTag.isShow" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启页头面包</span>
        <el-switch v-model="setting.topHeader.isBreadcrumb" />
      </div>
      <div class="setting-item">
        <span class="setting-label">开启动态标题</span>
        <el-switch v-model="setting.isDynamicTitle" />
      </div>
      <!-- <div class="setting-item">
        <span class="setting-label">开启水印</span>
        <el-switch v-model="setting.isWaterMark" @change="handleWaterMark" />
      </div> -->
      <!-- <div class="setting-item">
        <span class="setting-label">开启全屏</span>
        <el-switch v-model="setting.isFullScreen" @change="handleFullScreen(setting)" />
      </div> -->
      <div class="setting-item">
        <span class="setting-label">布局大小</span>
        <el-radio-group v-model="setting.themeSize">
          <el-radio label="large">较大</el-radio>
          <el-radio label="default">普通</el-radio>
          <el-radio label="small">较小</el-radio>
        </el-radio-group>
      </div>
      <!-- <div class="setting-item">
        <span class="setting-label">设置缩放</span>
        <el-slider v-model="setting.scale" @change="handleScale" />
      </div> -->
    </div>
    <div class="setting-footer">
      <el-button @click="handleSaveSetting" type="primary">保存配置</el-button>
      <el-button @click="handleResetSetting">重置配置</el-button>
    </div>
  </el-drawer>
</template>
<script>
import { handleFullScreen } from '@/utils/setting'
export default {
  data() {
    return {
      isShowSet: false,
      predefineColors: ["#F00", "#FF6100", "#FF0", "#0F0", "#0FF", "#00F", "#F0F", "#FF1493", "#55c791",],
    }
  },
  computed: {
    setting() { return this.$store.state.setting }
  },

  methods: {
    // 显示设置
    openSetting() {
      this.isShowSet = true
    },
    // 水印
    handleWaterMark() {

    },
    // 主题颜色
    handleThemeColor() {
      this.$store.dispatch('setThemeColor')
    },

    // 头部
    handleTopHeader() {
      this.$store.dispatch('setTopHeader')
    },
    // 左侧导航
    handleLeftNav() {
      this.$store.dispatch('setLeftNav')
    },
    // 全屏
    handleFullScreen(setting) {
      handleFullScreen(setting)
    },
    // 缩放
    handleScale() {

    },
    // 保存配置
    handleSaveSetting() {
      this.$modal.loading("正在保存到本地，请稍候...");
      // let layoutSetting = {
      //   'themeStyle': this.setting.themeStyle,
      //   'themeColor': this.setting.themeColor,
      //   'themeSize': this.setting.themeSize,
      //   'leftNav': {
      //     'isShow': this.setting.leftNav.isShow,
      //     'isCollapse': this.setting.leftNav.isCollapse
      //   },
      //   'topHeader': {
      //     'isShow': this.setting.topHeader.isShow,
      //     'isBreadcrumbShow': this.setting.topHeader.isBreadcrumbShow
      //   },
      //   'topNav': {
      //     'isShow': this.setting.topNav.isShow,
      //     'isBreadcrumbShow': this.setting.topNav.isBreadcrumbShow
      //   },
      //   'topBar': {
      //     'isShow': this.setting.topBar.isShow,
      //   },
      //   'topTag': {
      //     'isShow': this.setting.topTag.isShow,
      //   },
      //   'isDynamicTitle': this.setting.isDynamicTitle,
      // }
      localStorage.setItem("layout-setting", JSON.stringify(this.setting))
      setTimeout("window.location.reload()", 1000)
      setTimeout(this.$modal.closeLoading(), 1000)
    },
    // 重置配置
    handleResetSetting() {
      this.$modal.loading("正在清除设置缓存并刷新，请稍候...");
      localStorage.removeItem("layout-setting")
      setTimeout("window.location.reload()", 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-drawer {

  // padding: 0 10px;
  .el-drawer__body {
    padding: 20px;
    background-color: var(--bg-primary);

    & *:not(.el-button):not(.el-button *) {
      color: var(--fcpl);
    }
  }

  .setting-part {
    margin-bottom: 10px;

    .setting-item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .setting-label {
        width: 100px;
        margin-right: 10px;
      }

      .el-radio-group {
        display: inline-flex;
        justify-content: flex-end;
        flex-wrap: nowrap;
        flex: 1;

        .el-radio {
          display: inline-flex;
          align-items: center;
          margin-right: 10px;

          .el-radio__input {
            display: inline-flex;
            align-items: center;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .el-slider {
        flex: 1;
      }
    }
  }

  .setting-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>