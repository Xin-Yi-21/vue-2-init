<template>
  <div class="card-header-container">
    <svg-icon :icon-class="icon" class-name="card-header-icon-svg"></svg-icon>
    <span class="card-header-title">{{title}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
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
.card-header-container {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;
  overflow: hidden;
  .card-header-icon-svg {
    font-size: 18px;
    // transform: translateY(1px);
    flex-shrink: 0;
  }
  .card-header-title {
    margin-left: 10px;
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 16px;
    color: #333;
    white-space: nowrap;
  }

  ::v-deep .back-icon {
    margin-left: 20px;
    // transform: translateY(2px);
  }
}
</style>