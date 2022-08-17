<template>
  <div>
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- 使用vee-validate插件进行表单验证 -->
        <input placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="{ required: true, regex: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }" :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input placeholder="请输入你的验证码" v-model="code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ invalid: errors.has('phone') }" />
        <button style="height:36px" @click="getCode">获取验证码</button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input placeholder="请输入你的登录密码" v-model="password" name="password" v-validate="{ required: true, regex: /^[0-9a-zA-Z]{6,20}$/ }" :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input placeholder="请输入确认密码" v-model="password1" name="password1" v-validate="{ required: true, is:password }" :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="agree" name="agree" v-validate="{ required: true, 'tongyi':true }" :class="{ invalid: errors.has('agree') }" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>
    <CopyRight />
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      // 收集表单数据---手机号
      phone: '',
      // 验证码
      code: '',
      // 密码
      password: '',
      // 确认密码
      password1: '',
      // 是否同意
      agree: true
    }
  },
  methods: {
    // 获取验证码
    async getCode () {
      try {
        const { phone } = this;
        // 简单判断一下---至少得有数据,只有phone有数据时才会调用store里的getCode方法
        phone && (await this.$store.dispatch('getCode', phone));
        // 将组件中的code属性值变为仓库中的验证码
        this.code = this.$store.state.user.code
      } catch (error) {
        alert('获取验证码失败')
      }
    },
    // 用户注册
    async userRegister () {
      // 只有当全部表单验证通过后，success才会为真
      const success = await this.$validator.validateAll();
      //全部表单验证成功，在向服务器发请求，进行注册
      //只要有一个表单没有成功，不会发请求
      if (success) {
        try {
          const { phone, code, password, password1 } = this;
          (phone && code && password == password1) && await this.$store.dispatch('userRegister', { phone, code, password })
          // 注册成功---路由跳转
          this.$router.push('/login');
        } catch (error) {
          alert('用户注册失败');
        }
      }
    }
  },
}
</script>

<style scoped lang="less">
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>