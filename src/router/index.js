import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import addCompany from '@/components/addCompany'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/addCompany',
      name: 'addCompany',
      component: addCompany
    }
  ]
})
