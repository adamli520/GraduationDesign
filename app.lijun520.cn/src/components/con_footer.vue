<template>
  <van-tabbar v-model="active" placeholder  >
    <van-tabbar-item icon="wap-home" replace to="/home" name="home">主页</van-tabbar-item>
    <van-tabbar-item icon="shop" dot replace to="/game" name="game">游戏</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart" @click="handleTabbarClick('shopcart')" name="shopcart" :badge="cartItems.length">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager" @click="handleTabbarClick('user')" name="user">我的</van-tabbar-item>
  </van-tabbar>

    <!-- <van-tabbar v-model="active" placeholder route >
    <van-tabbar-item icon="wap-home" replace to="/home">主页</van-tabbar-item>
    <van-tabbar-item icon="hot-sale" dot replace to="/game">游戏</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart" replace to="/shopcart">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager" replace to="/userinfo">我的</van-tabbar-item>
  </van-tabbar> -->
</template>

<script setup lang="ts">
import { computed, ref,watch } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { showDialog  } from 'vant';
import { useUserInfo } from '@/store/userinfor';
import { useCartStore } from '@/store/cartStore';
import { storeToRefs } from 'pinia';
const {userInfo} = storeToRefs(useUserInfo())
const {cartItems} = storeToRefs(useCartStore())

const router = useRouter();
const route = useRoute();

// const active = computed(() => {
//   const pathParts = route.path.split('/');
//   return pathParts.length > 1 ? pathParts[1] : '';
// });  

// 使用watch监听路由变化，切换tabbar
// 监听路由变化，更新active值
const active = ref("");
watch(() => route.path, (newPath) => {
  const newPaths = newPath.split('/');
  active.value = newPaths.length > 1 ? newPaths[1] : '';
});

// const handleTabbarChange = (index: number) => {
//   if (index === 2 || index === 3) {
//     if (!userInfo.isLogin) {
//       showDialog({
//         title: '提示',
//         message: '请先登录',
//         theme: 'round-button',
//       }).then(() => {
//         router.push('/login'); // 跳转到登录页面
//       });
//     } else {
//       if (index === 2) {
//         router.push('/shopcart');
//         active.value = 2;
//       } else if (index===3) {
//         router.push('/userinfo');
//         active.value = 3;
//       }
//     }
//   }
// };

const handleTabbarClick = (type: string) => {
  if (!userInfo.value.isLogin) {
    showDialog({
      title: '提示',
      message: '请先登录',
      theme: 'round-button',
    }).then(() => {
      router.push('/login'); // 点击确认后跳转到登录界面
    });
  } else {
    switch (type) {
      case 'shopcart':
        router.replace('/shopcart');
        // active.value = "shopcart";
        break;
      case 'user':
        router.replace('/user');
        // active.value = "userinfo";
        break;
      default:
        break;
    }
  }
};
</script>
