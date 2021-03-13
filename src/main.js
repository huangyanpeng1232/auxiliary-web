import Vue from 'vue'
import App from './App.vue'

import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/js/bootstrap.min'
import axios from 'axios'


axios.defaults.baseURL='http://10.130.0.2:8000'
Vue.prototype.$axios = axios

import router from './router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
