import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.css'
import * as ECharts from 'echarts'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
