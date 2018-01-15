import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import thb from '@/components/thb'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/thb',
      name: 'thb',
      component: thb
    }
  ]
})
