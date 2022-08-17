import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的接口，将验证返回，但正常情况，后台把验证码发到用户手机上（这里是为了省钱）
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    const result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    const result = await reqUserLogin(data);
    // 将来经常通过带token找服务器要用户信息进行展示
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      //将token持久化（放在本地存储中）
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 退出登录
  async Logout({ commit }) {
    let result = await reqLogout();
    if (result.code == 200) {
      commit("LOGOUT");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const mutations = {
  // 向小仓库添加验证码
  GETCODE(state, value) {
    state.code = value;
  },
  // 向小仓库添加token
  USERLOGIN(state, value) {
    state.token = value;
  },
  // 向小仓库添加用户信息
  GETUSERINFO(state, value) {
    state.userInfo = value;
  },
  // 删除仓库中的用户信息和本地存储的token
  LOGOUT(state) {
    removeToken();
    state.userInfo = {};
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
