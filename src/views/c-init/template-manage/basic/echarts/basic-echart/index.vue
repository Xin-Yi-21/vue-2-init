<template>
  <div class="basic-echart-vue y-scroll">
    <div class="echart-card line">
      <line-echart></line-echart>
    </div>
    <div class="echart-card bar">
      <bar-echart></bar-echart>
    </div>
    <div class="echart-card pie">
      <pie-echart></pie-echart>
    </div>
    <div class="echart-card radar">
      <div class="card-title">雷达图</div>
      <!-- <div id="radar"></div> -->
    </div>
    <div class="echart-card liquid">
      <div class="card-title">水球图</div>
      <!-- <div id="liquid"></div> -->
    </div>
    <div class="echart-card gauge">
      <div class="card-title">仪表图</div>
      <!-- <div id="gauge"></div> -->
    </div>
    <div class="echart-card rose">
      <wind-rose-echart></wind-rose-echart>
    </div>
  </div>
</template>

<script>
import LineEchart from './components/line'
import BarEchart from './components/bar'
import PieEchart from './components/pie'
import WindRoseEchart from './components/wind-rose'

export default {
  components: { LineEchart, BarEchart, PieEchart, WindRoseEchart },
  data() {
    return {

    }
  },

  methods: {

  },
}
</script>

<style lang="scss" scoped>
.basic-echart-vue {
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  .echart-card {
    width: 33.33%;
    height: 50%;
    border-right: 1px solid var(--bcs);
    border-bottom: 1px solid var(--bcs);
    flex-shrink: 0;
  }
}
</style>