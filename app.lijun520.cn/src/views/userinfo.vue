<template>
  <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" scrollable>
    保护好个人隐私
  </van-notice-bar>
  <van-cell-group inset>
    <van-cell title="用户ID" :value="userInfo.data.id" size="large" icon="contact-o"></van-cell>
    <van-cell title="账号" :value="userInfo.data.account" size="large" icon="user-circle-o"></van-cell>
    <van-cell title="性别" :value="userInfo.data.sex == '1' ? '男' : '女'" size="large" icon="friends-o"></van-cell>
    <van-cell title="手机号" :value="userInfo.data.mobile" size="large" icon="phone-o"></van-cell>
    <van-cell title="邮箱" :value="userInfo.data.email" size="large" icon="free-postage"></van-cell>
    <van-cell title="地址" :value="userInfo.data.address" size="large" icon="location-o"></van-cell>
    <van-cell title="余额" :value="userInfo.data.balance" size="large" icon="gold-coin-o"></van-cell>
  </van-cell-group>
  <VanDivider></VanDivider>
  <van-grid :column-num="2" clickable>
    <van-grid-item icon="orders-o" text="订单" dot to="/order" />
    <van-grid-item icon="gold-coin-o" text="充值" :badge="userInfo.data.balance" @click="showRechargeModal=true" />
    <van-grid-item icon="info-o" text="关于" to="/about" />
    <van-grid-item icon="comment-o" text="反馈" to="/feedback" />
  </van-grid>
  <VanDivider></VanDivider>
  <van-space direction="vertical" fill>
    <van-button icon="edit" type="primary" block :disabled="!userInfo.isLogin" @click="showUser=true">编辑</van-button>
    <van-button icon="clear" type="danger" block @click="logout" :disabled="!userInfo.isLogin">退出</van-button>
  </van-space>


  <van-action-sheet v-model:show="showUser" title="修改个人信息">
    <van-form @submit="onEdit">
      <van-field v-model="editInfoForm.nickname" label="昵称" placeholder="请输入昵称" required />
      <van-field name="radio" label="性别" required>
        <template #input>
          <van-radio-group v-model="editInfoForm.sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="0">女</van-radio>
            <van-radio :name="2">保密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="editInfoForm.mobile" label="手机" type="tel" placeholder="请输入手机号" required />
      <van-field v-model="editInfoForm.email" label="邮箱" type="email" placeholder="请输入邮箱" required />
      <van-field v-model="editInfoForm.address" label="地址" placeholder="请输入地址" required />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          修改
        </van-button>
      </div>
    </van-form>
  </van-action-sheet>

  <van-action-sheet v-model:show="showRechargeModal" title="充值余额" >  
    <van-form @submit="confirmRecharge">  
      <van-field label="充值金额">
        <template #input>
          <van-stepper  min="0" v-model="rechargeForm.rechargeAmount" />
          </template>
      </van-field>  
     
      <van-field  
        v-model="rechargeForm.balanceInModal"  
        label="当前余额"  
        readonly  
        clickable  
        clearable
        disabled
        size="large"  
      />  
      <van-image :src="rechargeForm.img" fit="cover" aspect-fit />  
      <div slot="footer">  
        <van-button round block type="primary" native-type="submit">充值</van-button>  
      </div>  
    </van-form>  
  </van-action-sheet>  
</template>
<script lang="ts" setup>
import { ref,reactive } from 'vue';
import { useUserInfo } from '@/store/userinfor';
import { useCartStore } from '@/store/cartStore';
import{updateUserInfo,userRecharge}from '@/api/userinfor'
import { storeToRefs } from 'pinia';
import { showConfirmDialog, showDialog  } from 'vant';
import { useRouter } from 'vue-router';
const router = useRouter();
const {clearUserInfo,fetchUserInfo} = useUserInfo();
const {clearCart}=useCartStore();
const {userInfo} = storeToRefs(useUserInfo());

interface UserData {
  nickname: string;
  sex: string;
  mobile: string;
  email: string;
  address: string;
  balance?: number;
}
const editInfoForm  = reactive<UserData>({
  ...userInfo.value.data,
});

const rechargeForm = reactive({
  img: '/picture/alipay.jpg',
  rechargeAmount: 0,
  balanceInModal: userInfo.value.data.balance,
});
const onEdit = async() => {
  const {success,message} = await updateUserInfo(editInfoForm) as any
 if(success){
  showUser.value = false
  showDialog({message})
  fetchUserInfo()
 }else{
  showDialog({message})
 }

}
const confirmRecharge = async() => {
  const {success,message,data} = await userRecharge(rechargeForm.rechargeAmount) as any
if(success){
  showDialog({message})
  rechargeForm.balanceInModal = data.balance
  fetchUserInfo()
  showRechargeModal.value = false
}else{
  showDialog({message})
}
}
const showRechargeModal = ref(false);
const showUser = ref(false);
const logout = () => {
  showConfirmDialog({
    title: '提示',
    theme: 'round-button',
    message:
      '确定要退出登录吗？',
  }).then(() => {
    sessionStorage.removeItem('token')
    clearUserInfo();
    clearCart();
    // 通过pinia清空本地清空，注意购物车仓库没有持久化存储
    router.push('/game'); 
  }).catch(() => {
    // on cancel
  })

  } 


</script>
<style scoped></style>