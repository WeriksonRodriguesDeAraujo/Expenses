import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/app.scss'
import FirebaseVue from './firebase'
import '@/utils/directives'

Vue.use(FirebaseVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
