<template>
  <div class="login-container">
    <div class="login-container__logo">
      <img src="../../assets/logo.png" alt="" />
      <span>闽侯县烟草专卖局无证户监管系统</span>
    </div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">

      <div class="title-container">
        <h3 class="title">{{$t('login.title')}}</h3>
        <lang-select class="set-language"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" :placeholder="$t('login.username')"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          :placeholder="$t('login.password')" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

      <div class="tips" v-show="false">
        <span>{{$t('login.username')}} : admin</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>
      <div class="tips" v-show="false">
        <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>

      <el-button v-show="false" class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <social-sign />
    </el-dialog>
    <div class="login-container__footer">
      <span>技术支持 闽侯县烟草专卖局</span>
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  components: { LangSelect, SocialSign },
  name: 'login',
  data() {
    /* const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    } */
    return {
      loginForm: {
        username: 'Admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            console.log('res', res)
            this.loading = false
            this.$router.push({ path: '/' })
            console.log(111)
          }).catch((err) => {
            console.log('err', err)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    background-image: url('../../assets/bg.jpg');
    background-repeat: no-repeat;
    background-position: top;
    background-size: 100% 105%;


    .login-container__logo {
      background-color: $light_gray;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 12vh;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      img {
        height: 6vh;
        margin-right: 5vh;
      }
      font-size: 4vh;
      color: #24805a;
      font-weight: bold;
    }
    .login-container__footer {
      background-color: $light_gray;
      display: flex;
      align-items: top;
      padding-top: 1.5vh;
      box-sizing: border-box;
      justify-content: center;
      height: 12vh;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 1.5vh;
      z-index: 3;
    }
    .el-input {
      display: inline-block;
      height: auto;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        /*padding: 12px 5px 12px 15px;*/
        height: auto;
        caret-color: $bg;
       &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px white inset !important;
          -webkit-text-fill-color: $bg !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: white;
      border-radius: 5px;
      color: #454545;
    }
  }
  .login-container .el-input input::first-line {
    color: $bg !important;
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~element-ui/packages/theme-chalk/src/common/var";
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    background-color: $light_gray;
    color: #2d3a4b;
    // box-shadow: $--box-shadow-light;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.4);

    border-radius: $--border-radius-base;
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    width: 450px;
    padding: 35px 35px 15px 35px;
    /*margin: 120px auto;*/
    margin-bottom: 80px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 0 5px 0 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $bg;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: $bg;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    /*top: 7px;*/
    top: 2px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
