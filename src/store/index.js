import Vue from "vue";
import Vuex from "vuex";
// 使用vuex插件
Vue.use(Vuex);
// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

export default new Vuex.Store({
  // 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
  // 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module），用modules存放分割的模板。
  // 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  },
});
