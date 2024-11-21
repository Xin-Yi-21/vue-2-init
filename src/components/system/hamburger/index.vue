<template>
  <div class="hamburger" @click="handleToggle">
    <c-icon i="c-hamburger-collapse" :class="{ 'is-collapse': isCollapse }" size="24"></c-icon>
  </div>
</template>

<script>
export default {
  computed: {
    isCollapse() { return this.$store.state.setting.leftNav.isCollapse }
  },
  data() {
    return {}
  },
  methods: {
    handleToggle() {
      this.$store.dispatch('setLeftNav')
    }
  }
}
</script>

<style lang="scss" scoped>
.hamburger {
  padding: 0 10px;
  height: 100%;
  display: inline-flex;
  align-items: center;

  .is-collapse {
    transform: rotate(180deg);
  }
}
</style>