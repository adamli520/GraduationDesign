<template>
  <div class="container" style="margin-top: 80px;">
    <h1>用户中心</h1>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <h3>个人信息</h3>
          </template>
          <h5>这里显示用户的个人信息。</h5>
          <template #footer>
            <el-button type="primary" :icon="Edit" round @click="showEditPersonalModal=true"
              :disabled="!userInfo.isLogin">编辑</el-button>
          </template>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <template #header>
            <h3>余额</h3>
          </template>
          <h5>这里显示用户的余额。</h5>
          <template #footer>
            <el-button type="primary" :icon="Wallet" round @click="showRechargeModal=true"
              :disabled="!userInfo.isLogin">充值</el-button>
          </template>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="mt-4 mb-5" :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <h3>我的订单</h3>
          </template>
          <h5>这里显示用户的订单历史。</h5>
          <template #footer>
            <el-button type="primary" :icon="Tickets" round @click="showOrdersModal=true"
              :disabled="!userInfo.isLogin">订单</el-button>
          </template>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <template #header>
            <h3>我的反馈</h3>
          </template>
          <h5>这里显示用户的反馈历史。</h5>
          <template #footer>
            <el-button type="primary" :icon="Message" round @click="showFeedbackModal=true"
              :disabled="!userInfo.isLogin">反馈</el-button>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!-- 模态框 -->
  <el-dialog title="编辑个人信息" v-model="showEditPersonalModal" width="20%">
    <el-form :model="editInfoForm" label-position="top">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="editInfoForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="editInfoForm.sex" placeholder="请选择">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editInfoForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editInfoForm.email"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="editInfoForm.address"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showEditPersonalModal = false">关闭</el-button>
      <el-button type="primary" @click="saveInfo">保存</el-button>
    </template>
  </el-dialog>

  <el-dialog title="充值余额" v-model="showRechargeModal" width="20%">
    <el-form :model="rechargeForm" label-position="top">
      <el-form-item label="充值金额">
        <el-input v-model="rechargeForm.rechargeAmount" placeholder="请输入充值金额" type="number"></el-input>
      </el-form-item>
      <el-form-item label="当前余额">
        <el-input v-model="rechargeForm.balanceInModal" disabled></el-input>
      </el-form-item>
      <el-form-item label="充值图片">
        <el-image :src='rechargeForm.img' />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showRechargeModal = false">取消</el-button>
      <el-button type="primary" @click="confirmRecharge">充值</el-button>
    </template>

  </el-dialog>

  <el-dialog title="订单历史" v-model="showOrdersModal" width="50%" @open="openOrdersModal" center>
    <el-table :data="ordersData" style="width: 100%" height="400" stripe table-layout="auto">
      <el-table-column label="订单号" prop="order_id"></el-table-column>
      <el-table-column label="下单时间" prop="order_date"></el-table-column>
      <el-table-column label="订单状态" prop="order_status"></el-table-column>
      <el-table-column label="游戏名称" prop="game_name"></el-table-column>
      <el-table-column label="商品单价" prop="unit_price"></el-table-column>      
      <el-table-column label="购买数量" prop="quantity"></el-table-column>
      <el-table-column label="总计" prop="total_amount"></el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="showOrdersModal = false" type="danger">关闭</el-button>
    </template>

  </el-dialog>

  <el-dialog title="查看反馈" v-model="showFeedbackModal" width="50%" @open="openFeedbackModal" center>
    <el-table :data="feedbackData" style="width: 100%" height="300" stripe table-layout="auto">
      <el-table-column label="用户" prop="name"></el-table-column>
      <el-table-column label="联系邮箱" prop="email"></el-table-column>
      <el-table-column label="反馈内容" prop="content"></el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="showFeedbackModal = false" type="danger">关闭</el-button>
    </template>
  </el-dialog>

</template>
<script setup lang="ts">
import { ref,reactive } from 'vue'
import { ElMessage } from 'element-plus';
import{updateUserInfo,userRecharge,getUserOrder,getUserFeedback}from '@/api/userinfor'
import {
  Edit,
  Tickets,
  Wallet,
  Message
} from '@element-plus/icons-vue'
import { useUserInfo } from '@/store/userinfor'
import { storeToRefs } from 'pinia';
const {userInfo} = storeToRefs(useUserInfo())
const { fetchUserInfo } = useUserInfo()

const showEditPersonalModal =ref(false)
const showRechargeModal =ref(false)
const showOrdersModal =ref(false)
const showFeedbackModal =ref(false)


interface UserData {
  nickname: string;
  sex: string;
  mobile: string;
  email: string;
  address: string;
  balance?: number;
}
const editInfoForm  = reactive<UserData>({
  // nickname: userInfo.data.nickname,
  //   sex: userInfo.data.sex,
  //   mobile: userInfo.data.mobile,
  //   email: userInfo.data.email,
  //   address: userInfo.data.address,
  ...userInfo.value.data,
});


const saveInfo = async()=>{
 const {success,message} = await updateUserInfo(editInfoForm) as any
 if(success){
  showEditPersonalModal.value = false
  ElMessage({type:'success',message:message})
  fetchUserInfo()
 }else{
  ElMessage({type:'error',message:message})
 }
 
}


const confirmRecharge = async()=>{
const {success,message,data} = await userRecharge(rechargeForm.rechargeAmount) as any
if(success){
  ElMessage({type:'success',message:message})
  rechargeForm.balanceInModal = data.balance
  showRechargeModal.value = false
}else{
  ElMessage({type:'error',message:message})
}
}

const rechargeForm = reactive({
  img: '/picture/alipay.jpg',
  rechargeAmount: 0,
  balanceInModal: userInfo.value.data.balance,
});

const openOrdersModal =async () => {
  const { success, data } = await getUserOrder() as any
  if (success) {
    ElMessage({ type: 'success', message:"成功获取订单信息" })
    ordersData.value = data
  }
}

const ordersData = ref([
  {
  order_id: '',
  order_date: '',
  order_status: '',
  game_name: '',
  unit_price: 0,
  total_amount: 0,
  quantity: 0
}
]);

const openFeedbackModal =async () => {
 const { success, data } = await getUserFeedback() as any
 if (success) {
   ElMessage({ type: 'success', message:"成功获取反馈信息" })
   feedbackData.value = data
 }
}
const feedbackData = ref([
  {
    name: '',
    email: '',
    content: '',
  }
]);
</script>

<style scoped></style>