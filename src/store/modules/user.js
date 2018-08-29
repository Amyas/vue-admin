import {fetchIndex, fetchRemove} from '@/api/user'
import {MessageBox} from 'element-ui'
export default {
  namespaced: true,
  state: {
    list: {
      data: [],
      isLoading: false
    }
  },
  getters: {
    listData: state => state.list.data,
    listLoading: state => state.list.isLoading
  },
  mutations: {
    SET_LIST (state, v) {
      state.list.data = v
    }
  },
  actions: {
    async index ({commit}) {
      try {
        const {users} = await fetchIndex()
        commit('SET_LIST', users)
      } catch (error) {

      }
    },
    async remove ({commit, dispatch}, id) {
      MessageBox
        .confirm('此操作将永久删除该数据,是否继续?', '提示', {type: 'warning'})
        .then(async _ => {
          try {
            await fetchRemove(id)
            dispatch('index')
          } catch (error) {
          }
        })
    }
  }
}
