import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.css'
import './styles/index.styl'
import * as ECharts from 'echarts'
import Vant from 'vant'
import 'vant/lib/index.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/icons' // icon
import '@/permission' // permission control
Vue.use(Vant)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
