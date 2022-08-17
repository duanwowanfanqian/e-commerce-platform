import Vue from "vue";

import { MessageBox, Button } from "element-ui";

// 引入路由
import router from "./router";

// 引入store
import store from "@/store";

// 引入接口api文件夹里面的全部请求函数
import * as API from "@/api";

import App from "./App.vue";
// 三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
import CopyRight from "@/pages/Login/CopyRight";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 第一个参数：全局组件的名字(也可写为TypeNav.name不用带引号) 第二个参数：哪一个组件
Vue.component("TypeNav", TypeNav);
Vue.component(CopyRight.name, CopyRight);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// Element-ui注册组件的时候,还有一种写法,挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Button.name, Button);

// 引入MockServer.js，注意：我们并没有对文件中的数据进行暴露，我们引入它并不是需要里面的对象或方法，而是调用一遍
import "@/mock/mockServe";
// 引入swiper样式，注意引入样式不需要from,也不需要用对象接收
import "swiper/css/swiper.css";

// 引入懒加载时需要的图片(即加载中显示的图片)
import Rikka from "@/assets/Rikka.gif";

// 引入懒加载插件(注意懒加载插件版本需要1版本的)
import VueLazyload from "vue-lazyload";
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: Rikka,
});
Vue.config.productionTip = false;

// 引入自定义插件
import myPlugins from "@/plugins/myPlugins";
// 注册自定义插件，并传入配置项
Vue.use(myPlugins, {
  name: "HaeFfi",
});

// 引用表单验证插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this; // 安装全局事件总线，$bus 就是当前应用的 vm
    Vue.prototype.$API = API;
  },
  // 注册路由信息，当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 在配置项中添加store
  store,
}).$mount("#app");
