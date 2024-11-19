<template>
  <div :class="['layout-vue', setting.isFixHeader ? 'is-fixed' : '']" v-if="isDataInitDone">
    <top-header @setLayout="setLayout"></top-header>
    <div class="main-container">
      <!-- <left-nav v-if="setting.isLeftNav"></left-nav> -->
      <div class="main-right-container">
        <div class="top-container">
          <!-- <top-nav v-if="setting.isTopNav"></top-nav>
          <top-bar v-if="setting.isTopBar"></top-bar>
          <top-tag v-if="setting.isTopTag"></top-tag> -->
        </div>
        <!-- <app-main /> -->
      </div>
      <setting ref="settingRef"></setting>
    </div>
  </div>
</template>

<script>
import TopHeader from '@/layout/components/top/top-header/index.vue'
// import TopBar from '@/layout/components/top/top-bar/index.vue'
// import TopTag from '@/layout/components/top/top-tag/index.vue'
// import TopNav from '@/layout/components/top/top-nav/index.vue'
// import LeftNav from '@/layout/components/left-nav/index.vue'
// import AppMain from '@/layout/components/app-main/index.vue'
import Setting from '@/layout/components/setting/index.vue'
export default {
  components: { TopHeader, Setting },
  data() {
    return {
      isDataInitDone: true,
    }
  },
  computed: {
    setting() { return this.$store.state.setting || {} },
  },
  mounted() {
  },
  methods: {
    setLayout() {
      this.$refs.settingRef.openSetting()
    }
  },
}
</script>

<style lang="scss" scoped></style>