import { personGet } from '@/api/project/project'
import { Message } from 'element-ui'
const enums = {
  state: {
    // 前端枚举
    frontendEnums: {
      // 性别
      gender: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }],
      // 月份
      month: [{ label: '1', value: '01' }, { label: '2', value: '02' }, { label: '3', value: '03' }, { label: '4', value: '04' }, { label: '5', value: '05' }, { label: '6', value: '06' }, { label: '7', value: '07' }, { label: '8', value: '08' }, { label: '9', value: '09' }, { label: '10', value: '10' }, { label: '11', value: '11' }, { label: '12', value: '12' },]
    },
    // 后端枚举
    backendEnums: {},
    // 全部枚举
    allEnums: {},
  },
  // getters: {
  //   allEnums(state) {
  //     return Object.assign({}, state.backendEnums, state.frontendEnums)
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
        if (!refreshTypeList || refreshTypeList.includes('personGet')) {
          const res = await personGet()
          enums.person = (res.data || []).map(item => ({ label: item.personName, value: item.personId, }))
        }
        commit('GET_ENUMS', enums)
      } catch (error) { Message.warning('枚举查询存在问题，请联系管理员！') }
    },
  }
}

export default enums
