import { roleGet, monthGet } from '@/api/project/project'
import { Message } from 'element-ui'
const enums = {
  state: {
    // 前端枚举
    frontendEnums: {
      gender: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }],     // 性别
    },
    // 后端枚举
    backendEnums: {},
    // 全部枚举
    allEnums: {},
  },
  // getters: {
  //   allEnums(state) {
  //     return Object.assign({}, state.backendEnums, state.frontendEnums)      // 使用：this.$store.getters.allEnums
  //   },
  // },
  mutations: {
    GET_ENUMS: (state, backendEnums) => {
      state.backendEnums = backendEnums
      state.allEnums = Object.assign({}, backendEnums, state.frontendEnums)
    },
  },
  actions: {
    async GetEnums({ commit, state, }, refreshTypeList) {
      let enums = { ...state.backendEnums }
      try {
        if (!refreshTypeList || refreshTypeList.includes('roleGet')) {
          const res = await roleGet()
          enums.role = (res.data || []).map(item => ({ label: item.label, value: item.value, }))
        }
      } catch (error) { Message.warning('角色枚举查询存在问题，请联系管理员！') }
      try {
        if (!refreshTypeList || refreshTypeList.includes('monthGet')) {
          const res = await monthGet()
          enums.month = (res.data || []).map(item => ({ label: item.label, value: item.value, }))
        }
      } catch (error) { ElMessage.warning('月份枚举查询存在问题，请联系管理员！') }
      commit('GET_ENUMS', enums)
    },
  }
}

export default enums
