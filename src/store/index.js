import Vue from 'vue'
import Vuex from 'vuex'
import user from './system/user'
import menu from './system/menu'
import setting from './system/setting'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    setting,
  },
  getters
})

export default store
