<template>
  <span class="card-circle out-circle" :style="`width:${outerSize}px;height:${outerSize}px;backgroundColor:${outerColor};`">
    <span class="inner-circle" :style="`width:${innerSize}px;height:${innerSize}px;backgroundColor:${innerColor};`"></span>
  </span>
</template>

<script>
export default {
  props: {
    outerColor: {
      type: String,
      default: '#55C79133',
    },
    innerColor: {
      type: String,
      default: '#55C791 ',
    },
    outerSize: {
      type: [String, Number],
      default: 12,
    },
    innerSize: {
      type: [String, Number],
      default: 6,
    }
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
.card-circle {
  position: relative;
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #55c79133;
  margin-right: 5px;
  .inner-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #55c791;
  }
}
</style>