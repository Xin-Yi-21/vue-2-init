<template>
  <div class="hamburger" @click="handleToggle">
    <c-icon i="c-hamburger-collapse" :class="{ 'is-collapse': isCollapse }" size="24"></c-icon>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: { type: Boolean, default: false },
  },
  data() {
    return {}
  },
  methods: {
    handleToggle() {
      this.$emit('toggleClick')
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