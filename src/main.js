import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import '../src/assets/styles/iconfont/iconfont.css'
import '../src/assets/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
