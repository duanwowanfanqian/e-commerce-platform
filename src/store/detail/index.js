import {
  reqGoodsInfo,
  reqAddOrUpdateShopCart,

} from "@/api";
// 封装游客身份模块uuid--->生成一个随机字符串(不能再变了)
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodsInfo: {},
  // 游客的临时身份
  uuid_token: getUUID(),
};
const actions = {
  // 获取产品信息的action
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODSINFO", result.data);
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 将商品加入购物车，发送请求更新服务器数据，这里返回的结果data为null，因为再三连环(actions,mutations,state)里我们不需要数据
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // 当前的这函数如果执行返回Promise
    if (result.code == 200) {
      // 让Promise对象状态为已兑现
      return "ok";
    } else {
      // 让Promise返回状态为已拒绝
      return Promise.reject(new Error("faile"));
    }
  },
}
const mutations = {
  GETGOODSINFO(state, value) {
    state.goodsInfo = value;
  },
};
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    // state.goodInfo初始状态空对象，里面的categoryView属性则为undefined，而在detail组件中会开始渲染的时候会获取categoryView(这时为undefined)
    // 这会导致控制台飘红，虽然后面会数据更新，对运行没有影响(但飘红还存在).
    return state.goodsInfo.categoryView || {};
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  // 产品售卖属性的简化
  spuSaleAttrList() {
    return state.goodsInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
