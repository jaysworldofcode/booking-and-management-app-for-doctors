import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import store from "@/modules/store"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import menus from '@/constants/menus.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LottieVuePlayer from '@lottiefiles/vue-lottie-player'

Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'))
Vue.use(VueRouter)
Vue.use(LottieVuePlayer)

const router = new VueRouter({
  mode: 'history',
  history: true,
  base: '/',
  routes: menus,
})

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})