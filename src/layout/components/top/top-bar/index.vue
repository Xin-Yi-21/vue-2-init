<template>
  <div class="top-bar-vue">
    <hamburger :isCollapse="$store.state.setting.leftNav.isCollapse" @toggleClick="handleToggle" />
    <Breadcrumb class="breadcrumb-container" />
  </div>
</template>


<script>
import Hamburger from '@/components/system/hamburger'
import Breadcrumb from '@/components/system/breadcrumb'
export default {
  components: { Hamburger, Breadcrumb },
  data() {
    return {

    }
  },

  methods: {
    handleToggle() {
      this.$store.dispatch('toggleLeftNav')
    }
  },
}
</script>

<style lang="scss" scoped>
.top-bar-vue {
  display: flex;
  height: 40px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
</style>