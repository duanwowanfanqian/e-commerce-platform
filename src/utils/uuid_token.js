// 游客模式下：封装一个获取uuid_token的函数，如果没有uuid_token就生成一个随机的uuid，并创建token和返回
import { v4 as uuidv4 } from "uuid";
// 要生成一个随机的字符串，且每次执行不能发生变化，游客的身份持续存储
export const getUUID = () => {
  // 先从本地存储获取uuid(看一下本地存储里面是否有)
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  // 如果没有
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4();
    // 将游客临时身份存储再本地存储中
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  return uuid_token;
};
