import Vue from 'vue'
import Vuex from 'vuex'
import user from './system/user'
import menu from './system/menu'
import setting from './system/setting'
import tag from './system/tag'
import enums from './project/enums'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    menu,
    setting,
    tag,
    enums,
  },
  getters
})
store.dispatch('setTopHeader')
store.dispatch('setLeftNav')
export default store
