import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/layout/layout')
const Login = () => import('@/views/Login')

const UserList = () => import('@/views/User/list')

Vue.use(Router)

export default new Router({
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
      path: '/news',
      name: 'news',
      meta: {
        routeName: '文章管理',
        iconClass: 'fas fa-user'
      },
      component: Layout,
      children: [
        {
          path: 'list',
          name: 'newslist',
          meta: {
            routeName: '文章列表'
          },
          component: UserList
        },
        {
          path: 'edit',
          name: 'newsedit',
          meta: {
            routeName: '新建文章'
          },
          component: UserList
        }
      ]
    }
  ]
})
