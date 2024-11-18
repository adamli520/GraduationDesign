<template>
  <div class="login">
    <img class="logo" src="/static/login_logo.png" alt="">
    <div class="login-body login">
      <van-form @submit="onLogin">
        <van-cell-group inset>
          <van-field v-model="loginData.account" size="large" name="account" left-icon="user" label="用户名"
            placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="loginData.password" size="large" left-icon="eye" type="password" name="password"
            label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />

        </van-cell-group>
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle">去注册</div>
          <van-space direction="vertical" fill>
            <van-button round block color="#1baeae" native-type="submit">登录</van-button>
            <van-button round block type="danger" @click="showRest = true">忘记密码</van-button>
          </van-space>
        </div>
      </van-form>
    </div>
  </div>

  <van-action-sheet v-model:show="showRest" title="忘记密码">
    <van-form @submit="onReset">
      <van-cell-group inset>
        <van-field v-model="loginData.account" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="loginData.password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field v-model="loginData.emailaddress" type="email" name="emailaddress" label="邮箱" placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]" />
        <van-field v-model="loginData.verificationCode" center clearable label="验证码" placeholder="请输入验证码">
          <template #button>
            <van-button size="small" type="primary" @click="getVerificationCode" :disabled="countdown > 0">
              <template #default>
                <span v-text="countdown > 0 ? `${countdown} 秒后重新获取` : '获取验证码'"></span>
              </template>
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          重置
        </van-button>
      </div>
    </van-form>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { userlogin, getemailcode, resetPassword } from '@/api/api_user';
import { showSuccessToast, showFailToast, showDialog } from 'vant';
import { useUserInfo } from '@/store/userinfor'
const { fetchUserInfo } = useUserInfo()
const showRest = ref(false);
const countdown = ref(0);
const onReset = async () => {
  const res = await resetPassword(loginData) as any
  const { message, success } = res
  if (success) {
    showDialog({
      title: '成功',
      message: message,
    })
    showRest.value = false
  } else {
    showDialog({
      title: '错误',
      message: message,
    })
  }
}
const getVerificationCode = async () => {
  const res = await getemailcode(loginData) as any
  const { message, success } = res
  if (success) {
    // ElMessageBox.alert(`${message}${registData.emailaddress}请注意查收`, '提示')
    showDialog({
      title: '提示',
      message: `${message}${loginData.emailaddress}请注意查收`,
      theme: 'round-button',
    })
    countdown.value = 120; // 重置倒计时时间
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        clearInterval(timer); // 清除定时器
      }
    }, 1000);
  } else {
    showDialog({
      title: '提示',
      message: message,
    })
  }
}

interface loginRule {
  account: string
  password: string
  emailaddress: string
  verificationCode: string
}

const loginData = reactive<loginRule>({
  account: '',
  password: '',
  emailaddress: '',
  verificationCode: '',
});

import { useRouter } from 'vue-router'
const router = useRouter();
const toggle = () => {
  router.replace('/regist')
}

// 提交登录
const onLogin = async () => {
  const res = await userlogin(loginData) as any
  const { message, success, token } = res
  if (success) {
    sessionStorage.setItem('token', token)
    await fetchUserInfo()
    showSuccessToast(message)
    router.replace({
      path: '/user',
    })
  } else {
    showFailToast(message)
  }
}
</script>

<style scoped>
.login {
  .logo {
    width: 220px;
    height: 220px;
    display: block;
    margin: 80px auto 20px;
  }

  .login-body {
    padding: 0 20px;
  }

  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }


}
</style>