import {fetchIndex, fetchRemove, fetchCreate, fetchUpdate} from '@/api/article'

export default {
  namespaced: true,
  state: {
    list: {
      data: [],
      total: 0,
      loading: false
    }
  },
  getters: {

  },
  mutations: {
    SET_LIST (state, {articles, total}) {
      state.list.data = articles
      state.list.total = total
    }
  },
  actions: {
    async index ({commit}, query) {
      try {
        const {articles, total} = await fetchIndex(query)
        commit('SET_LIST', {articles, total})
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
