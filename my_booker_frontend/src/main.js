import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import store from "@/modules/store"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import menus from '@/constants/menus.js'

Vue.use(require('vue-moment'));
Vue.use(VueRouter)
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