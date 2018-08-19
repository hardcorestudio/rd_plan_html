import Vue from 'vue'
import ElementUI from 'element-ui';
import './assets/css/common.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/router.js'

Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
