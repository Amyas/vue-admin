import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/layout/layout')
const Login = () => import('@/views/Login')

const UserList = () => import('@/views/User/list')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {// Index首页模块
      path: '/',
      name: 'index',
      redirect: 'user',
      meta: {
        routeName: '首页',
        hidden: true
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        routeName: '登录',
        hidden: true
      },
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        routeName: '测试管理',
        iconClass: ''
      },
      component: Layout
    },
    {// User用户模块
      path: '/user',
      name: 'user',
      meta: {
        routeName: '用户管理',
        iconClass: 'fas fa-user'
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
    },
    {// a用户模块
      path: '/a',
      name: 'a',
      meta: {
        routeName: 'a管理',
        iconClass: ''
      },
      component: Layout,
      redirect: '/a/list',
      children: [
        {
          path: 'list',
          name: 'alist',
          meta: {
            routeName: 'a列表'
          },
          component: UserList
        }
      ]
    }
  ]
})
