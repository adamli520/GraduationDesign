<template>

  <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <div class="container">
      <h1 class="title">
        <a class="navbar-brand" href="#">
          <img src="/static/logo.png" alt="logo" width="50" height="50">
        </a>
      </h1>
      <!-- 折叠按钮 -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse mx-5 justify-content-center" id="navbar">
        <ul class="navbar-nav ml-auto px-lg-5 ml-lg-5 d-flex justify-content-between w-100">
          <!-- navbar-nav ml-auto px-lg-5 ml-lg-5 d-flex justify-content-between w-100 -->
          <li class="nav-item ">
            <a class="nav-link" :class="{ active: isActive('/home') }" @click="navigate('/home')"><i
                class="iconfont icon-zhuye1">主页</i></a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" :class="{ active: isActive('/game') }" @click="navigate('/game')"><i
                class="iconfont icon-youxi1">游戏</i></a>
          </li>
          <li class="nav-item ">
            <a class="nav-link" :class="{ active: isActive('/support') }" @click="navigate('/support')"><i
                class="iconfont icon-jishufuwu">技术支持</i></a>
          </li>
        </ul>
        <!-- 搜索栏 -->
        <!-- <form action="" class="d-flex mx-lg-4 my-3 my-lg-0">
          <input type="text" class="form-control me-2" placeholder="直接回车也可搜索" id="searchInput">
          <button class="btn btn-light" type="button" id="btn-search">
            <i class="iconfont icon-sousuo1"></i>
          </button>
        </form> -->

        <!-- 购物车区域 -->
        <el-badge :value="cartItems.length">
          <el-button round @click="showShoppingCart=true" :disabled="!userInfo.isLogin" plain color="#d81e06" >
            <!-- :icon="ShoppingCart" -->
            <i class="iconfont icon-gouwuche"></i>
        </el-button>
        </el-badge>

      </div>

       <div class="mx-lg-2 ml-3">
          <div  v-if="!userInfo.isLogin">
            <button class="btn btn-primary me-3" @click="login">登录</button>
            <button class="btn btn-primary" @click="register">注册</button>
          </div>
          <div  v-if="userInfo.isLogin">
            <button class="btn btn-outline-info me-3" @click="go_center">欢迎用户：{{ userInfo.data.account }}</button>
            <button class="btn btn-info" @click="logout">退出</button>
          </div>
          
        </div>
        
    </div>
    <button class="btn btn-outline-info " @click="router.replace('/about')">关于</button>
  </nav>

  <!-- 购物车模态框 -->
  <el-dialog title="购物车" v-model="showShoppingCart" width="40%" :fullscreen="shopcart_full">
    <el-table :data="cartItems" style="width: 100%" table-layout='auto' height="250">
      <el-table-column prop="name" label="游戏"></el-table-column>
      <el-table-column prop="unit_price" label="价格"></el-table-column>
      <el-table-column prop="quantity" label="数量">
        <template #default="{ row }">
          <el-input-number v-model="row.quantity" :min="1" @change="updateQuantity(row)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="subtotal" label="小计"></el-table-column>
      <el-table-column label="选择" >
        <template #default="{ row }">
          <el-checkbox v-model="row.selected"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="removeItem(row)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: right;">
      <h5>商品数量：<span>{{ itemCount }}</span></h5>
      <h5>总计：<span>{{ totalPrice }}</span></h5>
    </div>
    <el-checkbox v-model="selectAll" :border=true>全选</el-checkbox>
    
    <template #footer>
      <el-button type="primary" :icon="FullScreen" circle size="large" @click="shopcart_full =!shopcart_full"></el-button>
      <el-button type="default" @click="showShoppingCart=false;">继续购物</el-button>
      <el-button type="danger" @click="deleteSelected">删除选中商品</el-button>
      <el-button type="primary" @click="checkout">结算</el-button>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { ref,onMounted,computed, watchEffect } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import {
  ShoppingCart,
  FullScreen
} from '@element-plus/icons-vue'
const shopcart_full=ref<boolean>(false)
import { useUserInfo } from '@/store/userinfor'
import { useCartStore } from '@/store/cartStore'
import{removeFromCart,updateCart,checkoutCart}from '@/api/shopcart'

import { storeToRefs } from 'pinia'

const {clearCart,getCartListData}= useCartStore()
const {cartItems}= storeToRefs(useCartStore())

