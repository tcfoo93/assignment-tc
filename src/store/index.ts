import Vue from "vue";
import Vuex from "vuex";
import TodoModule from "@/store/module/todo-module";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    TodoModule,
  },
});
