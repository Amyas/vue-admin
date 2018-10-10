import Vue from 'vue'
import ElementUI from 'element-ui'
import {sync} from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import routerHook from './router/hook'

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import utils from './utils'
import directive from './utils/directive'
import filters from './utils/filters'

sync(store, router)
routerHook(router)
directive(Vue)
filters(Vue)

Vue.use(ElementUI, {size: 'small'})
Vue.use(utils)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
