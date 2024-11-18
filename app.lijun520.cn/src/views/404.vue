<template>
    <!-- 网络错误 -->
    <van-empty image="network" description="没有找到该页面" >
      
        <van-button round :loading="loading" loading-type="spinner" loading-text="正在返回" type="primary" class="bottom-button" @click="goBack">返回</van-button>
    </van-empty>

</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';  
import { showNotify } from 'vant';  
import { ref } from 'vue';
  // 使用Vue Router的useRouter钩子来获取router实例  
  const router = useRouter();  
  const loading = ref(false); 

  // 定义返回上一个页面的函数  
  const goBack = () => {
    loading.value = true;
    setTimeout(() => {  
      loading.value = false;
      router.go(-1); // 使用router.go(-1)来返回上一个页面  
    showNotify({ type: 'success', message: '返回成功' });
    }, 2000);  
   
  };  

</script>
<style scoped>
 .bottom-button {
    width: 160px;
    height: 40px;
  }
</style>