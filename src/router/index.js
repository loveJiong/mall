import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import addCompany from '@/components/addCompany'
import productPictures from '@/components/productPictures'
import groupDetail from '@/components/groupDetail'
import shoppingCart from '@/components/shoppingCart'

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
    },
    {
      path: '/productPictures',
      name: 'productPictures',
      component: productPictures
    },
    {
      path: '/productPictures/groupDetail',
      name: 'groupDetail',
      component: groupDetail
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    }
  ]
})
