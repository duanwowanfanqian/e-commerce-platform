import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {},
};
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    const result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
    }
  },
  // 获取商品清单
  async getOrderInfo({ commit }) {
    const result = await reqOrderInfo();
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
    }
  },
};
const mutations = {
  // 向仓库中添加用户地址信息
  GETUSERADDRESS(state, value) {
    state.address = value;
  },
  // 向仓库添加商品清单数据
  GETORDERINFO(state, value) {
    state.orderInfo = value;
  },
};
const getters = {
  defaultMessage(state) {
    return state.address[0] || {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
