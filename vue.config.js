const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查。语法检查例如：定义一个变量未使用就会报错
  lintOnSave: false,
  // 通过代理服务器实现跨域
  devServer: {
    proxy: {
      // 匹配所有以 '/api' 开头的请求路径(/api就是访问前缀，写在端口号后面)
      "/api": {
        // 指定代理目标(即提供数据的服务器)的基础路径，只含协议、域名、端口号
        target: "http://gmall-h5-api.atguigu.cn", //这里是项目上线前数据代理的地址
        // target: "http://39.98.123.211",
      },
    },
  },
  // 关闭打包时生成.map文件，该文件用于显示报错，但其比较占用内存所以在项目上线时需要剔除
  productionSourceMap: false,
});