const { fetchUserInfo } = useUserInfo()
const { userInfo } = storeToRefs(useUserInfo())

const go_center = () => {
  router.replace('/usercenter')
}
const login = () => {
  router.replace('/login')
};

const register = () => {
  router.replace('/regist')
};

const logout = () => {
  userInfo.value.isLogin = false;
  sessionStorage.removeItem('token')
  // 通过pinia清空本地清空，注意购物车仓库没有持久化存储
  clearCart()
  ElNotification({
    title: '成功',
    message: '退出成功',
    type: 'success',
    offset:100,
  });
};

// 购物车

interface CartItem {
  id: number;
  name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  selected: boolean;
}
const showShoppingCart = ref(false);
// const cartItems = ref<CartItem[]>([]);

const selectAll = computed({
  get: () => {
    return cartItems.value.length > 0 && cartItems.value.every(item => item.selected);
  },
  set: (value) => {
    cartItems.value.forEach(item => item.selected = value);
  }
});

const selectedItems = computed(() => {
  return cartItems.value.filter(item => item.selected);
});
const itemCount = computed(() => {
  return selectedItems.value.reduce((total, item) => total + item.quantity, 0);
});

const totalPrice = computed(() => {
  return selectedItems.value.reduce((total, item) => total + item.unit_price * item.quantity, 0);
});

const updateQuantity =async (row: CartItem) => {
  const {success,message}= await updateCart(row.id,row.quantity) as any
  if(success){
    ElMessage({type:'success',message:row.name+message+": "+row.quantity})
  }
  
};




const removeItem = async (row: CartItem) => {
  const index = cartItems.value.indexOf(row);
  if (index !== -1) {
    const selectedGameIds = [row.id];
    try {
      const response = await removeFromCart(selectedGameIds) as any;
      if (response.status) {
        ElNotification({
          title: '成功',
          message: response.message,
          type: 'success',
        });
        await getCartListData()
        // cartItems.splice(index, 1);
        
      }
    } catch (error) {
      console.error('删除购物车商品失败:', error);
      alert('删除购物车商品失败');
    }
  }
};

const deleteSelected = async () => {
 
  if (selectedItems.value.length === 0) {
    alert("请选择要删除的商品");
    return;
  }

  try {
    const response = await removeFromCart(selectedItems.value.map(item => item.id)) as any
    if (response.status) {
      console.log('删除购物车商品成功:', response);
      ElNotification({
        title: '成功',
        message: response.message,
        type: 'success',
      });
      getCartListData()
      
    }

  } catch (error) {
    console.error('删除购物车商品失败:', error);
    alert('删除购物车商品失败');
  }
};


const checkout =async () => {
  const {success,message}=await checkoutCart(selectedItems.value.map(item => item.id)) as any
  if(success){
    ElMessage({type:'success',message})
    getCartListData()
  }else{
    ElMessage({type:'error',message})
  }
};

// onBeforeMount(() => {
//   if(!sessionStorage.getItem('token')){
//     userInfo.isLogin = false;
//   }else{
//     userInfo.isLogin = true;
//   }
// });
   
watchEffect(() => {
  if(!sessionStorage.getItem('token')){
    userInfo.value.isLogin = false;
    clearCart()
  }else{
    userInfo.value.isLogin = true;
    fetchUserInfo()
  }
});

onMounted( () => {
  if(userInfo.value.isLogin){
   getCartListData()

  }
});
  
const router = useRouter();
const routeinfo = useRoute();

const isActive = (path: string) => {
	// console.log(path === route.path);
	return routeinfo.path === path;
};

const navigate = (path: string) => {
	// isActive(path);
	router.replace({
		path: path,
		
	})
	
};

</script>
  
<style scoped>
.nav-link{
  color: #ff6900;
}
.navbar-nav .nav-link.active {
  background-color:rgb(89, 255, 0);
  color: #000000;
  font-weight: bold;
  border-bottom: 3px solid #ff3366; /* 添加下划线 */
  padding-bottom: 5px; /* 调整下划线与文本之间的间距 */
}
.navbar-nav .nav-link.active:hover{
  color: #000000;
}
.navbar-nav .nav-link:hover {
  color: #15ff00;
  border-bottom: 1px solid #15ff00; /* 添加下划线 */
  cursor: pointer;
}

</style>

<!-- ../assets/static/logo.png -->
<style src="../assets/alibaba-iconfont.css"></style>
