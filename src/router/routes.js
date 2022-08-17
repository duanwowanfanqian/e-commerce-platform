// 路由正常加载的引入方式，
// import Home from "@/pages/Home";

/* 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入： */
// 路由懒加载的引入方式。注意：component (和 components) 配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：
const Home = () => import("@/pages/Home");

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/center",
    // 路由懒加载简写方式
    component: () => import("@/pages/Center"),
    meta: { show: true },
    children: [
      {
        path: "myOrder",
        component: () => import("@/pages/Center/myOrder"),
      },
      {
        path: "groupOrder",
        component: () => import("@/pages/Center/groupOrder"),
      },
      {
        path: "/center",
        // redirect重定向，从 /center 重定向到 /center/myOrder。
        // component和redirect的差别：使用component还是当前路径，只是控制了显示哪个组件组件，而redirect是跳转到另一个路径
        redirect: "/center/myOrder",
      },
    ],
  },
  {
    // 订单完成页面
    path: "/paySuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    // 付款页面
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    // 路由独享的守卫
    beforeEnter: (to, from, next) => {
      // 去付款页面，必须是从订单页面而来
      if (from.path == "/trade") {
        next();
      } else {
        // 从其他路由组件来的，停留在当前
        next(false);
      }
    },
  },
  {
    // 订单页面
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    // 路由独享的守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    // 商品详细信息页面
    path: "/detail/:skuId",
    name: "detail",
    component: () => import("@/pages/Detail"),
    meta: { show: false },
  },
  {
    // 商品成功加入购物车页面
    path: "/addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    // 购物车结算页面
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    // 首页
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    // 登录页
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    // 商品列表页
    // 在占位符后面添加问号，指定params参数可传可不传
    path: "/search/:keyword?",
    name: "search",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    // 路由组件传递prop参数，只能是其中一个，不能同时出现，否则前者失效
    // 写法一：布尔值写法,只能接收params参数
    // props: true,
    // 写法二：对象写法,额外给路由组件传递一些props
    // props: {
    //   name: "写海菲",
    //   age: 21,
    // },
    // 写法三：函数写法(用的少)，可以params,query参数，通过props传递给路由组件
    props: $route => {
      return { keyword: $route.params.keyword, k: $route.query.k };
    },
  },
  {
    // 注册页面
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
];
