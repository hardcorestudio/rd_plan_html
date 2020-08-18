import Vue from 'vue'
import App from './App.vue'
import { 
  Button, 
  Input,
  FormModel,
  DatePicker,
  Popconfirm,
  notification
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.prototype.$notification = notification;

Vue.use(Button)
Vue.use(Input)
Vue.use(FormModel)
Vue.use(DatePicker)
Vue.use(Popconfirm)


new Vue({
  render: h => h(App),
}).$mount('#app')
