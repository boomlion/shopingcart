// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '@/store/store'
import 'lib-flexible/flexible.js'
import './assets/base.css'
import './components/page/json'
import '../node_modules/font-awesome/css/font-awesome.css'
Vue.config.productionTip = false
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
