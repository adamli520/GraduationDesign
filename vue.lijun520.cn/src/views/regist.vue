<script setup lang="ts">
import {onMounted, ref, reactive} from 'vue'
import type { FormRules,FormInstance, Action } from 'element-plus';
import { ElMessage,ElMessageBox} from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter();
const countdown = ref(0);

import {register,getemailcode,userlogin} from '@/api/api_user'


const getVerificationCode = async (formEl: FormInstance | undefined) => {
    //排除verificationCode字段表单验证，要是没有验证，则直接返回不执行后续操作
  const excludeVerificationCode = Object.keys(registRules).filter(field => field !== "verificationCode");
  try {
    await formEl?.validateField(excludeVerificationCode)
  } catch (error) {
    ElMessage.error('请填写完整并检查是否符合规则');
    return;
  }

  const res = await getemailcode(registData) as any
  const {message,success} = res
  if(success){
    // ElMessage.success(`${message}${registData.emailaddress}请注意查收`);
    ElMessageBox.alert(`${message}${registData.emailaddress}请注意查收`, '提示')
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

// const isFormValid = async() => {
//   return  await registFormRef.value?.validate();
// };

interface registRule {
  account: string
  password: string,
  emailaddress: string
  confirmPassword: string
  verificationCode: string
  privacy: boolean 
}

const registData = reactive<registRule>({
  account: '',
  password: '',
  emailaddress: '',
  confirmPassword: '',
  verificationCode: '',
  privacy: true 
});


const registRules =reactive<FormRules<registRule>>( {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{4,10}$/, message: '用户名必须为英文加数字，且长度为4到10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  emailaddress: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  privacy: [
    { required: true, message: '你必须勾选此项', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error('请勾选隐私协议'));
        } else {
          callback();
        }
      },
    }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
    validator: (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== registData.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
    trigger: 'change'
  }
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    
  ],
})

const registFormRef = ref<FormInstance>()

const time = ref(new Date().toLocaleString())
onMounted(()=>{
  setInterval(()=>{
    time.value = new Date().toLocaleString()
  })
})
const gologin=()=>{
  router.replace('/login')
}
const regist=async (formEl: FormInstance | undefined)=>{
 
  try {
    await formEl?.validate()
  }catch(error){
    ElMessage.error('请填写完整并检查是否符合规则');
    return;
  }

  const res=await register(registData) as any
  const {message,success} = res
  if(success){
    // ElMessageBox.alert(message, '注册成功')
    ElMessageBox.confirm('注册成功，是否立即登录？', message, {
    confirmButtonText: '一键登录',
    cancelButtonText: '暂不登录',
    showCancelButton: true,
    center: true,
    type: 'success',
    callback: async (action: Action) => {
      if (action === 'confirm') {
        const res = await userlogin(registData) as any
        const {message,success,token} = res
        if(success){
          ElMessageBox.alert(message, message,{
            callback:(action: Action) => {
              if (action === 'confirm') {
                sessionStorage.setItem('token', token)
                router.replace('/game')
                // location.reload() 
                // 通过编程式路由跳转的页面不会重新渲染请实现con_header组件重新渲染
                
              }
            },
          })
         
        }else{  
          ElMessageBox.alert(message, '一键登录失败')
        }
      }
      if (action === 'cancel') {
        ElMessageBox.alert('欢迎下次再来', '注册成功')
      }
    },
  })
  }else{  
    ElMessageBox.alert(message, '注册失败')
  }


}

router.afterEach(() => {
  // 执行重新渲染操作，例如通过修改响应式数据来触发重新渲染
   location.reload() 
});
</script>

<template>
  <div id="regist-all">
    <div id="title">
      <h1>注册</h1>
    </div>
    <div id="regist">
      <el-card>
        <el-form :model="registData" :rules="registRules" ref="registFormRef" label-width="80px" class="regist-form" status-icon>
          <el-form-item label="用户名" prop="account">
            <el-input v-model="registData.account" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registData.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="registData.confirmPassword" placeholder="再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="emailaddress">
            <el-input type="email" v-model="registData.emailaddress" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode">
            <div class="el-input-group">
              <el-input v-model="registData.verificationCode" placeholder="请输入验证码"></el-input>
              <el-button @click="getVerificationCode(registFormRef)" type="primary" :disabled="countdown > 0" v-text="countdown > 0 ? `${countdown} 秒后重新获取` : '获取验证码'"></el-button>
            </div>
          </el-form-item>
          <el-form-item prop="privacy">
            <el-checkbox v-model="registData.privacy" label="agree">我已阅读并同意隐私保护协议</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="regist(registFormRef)">注册</el-button>
            <el-button type="primary" @click="gologin">返回登录</el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </div>
    <div id="clock" style="font-size: 30px; position:absolute;top:75%;left: 20%;">当前时间：{{ time }}</div>
  </div>
</template>

<style scoped>
#title{
  font-size:30px;
  left: 20px;
  position: absolute;
  left: 20%;
  top: 10%;
}
#form{
  line-height: 75px;
  padding-left: 25px;
  padding-right:25px;
  border-radius: 0%;
  text-align: center;
}
#regist{
  position: absolute;
  top: 30%;
  left: 35%;
  /* transform: translate(-50%,-50%); */
  /* padding: 20px; */
  border-radius: 0%;
}
.el-card {
  width: 450px;
  height:360px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15%;
  
}
#regist-all{
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0%;
  left: 0%;
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
</style>