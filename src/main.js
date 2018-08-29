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

Vue.use(ElementUI, {size: 'small'})

sync(store, router)

routerHook(router)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
