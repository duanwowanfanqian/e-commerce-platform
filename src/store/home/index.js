import { reqCateGoryList, reqGetBannerList, reqFloorList } from "@/api";
// home模块的小仓库
const state = {
  // state中的数据默认初始值不要乱写，服务器返回什么，数据默认初始值便是什么(根据接口的返回值进行初始化)
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const actions = {
  // 因为ajax是异步任务，在执行异步任务前if早已执行，当时result还是undefined，所以无法执行，会报错
  // 解决办法使用async和await。它们的作用是使异步任务同步执行，await 右侧的表达式一般为 promise 对象；await 返回的是 promise 成功的值；
  // 在async标识的函数体中先执行await标识的异步任务，再去执行函数体中的其他操作

  // categoryList函数中的{ commit }参数利用ES6中的对象结构，直接拿到对象里的commit方法
  async categoryList({ commit }) {
    // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据。reqCategoryList方法返回的是promise对象
    const result = await reqCateGoryList();
    // 判断数据是否请求成功，请求成功后调用CATEGORYLIST方法更改state里的数据
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  },

  async getBannerList({ commit }) {
    const result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },

  async getFloorList({ commit }) {
    const result = await reqFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data);
    }
  },

  
};

const mutations = {
  CATEGORYLIST(state, value) {
    state.categoryList = value;
  },
  GETBANNERLIST(state, value) {
    state.bannerList = value;
  },
  GETFLOORLIST(state, value) {
    state.floorList = value;
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
