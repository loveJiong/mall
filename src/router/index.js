import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import addCompany from '@/components/addCompany'
import productPictures from '@/components/productPictures'
import groupDetail from '@/components/groupDetail'
import search from '@/components/search'
import shoppingCart from '@/components/shoppingCart'
import orderManagement from '@/components/orderManagement'
import mine from '@/components/mine'
import myAddress from '@/components/myAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
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
      path: '/productPictures/search',
      name: 'search',
      component: search
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/orderManagement',
      name: 'orderManagement',
      component: orderManagement
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/mine/myAddress',
      name: 'myAddress',
      component: myAddress
    }
  ]
})
