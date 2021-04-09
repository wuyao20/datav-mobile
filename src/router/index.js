import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'public',
        name: 'Public',
        component: () => import('@/components/public/index')
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/components/company/index')
      },
      {
        path: 'school',
        name: 'School',
        component: () => import('@/components/school/index')
      },
      {
        path: 'commerce',
        name: 'Commerce',
        component: () => import('@/components/commerce/index')
      }
    ]
  },
  {
    path: '/conversion',
    name: 'Conversion',
    component: () => import('@/components/commerce/conversion-rate/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
