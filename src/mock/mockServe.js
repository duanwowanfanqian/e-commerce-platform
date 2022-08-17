// 先引入mockjs模块，mockjs对外暴露的是一个对象
import Mock from "mockjs";
// 把JSON数据格式引入进来(虽然我们没有将json数据格式对外暴露，，但还是可以引入)
// 原因：在webpack中会默认对外暴露图片文件和json文件，它们都不需要我们去暴露
import banner from "./banner.json";
import floor from "./floor.json";

// mock(中文意思是模拟)数据，第一个参数请求地址，第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner }); // 模拟首页的轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor });
