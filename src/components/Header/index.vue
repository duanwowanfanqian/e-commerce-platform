<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>AlloyImage欢迎您！</p>
          <!-- 没有用户名，未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- <a href=" ###">登录</a> -->
            <!-- 声明式导航 -->
            <router-link to="/login">登录</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 有用户名，已登录 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="Logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的AlloyImage</a>
          <a href="###">AlloyImage会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注AlloyImage</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="">
        </a>-->
        <!-- target="_blank"会创建一个新页面所以我们不用 -->
        <router-link to="/home" class="logo" title="AlloyImage">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <!-- 搜索 -->
          <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      keyword: '',
    }
  },
  computed: {
    // 用户信息
    userInfo () {
      return this.$store.state.user.userInfo || {}
    },
    // 用户名
    userName () {
      return this.userInfo.name
    }
  },
  methods: {
    // 搜索按钮的回调函数，需要向search路由进行跳转
    goSearch () {
      // 这里使用的是编程式导航,和声明式导航区别是不使用router-link。 

      // 路由传递参数，第一种字符串形式。
      // 通过路径传递参数，第一个是以params参数传递，第二个是通过query参数传递。toUpperCase方法将字符转为大写。
      // this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase());

      // 第二种：模板字符串形式
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

      // 第三种：对象形式(最常用)
      // this.$router.push({ name: 'search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } })

      // 路由传递参数相关面试题
      // 1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
      // 答：不可以，路由跳转传参时，对象的写法可以是name,path形式，，但path这种写法不能和params参数一起,否则报错
      // this.$router.push({ path: '/search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } })

      // 2:如何指定params参数可传可不传?
      // 如果路由要求通过params传参(即已占位),但是我们没有传递params参数，会导致路径出现问题
      // 解决办法：在配置路径时，在占位符后面添加一个问号，这样params可以传递也可以不传递
      // this.$router.push({ name: 'search', query: { k: this.keyword.toUpperCase() } })

      // 3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      // params参数传递空串也会导致路径出现问题
      //  通过使用undefined可以解决params传递，不传递空串的问题
      // this.$router.push({ name: 'search', params: { keyword: '' || undefined }, query: { k: this.keyword.toUpperCase() }, })

      // 4: 路由组件能不能传递props数据?
      // 可以有三种写法，分别是布尔值，对象，函数。 在路由配置中处理.


      if (this.$route.query) {
        // let location = { name: 'search', params: { keyword: this.keyword || undefined } };
        // location.query = this.$route.query;
        // this.$router.push(location)
        this.$router.push({ name: 'search', params: { keyword: this.keyword || undefined }, query: this.$route.query })
      } else {
        this.$router.push({ name: 'search', params: { keyword: this.keyword || undefined } })
      }
      this.keyword = ''
    },
    // 退出登录
    async Logout () {
      try {
        // 清除服务器中的token和本地存储的用户信息和token
        await this.$store.dispatch('Logout')
        // 退出登录后跳转回首页
        this.$router.push('/home')
      } catch (error) {
        alert('退出登录失败')
      }
    }
  },
  mounted () {
  },
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>