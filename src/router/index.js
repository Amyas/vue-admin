import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/layout/layout')

const UserList = () => import('@/views/User/list')

Vue.use(Router)

export default new Router({
  routes: [
    {// Index首页模块
      path: '/',
      name: 'index',
      redirect: 'user'
    },
    {// User用户模块
      path: '/user',
      name: 'user',
      meta: {
        routeName: '用户管理',
        iconClass: ''
      },
      component: Layout,
      redirect: '/user/list',
      children: [
        {
          path: 'list',
          name: 'userlist',
          meta: {
            routeName: '用户列表'
          },
          component: UserList
        }
      ]
    }
  ]
})
