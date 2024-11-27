<template>
  <div class="top-bar-vue">
    <hamburger v-if="$store.state.setting.leftNav.isShow" />
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
  },
}
</script>

<style lang="scss" scoped>
.top-bar-vue {
  display: flex;
  height: 40px;
  border-bottom: 1px solid var(--bcp);
  background-color: var(--bg-topBar);
}
</style>