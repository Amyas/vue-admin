import {fetchUtil} from '@/utils/fetch'
import Router from '@/router'

export default {
  namespaced: true,
  state: {
    userInfo: null,
    form: {
      data: {
        username: '',
        password: ''
      },
      rule: {
        username: [{required: true, message: '请输入用户名!'}],
        password: [{required: true, message: '请输入密码!'}]
      },
      isLoading: false
    }
  },
  getters: {
    formData: state => state.form.data,
    formRule: state => state.form.rule,
    formLoading: state => state.form.isLoading,

    token: state => state.userInfo.token,
    userName: state => state.userInfo.user.nickName
  },
  mutations: {
    SET_USER_INFO (state, v) {
      state.userInfo = v
    }
  },
  actions: {
    submit ({commit, state}, form) {
      form.validate(async valid => {
        if (!valid) return

        const {data} = state.form

        const userInfo = await fetchUtil('login', {
          data,
          loading: 'login.form.isLoading'
        })

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        commit('SET_USER_INFO', userInfo)
        Router.replace('/')
      })
    }
  }
}
