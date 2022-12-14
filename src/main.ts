import Vue from "vue";
import ElementUI, { Button, Checkbox } from "element-ui";
import App from "./App.vue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import store from '@/store'
import './assets/main.css'

Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Checkbox);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
