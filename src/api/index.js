// 当前这个模板，API统一管理
import requests from "./request";

import mockRequest from "./mockAjax";

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
// 发送请求：axios发送请求结果返回Promise对象，因为在axios二次封装时，配置了baseURL(即基础路径)为api，所以在这就不用写/api路径前缀了
export const reqCateGoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "GET" });
// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequest.get("/banner");
// 获取floor数据
export const reqFloorList = () => mockRequest.get("/floor");

// 当前接口获取搜索模块数据,给服务器传递一个默认参数【至少是一个空对象】
export const reqSearchList = data =>
  requests({
    method: "POST",
    url: "/list",
    data: data,
  });

// 获取产品详情信息的接口，URL：api/item/{skuId}，请求方式get
export const reqGoodsInfo = skuId =>
  requests({
    url: `/item/${skuId}`,
    method: "GET",
  });

//  将产品添加到购物车中(获取更新某一个产品的个数)
// /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `cart/addToCart/${skuId}/${skuNum}`,
    method: "POST",
  });

// 获取购物车列表数据接口
// url:/api/cart/cartList   method:get
export const reqCartList = () =>
  requests({
    url: "/cart/cartList",
    method: "GET",
  });

// 删除购物车产品的接口
// URL: /api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = skuId =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE",
  });

// 修改购物车某个产品勾选状态
// URL: /api/cart/checkCart/{skuID}/{isChecked}  method:GET
export const reqUpdateCheckedById = (skuID, isChecked) =>
  requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: "GET" });

// 获取验证码
// URL：/api/user/passport/sendCode/{phone}  method: get
export const reqGetCode = phone =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "GET" });

// 用户注册
// URL: /api/user/passport/register  method:post  data:phone,code,password
export const reqUserRegister = data =>
  requests({ url: "/user/passport/register", data, method: "POST" });

// 用户登录
// URL: /api/user/passport/login   method: POST
export const reqUserLogin = data => requests({ url: "/user/passport/login", data, method: "POST" });

// 获取用户信息,请求携带的参数为token，放在请求头上
// URL: /api/user/passport/auth/getUserInfo   method: get
export const reqUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "GET" });

// 退出登录
// url: /api/user/passport/logout    get
export const reqLogout = () => requests({ url: "/user/passport/logout", method: "GET" });

//  获取用户地址信息
// url: /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = () =>
  requests({ url: "/user/userAddress/auth/findUserAddressList", method: "GET" });

// 获取商品清单
// url: /api/order/auth/trade    get
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: "GET" });

// 提交订单
// url: /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo, data) =>
  requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "POST" });

// 获取订单支付信息
// url: /api/payment/weixin/createNative/{orderId}   get
export const reqPayInfo = orderId =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "GET" });

// 查询支付订单状态
// url: /api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayState = orderId =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "GET" });

// 获取我的订单列表
// url: /api/order/auth/{page}/{limit}    get
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "GET" });
