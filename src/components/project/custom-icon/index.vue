<template>
  <i :class="{ 'c-icon': true, 'is-disabled': disabled }" :style="`color:${color};font-size:${size}px;`" @click="handleIconClick">
    <svg-icon :icon-class="i"></svg-icon>
    <!-- v-if="tip" -->
    <span class="icon-tip" :style="`top:${topTipPx}px`">{{ tip }}</span>
    <!-- <el-tooltip ref="tooltip" effect="light" placement="top" popper-class="c-icon-el-tooltip" :visible-arrow="false" v-if="tip">
      <svg-icon :icon-class="i" :style="`color:${color};`"></svg-icon>
      <span slot="content" :style="`color:${color};`">{{ tip }}</span>
    </el-tooltip> -->
  </i>
</template>

<script>
export default {
  props: {
    i: {    // svg-icon的名称
      type: String,
      default: '',
    },
    color: { // 图标颜色
      type: String,
      default: 'inherit',
    },
    size: {  // 图标大小
      type: [Number, String],
      default: '16',
    },
    tip: {   // 图标提示
      type: String,
      default: '',
    },
    disabled: {  // 禁用
      type: Boolean,
      defualt: false,
    },
    topTipPx: {
      type: [Number, String],
      default: -1,
    }
  },
  mounted() {
    console.log('tip', this.tip)
  },
  data() {
    return {}
  },
  methods: {
    handleIconClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.c-icon {
  display: inline-flex;
  position: relative;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;

  &[class*="is-disabled"] {
    cursor: not-allowed !important;
    /* 改变鼠标指针样式为不允许操作 */
    // pointer-events: none; /* 禁止元素接收鼠标事件 */
    opacity: 0.6;
    /* 设置元素透明度为半透明，以表示禁用状态 */
  }

  .svg-icon {
    color: inherit;
    font-size: inherit;
    margin: 0 5px;
  }

  .svg-icon:hover~.icon-tip {
    display: block;
  }

  .icon-tip {
    display: none;
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translate(-50%, calc(-100% - 2px));
    white-space: nowrap;
    font-size: 12px;
    line-height: 12px;
    z-index: 9999;
  }
}
</style>
<style lang="scss">
.c-icon-el-tooltip {
  border: 0 !important;
  background-color: transparent !important;
  padding: 0 !important;
  line-height: 1 !important;
  transform: translateY(5px);
  transition: none !important;
}
</style>
