<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">登录</h2>
      <img src="/static/login_logo.png" alt="登录提示" class="login-image">
      <el-form :model="loginData" :rules="loginRules" ref="loginFormRef" label-width="80px" class="login-form"
        status-icon>
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginData.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="privacy">
          <el-checkbox v-model="loginData.privacy" label="agree">我已阅读并同意隐私保护协议</el-checkbox>
        </el-form-item>
        <el-form-item>
         
          <el-button type="primary" @click="login(loginFormRef)">登录</el-button>
          <el-button type="primary" @click="goregist" link>去注册</el-button>
        </el-form-item>
      </el-form>
      <template #footer> <el-button type="danger" @click="showRest=true" round>忘记密码</el-button></template>
    </el-card>
  </div>

  <el-dialog title="忘记密码" v-model="showRest" width="30%" center>
    <el-form :model="loginData" ref="loginForm" label-position="top">
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginData.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="emailaddress">
        <el-input type="email" v-model="loginData.emailaddress" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <div class="el-input-group">
          <el-input v-model="loginData.verificationCode" placeholder="请输入验证码"></el-input>
          <el-button @click="getVerificationCode()" type="primary" :disabled="countdown > 0"
            v-text="countdown > 0 ? `${countdown} 秒后重新获取` : '获取验证码'"></el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showRest = false">关闭</el-button>
      <el-button type="primary" @click="onReset()">重置</el-button>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import type { FormRules,FormInstance } from 'element-plus';
import { ElNotification,ElMessage,ElMessageBox, ElDialog } from 'element-plus'

import {userlogin,getemailcode,resetPassword} from '@/api/api_user';
import { useUserInfo } from '@/store/userinfor'
import {useCartStore} from'@/store/cartStore'
import { useRouter } from 'vue-router'
const router = useRouter();
const {getCartListData}=useCartStore()
const {fetchUserInfo} = useUserInfo()

const showRest=ref(false)

const countdown = ref(0);
const onReset = async () => {
  const res = await resetPassword(loginData) as any
  const { message, success } = res
  if (success) {
    ElMessageBox.alert(`${message}`, '成功',{type:'success',center:true})
    showRest.value = false  
  } else {
    ElMessageBox.alert(`${message}`, '失败',{type:'error',center:true})
  }
}
const getVerificationCode = async () => {

  const res = await getemailcode(loginData) as any
  const {message,success} = res
  if(success){
    // ElMessage.success(`${message}${registData.emailaddress}请注意查收`);
    ElMessageBox.alert(`${message}${loginData.emailaddress}请注意查收`, '提示')
    countdown.value = 120; // 重置倒计时时间
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value === 0) {
        clearInterval(timer); // 清除定时器
      }
    }, 1000);
  }else{
    ElMessage.error(`${message}`);
  }

};
const goregist=()=>{
  router.replace('/regist')
}

interface loginRule {
  account: string
  password: string
  privacy: boolean 
  emailaddress: string
  verificationCode: string
}

const loginData = reactive<loginRule>({
  account: '',
  password: '',
  privacy: true,
  emailaddress: '',
  verificationCode: '' 
  
});

const loginRules =reactive<FormRules<loginRule>>( {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{4,10}$/, message: '英文数字的组合，长度为4到10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  privacy: [
    { required: true, message: '你必须勾选此项', trigger: 'change' },
    {
      validator(rule, value, callback) {
        if (!value) {
          callback(new Error('你必须勾选此项'));
        } else {
          callback();
        }
      }
    }
  ]
})

const loginFormRef = ref<FormInstance>()

const login = async (formEl: FormInstance | undefined) => {
  
  try {
    await formEl?.validate()
  }catch(error){
    ElMessage.error('请填写完整并检查是否符合规则');
    return;
  }

  const res = await userlogin(loginData) as any
  const { message,success,token } = res
  console.log(res)
  if (success) {
      // const { password,...userInfo } = res.results
      // localStorage.setItem('userinfo', JSON.stringify(userInfo))
    sessionStorage.setItem('token', token)
    await fetchUserInfo()
    await getCartListData()
    ElNotification({
      title: '成功',
      message: message,
      type: 'success',
    })
    router.replace({
      path: '/game',
    })

		}else{
      ElNotification({
        title: '失败',
        message: message,
        type: 'error',
      })
    }
	
  
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-image: linear-gradient(
    90deg,
    cyan,
    purple
  );
  background-size: 400%;
  animation: myanimation 5s infinite;
}
@keyframes myanimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.login-card {
  width: 400px;
  padding: 20px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-image {
  width: 100%;
  margin-bottom: 20px;
}

.login-form {
  max-width: 300px;
  margin: 0 auto;
}
</style>
