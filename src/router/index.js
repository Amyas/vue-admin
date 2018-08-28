import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home/index'

const User = () => import(/* webpackChunkName: "about" */ '@/views/User')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
