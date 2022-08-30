import App from './App'
import $http from './util/api'
import $showMsg from './util/showMsg'
import store from '@/store/store.js'

// #ifndef VUE3
import Vue from 'vue'
uni.$http=$http
uni.$showMsg=$showMsg
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif