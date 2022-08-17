import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};
const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 修改购物车某个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 删除购物车列表所有被选中的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // context:上下文对象(小仓库)，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发actions】 state【当前仓库数据】
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : "";
      PromiseAll.push(promise);
    });
    // Promise.all根据promise集合返回一个Promise实例，在promise集合集合中只要有一个promise状态是已拒绝，返回的Promise实例就是已拒绝，反之则是已兑现
    return Promise.all(PromiseAll);
  },
  // 修改全部商品的选中状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};
const mutations = {
  GETCARTLIST(state, value) {
    state.cartList = value;
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
