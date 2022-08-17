// 自己封装一个插件，实现字母大写转换
// vue插件一定要暴露一个对象
let myPlugins = {};

// 第一个为默认参数Vue构造函数，options是注册自定义指令时传递的配置对象
myPlugins.install = function (Vue, options) {
  // el是绑定自定义指令的DOM节点，binding指令相关信息，如指令名，指令绑定的值，指令绑定的前一个值具体看vue官网，vnode：Vue 编译生成的虚拟节点。他们都是默认参数
  Vue.directive(options.name, (el, binding, vnode) => {
    // 让节点里的innerHTML为指令绑定值的大写
    el.innerHTML = binding.value.toUpperCase();
  });
};

export default myPlugins;
