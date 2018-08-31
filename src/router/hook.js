import nprogress from 'nprogress'
import Store from '@/store'
import Router from './index'

export default router => {
  router.beforeEach((to, from, next) => {
    const {userInfo} = Store.state.login
    const storageUserInfo = localStorage.getItem('userInfo')

    if (!userInfo && !storageUserInfo && to.path !== '/login') {
      Router.replace('/login')
    } else if (!userInfo && storageUserInfo) {
      Store.commit('login/SET_USER_INFO', JSON.parse(storageUserInfo))
      Router.replace({path: to.path, query: to.query})
    }
    nprogress.start()
    next()
  })
  router.afterEach((to, from, next) => {
    nprogress.done()
  })
}
