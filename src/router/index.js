// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// 应用插件
Vue.use(VueRouter);

// 引入store
import store from "@/store";
// 引入删除本地token的函数
import { removeToken } from "@/utils/token";

// 先把VueRouter原型对象上的push方法保存一份,通过输出push可以发现他有三个参数
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.originReplace;

// 第一个参数，用于告诉原来的push方法，你往哪跳转并传递哪些参数
VueRouter.prototype.push = function (location, result, reject) {
  if (result && reject) {
    // 需要通过call，apply等方法调用原来的push方法，否则其this会指向window
    // call，apply的区别:相同点都可以调用函数,并且都可以篡改函数的this指向
    // 不同点:call传递参数用逗号隔开,apply传递参数使用数组
    originPush.call(this, location, result, reject);
  } else {
    // 当有一个回调没传都会执行else里的逻辑
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, result, reject) {
  if (result && reject) {
    originReplace.call(this, location, result, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 创建并暴露路由
let router = new VueRouter({
  // 配置路由，path表示路径，component表示组件，数组里面一个对象就是一个路由,注意这里是routes而不是routers
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});

// 全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  // to：可以获取到你路由跳转终点的路由的信息
  // from：可以获取到你路由跳转的起点路由信息
  // next：放行函数(没有它路由就无法切换)； next()放行  next(path)放行到指定路由（需要判断条件）
  // next(false): 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

  // 获取token，如果token不为空则说明用户已登录
  let token = store.state.user.token;
  // 获取用户信息
  let name = store.state.user.userInfo.name;
  // 判断用户是否登录
  if (token) {
    // 用户已登录:在登录情况不能在打开登录页面
    if (to.path == "/login") {
      next("/home");
    } else {
      // 用户跳转到除登录的其他页面:先判断有没有用户信息
      if (name) {
        // 有用户信息直接放行
        next();
      } else {
        // 没有用户信息
        try {
          // 就先获取信息，获取成功后放行
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // 获取信息失败(一般是token过期导致),所以我们删除客户端过期的token，然后重新登录
          await store.dispatch("Logout");
          next("/login");
        }
      }
    }
  } else {
    // 游客情况下：订单页面(/trade)，支付页面(/pay),我的历史订单页面(/center)不能访问
    let toPath = to.path;
    // 如果路径中含有游客模式下不能访问的路由，那就跳转到登录页面
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      // 把未登录的时候想去而没去成的信息，存储在地址栏中
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
