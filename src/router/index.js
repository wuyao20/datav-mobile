import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/public',
    children: [
      {
        path: 'public',
        name: 'Public',
        component: () => import('@/components/public/Public')
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
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/mine/Mine')
      }
    ]
  },
  {
    path: '/conversion',
    name: 'Conversion',
    component: () => import('@/components/commerce/conversion-rate/index')
  },
  {
    path: '/thatDay',
    name: 'thatDay',
    component: () => import('@/components/commerce/thatDay/ThatDay')
  },
  {
    path: '/monthDev',
    name: 'monthDevPublic',
    component: () => import('@/components/public/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
