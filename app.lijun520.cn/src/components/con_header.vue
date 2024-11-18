<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow fixed placeholder @click-left="onClickLeft" @click-right="onClickRight">
    <template #right>
      <van-button type="primary" round icon="user-circle-o" plain :disabled="!userInfo.isLogin">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="1000"
    :touchable="false"
    :show-indicators="false"
  >
  <van-swipe-item>{{ userInfo.isLogin ? "欢迎":"当前"  }}</van-swipe-item>
  <van-swipe-item>{{ userInfo.isLogin ? userInfo.data.account : "未登录" }}</van-swipe-item>
  </van-swipe>
</van-button>
    </template>
  </van-nav-bar>

</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '@/store/userinfor';
import { useRouter } from 'vue-router';

const router = useRouter();
const {userInfo} = storeToRefs(useUserInfo())

import { useRoute } from 'vue-router';
const title = ref(''); 

const route = useRoute();

const onClickLeft = () => history.back();
const onClickRight = () => {
  router.replace({ path: '/user' });
}
// 监听路由变化
watch(() => route.meta.title as string, (newTitle) => {
  title.value = newTitle || '默认标题'; // 如果路由没有设置title，则使用默认标题
});

// 初始化页面标题
onMounted(() => { 
  title.value = route.meta.title as string || '默认标题'; // 初始化页面标题
});



</script>
<style scoped>
 .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
  </style>