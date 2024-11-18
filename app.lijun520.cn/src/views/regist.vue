<template>
  <div class="login">
    <img class="logo" src="/static/login_logo.png" alt="">
    <div class="login-body login">
      <van-form @submit="onSubmit" ref="registFormRef">
        <van-cell-group inset>
          <van-field v-model="registData.account" size="large" name="account" left-icon="user-o" label="用户名"
            placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' },{ pattern: /^[a-zA-Z0-9_]{4,10}$/, message: '用户名必须为4-10位字母、数字或下划线' }]" />
          <van-field v-model="registData.password" size="large" left-icon="eye-o" type="password" name="password"
            label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码'},{ pattern: /^.{6,}$/, message: '密码长度不能少于6位' }]" />
          <van-field v-model="registData.confirmPassword" size="large" left-icon="eye-o" type="password"
            name="confirmPassword" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请再次填入密码'}, { validator: (value:string) => value === registData.password, message: '两次输入密码不一致' }]" />
          <van-field v-model="registData.emailaddress" size="large" left-icon="envelop-o" type="email"
            name="emailaddress" label="邮箱" placeholder="邮箱" :rules="[{ required: true, message: '请填写邮箱' }]" />
          <van-field v-model="registData.verificationCode" center clearable label="验证码" placeholder="请输入验证码">
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
          <div class="link-register" @click="toggle">去登录</div>
          <van-button round block color="#1baeae" native-type="submit">注册</van-button>
        </div>

      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia';
import {register,getemailcode,userlogin} from '@/api/api_user'
import { showDialog,showConfirmDialog,showToast } from 'vant';
import type {  FormInstance } from 'vant';
import { useUserInfo } from '@/store/userinfor'
const {fetchUserInfo} = useUserInfo()
const {userInfo} = storeToRefs(useUserInfo())
const countdown = ref(0);
const registFormRef = ref<FormInstance>();
const getVerificationCode = async () => {
  // if (!registFormRef.value) {
  //   showToast('表单引用未初始化');
  //   return;
  // }
  try {
    await registFormRef.value?.validate()
  } catch (error) {
    showToast('请填写完整并检查是否符合规则');
    return;
  }

  const res = await getemailcode(registData) as any
  const { message, success } = res
  if (success) {
    // ElMessageBox.alert(`${message}${registData.emailaddress}请注意查收`, '提示')
    showDialog({
      title: '提示',
      message: `${message}${registData.emailaddress}请注意查收`,
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
      message: `${message}`,
    })
  }

};

interface loginRule {
account: string
password: string
emailaddress: string
confirmPassword: string
verificationCode: string

}

const registData = reactive<loginRule>({
account: '',
password: '',
emailaddress: '',
confirmPassword: '',
verificationCode: '',
});

import { useRouter } from 'vue-router'
const router = useRouter();
const toggle = () => {
  router.replace('/login')
}

// 提交登录或注册表单
const onSubmit = async () => {
  const res = await register(registData) as any;
  const { message, success } = res;

  if (success) {
    showConfirmDialog({
      title: '注册成功',
      message: '是否立即登录？',
      confirmButtonText: '一键登录',
      cancelButtonText: '暂不登录',
      theme: 'round-button',
    }).then(async () => {
      const res = await userlogin(registData) as any;
      const { message, success, token } = res;

      if (success) {
        showDialog({
          title: message,
          message: message
        }).then( async () => {
          sessionStorage.setItem('token', token);
          await fetchUserInfo()
          userInfo.value.isLogin = true;
          router.replace('/game');
        });
      } else {
        showDialog({
          title: '一键登录失败',
          message: message
        });
      }
    }).catch(() => {
      showDialog({
        title: '注册成功',
        message: '欢迎下次再来'
      });
    });
  } else {
    showDialog({
      title: '注册失败',
      message: message
    });
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
