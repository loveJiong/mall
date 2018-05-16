// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import VueTouch from 'vue-touch'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'

// require('./mock')

Vue.config.productionTip = false

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
