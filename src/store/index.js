import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import login from './modules/login'
import user from './modules/user'
import article from './modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    SET_STATE (state, {k, v}) {
      _.set(state, k, v)
    }
  },
  modules: {
    login,
    user,
    article
  }
})
