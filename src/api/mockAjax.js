//1、对axios二次封装，对下列配置不了解的可以通过axios文档查看，浏览器直接搜索axios文档
import axios from "axios";

// 1：利用axios对象的方法create，去创建一个axios实例
// 2：requests就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // baseURL表示基础路径，在发送请求时，会自动在端口号后面，path(即路径)前面添加指定的路径字段
  baseURL: "/mock",
  // 如果请求花费了超过timeout指定的时间，请求将被中断
  timeout: 5000,
});

//2、配置请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(config => {
  // config：配置对象，对象里面有一个属性很重要，就是header请求头
  return config;
});

//3、配置相应拦截器，在服务器返回数据后做一些事情
requests.interceptors.response.use(
  res => {
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data;
  },
  error => {
    // 响应失败的回调函数
    return Promise.reject(new Error("fail"));
  }
);

//4、对外暴露
export default requests;
