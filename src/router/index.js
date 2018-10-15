import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/layout/layout')
const Login = () => import('@/views/Login')

const UserList = () => import('@/views/User/list')
const articleList = () => import('@/views/Article/list')

Vue.use(Router)

export default new Router({
  base: '/admin/',
  mode: 'history',
  routes: [
    {// index
      path: '/',
      name: 'index',
      redirect: '/user',
      meta: {
        routeName: '首页',
        hidden: true
      }
    },
    {// login
      path: '/login',
      name: 'login',
      meta: {
        routeName: '登录',
        hidden: true
      },
      component: Login
    },
    {// user
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
          name: 'userList',
          meta: {
            routeName: '用户列表'
          },
          component: UserList
        }
      ]
    },
    {
      path: '/article',
      name: 'article',
      meta: {
        routeName: '文章管理',
        iconClass: 'fas fa-newspaper'
      },
      component: Layout,
      redirect: '/article/list',
      children: [
        {
          path: 'list',
          name: 'articleList',
          meta: {
            routeName: '文章列表'
          },
          component: articleList
        }
      ]
    }
  ]
})
