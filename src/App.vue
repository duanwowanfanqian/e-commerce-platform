<template>
  <div id="app">
    <Header />
    <!-- <Home :v-show="flag" /> -->
    <!-- 指定组件的呈现位置 -->
    <router-view>
    </router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";

export default {
  name: 'App',
  data () {
    return {
      msg: 'abc'
    }
  },
  mounted () {
    // 派发一个action||获取商品分类的三级列表数据
    this.$store.dispatch('categoryList');
  },
  components: {
    Header,
    Footer,
    Home
  }
}
</script>

<style>
</style>
