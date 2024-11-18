import Vue from 'vue'
import Vuex from 'vuex'
import user from './system/user'
import menu from './system/menu'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menu,
  },
  getters
})

export default store
