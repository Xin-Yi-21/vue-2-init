<template>
  <i :class="{ 'c-icon': true, 'is-disabled': disabled }" :style="`font-size:${size}px;cursor:${cursor};--color:${color};--hoverColor:${hoverColor};`" @click="handleIconClick">
    <el-tooltip ref="tooltip" effect="light" placement="top" popper-class="c-icon-el-tooltip" :visible-arrow="false" v-if="tip && showType == 'el'">
      <svg-icon :icon-class="i"></svg-icon>
      <span slot="content" :style="`color:${hoverColor};`">{{ tip }}</span>
    </el-tooltip>

    <template v-else>
      <svg-icon :icon-class="i"></svg-icon>
      <span class="icon-tip" :style="`top:${topTipPx}px`" v-if="tip">{{ tip }}</span>
    </template>
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
    hoverColor: {
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
    },
    showType: {
      type: String,
      default: 'custom',
    },
    cursor: {
      type: String,
      default: 'inherit',
    }
  },
  mounted() {

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
  color: var(--color);

  &:hover {

    * {
      color: var(--hoverColor);
    }

  }

  &[class*="is-disabled"] {
    cursor: not-allowed !important;
    /* 改变鼠标指针样式为不允许操作 */
    // pointer-events: none; /* 禁止元素接收鼠标事件 */
    opacity: 0.6;
    /* 设置元素透明度为半透明，以表示禁用状态 */
  }

  .svg-icon {
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
  color: var(--fcp);
}
</style>
