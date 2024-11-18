<template>

<div>
      <!-- 如果是根路由展示下面内容 -->
      <el-container v-if="!$route.meta.admin">
        <el-header>
          <con_header></con_header> 
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
        <el-footer>
          <con_footer></con_footer> 
        </el-footer>
      </el-container>

<!-- 如果是admin路由不展示上面的con_header和con_footer组件-->
      <el-container v-else>
        <el-header>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
        <el-footer>
        </el-footer>
      </el-container>
      
  </div>  
 
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue';
import con_header from './components/con_header.vue';
import con_footer from './components/con_footer.vue';
import { useRouter } from 'vue-router';
// const isLoginPage = ref(false);

// const router = useRouter();
// // 路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     isLoginPage.value = true;
//   } else {
//     isLoginPage.value = false;
//   }
//   next();
// });

</script>

<!-- <script src="./assets/Mouse movement.js"></script>
<script id="xplayer" src="https://player.yy.mba/Static/player/player.js" key="6546357bf0b87" m = "1"></script> -->

<style scoped>

</style>
