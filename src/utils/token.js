// 登录情况下：操作token的功能模块
// 将token存储在本地储存中
export const setToken = token => {
  localStorage.setItem("TOKEN", token);
};
// 读取本地存储的token
export const getToken = () => localStorage.getItem("TOKEN");
// 删除token
export const removeToken = () => {
  localStorage.removeItem("TOKEN");
};
