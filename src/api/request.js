//1、对axios二次封装，对下列配置不了解的可以通过axios文档查看，浏览器直接搜索axios文档
import axios from "axios";
// 在当前模块中引入store
import store from "@/store";

// 我们进度条有点问题所以不开
// 引入进度条，引入后的nprogress是一个对象，里面有很多方法，这里主要用done进度条结束,start进度条开始两个方法。
// import NProgress from "nprogress";
// 引入进度条样式
// import "nprogress/nprogress.css";

// 1：利用axios对象的方法create，去创建一个axios实例
// 2：requests就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // baseURL表示基础路径，在发送请求时，会自动在端口号后面，path(即路径)前面添加指定的路径字段
  baseURL: "/api",
  // 如果请求花费了超过timeout指定的时间，请求将被中断
  timeout: 5000,
});

//2、配置请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // 开启进度条，进度条开始动
  // NProgress.start();
  // config：配置对象，对象里面有一个属性很重要，就是header请求头
  // 在请求头中携带用户id
  if (store.state.detail.uuid_token) {
    // 请求头添加一个字段（userTempId）和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 在请求头中携带token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  return config;
});

//3、配置响应拦截器，在服务器返回数据后做一些事情
requests.interceptors.response.use(
  (res) => {
    // 服务器返回数据，关闭进度条
    // NProgress.done();
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情

    return res.data;
  },
  (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error("fail"));
  }
);

//4、对外暴露
export default requests;
