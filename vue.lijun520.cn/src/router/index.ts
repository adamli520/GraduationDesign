// 定义路由
import { createRouter, createWebHistory } from 'vue-router'

import login from '@/views/login.vue'
import Phone from '@/views/Phone.vue'
import Home from '@/views/Home.vue'
import game from '@/views/game.vue'
import regist from '@/views/regist.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: { title: "武软李军-主页" },
      component: Home
    },
    {
      path: '/',
      redirect: '/game'
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: "登录" },
      component: login
    },
    {
      path: '/regist',
      name: 'regist',
      meta: { title: "注册" },
      component: regist
    },
    {
      name: 'article',
      path: '/article/:id(\\d*)', 
      meta: { title: "文章",},
      component:()=>(import("@/views/article_details.vue"))
    },
    {
      path: '/about',
      name: 'about',
      meta: { title: "关于",},
      component: ()=>import("@/views/about.vue"),
    },
    {
      path: '/support',
      name: 'support',
      meta: { title: "武软李军-技术支持" },
      component: ()=>(import("@/views/support.vue"))
    },
    // {
    //   path: '/Person',
    //   name: 'Person',
    //   component: Person
    // },
    {
      path: '/game',
      component: game,
      meta: {
        fetchData: true,
        title: "武软李军-游戏", 
      },
    },
    {
      path: '/usercenter',
      component: () => import("@/views/user_center.vue"),
      meta: {
        title: "用户中心", 
      },
    },
    {
      path: "/:path(.*)",
      name: "404",
      meta: { title: "没找到页面" },
      component: () => import("@/views/404.vue"),
    },      
  ]
})

router.afterEach((to, from) => {
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title;
  } 
});

export default router
