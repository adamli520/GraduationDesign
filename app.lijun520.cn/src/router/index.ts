//定义路由
import { createRouter, createWebHistory } from 'vue-router' 


// import { showDialog } from 'vant';
// import { useUserInfo } from '@/store/userinfor';
// const userInfoStore = useUserInfo();
// const userInfo = userInfoStore.userInfo;


const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/home',
        name: 'home',
        meta: { title: "主页" },
        component: ()=>import("@/views/Home.vue")
      },
      {
        path: '/',
        redirect: '/game'
      },
      {
        path: '/login',
        name: 'login',
        meta: { title: "登录" },
        component: ()=>import("@/views/login.vue")
      },
      {
        path: '/regist',
        name: 'regist',
        meta: { title: "注册" },
        component: ()=>(import("@/views/regist.vue"))
      },
        {
        path: '/user',
        name: 'user',
        meta: { title: "用户信息",requiresAuth: true },
        component: ()=>import("@/views/userinfo.vue"),
      },
      {
        name: 'order',
        path: '/order', 
        meta: { title: "查看订单" },
        component:()=>(import("@/views/order.vue"))
      },
      {
        path: '/about',
        name: 'about',
        meta: { title: "关于",},
        component: ()=>import("@/views/about.vue"),
      },
      {
        name: 'feedback',
        path: '/feedback', 
        meta: { title: "反馈",},
        component:()=>(import("@/views/feedback.vue"))
      },
      {
        name: 'article',
        path: '/article/:id(\\d*)', 
        meta: { title: "文章",},
        component:()=>(import("@/views/article_details.vue"))
      },
      {
        path: '/game',
        name: 'game',
        meta: { title: "游戏" },
        component: ()=>import("@/views/game.vue"),
        // children: [
        //   {
        //     name: 'default',
        //     path: '', 
        //     redirect: { name: 'categorize' } 
        //   },
        //   {
        //     path: 'categorize',
        //     name: 'categorize',
        //     meta: { title: "游戏分类" },
        //     component: ()=>import("@/views/game_categorize.vue")
        //   },
        //   {
        //     path: 'recommend',
        //     name: 'recommend',
        //     meta: { title: "游戏推荐" },
        //     component: ()=>import("@/views/game_recommend.vue")
        //   }
        // ]
      },
      {
        path: '/shopcart',
        name: 'shopcart',
        meta: { title: "购物车",requiresAuth: true },
        component: ()=>import("@/views/shopcart.vue")
      },
      {
        path: "/:path(.*)",
        name: "404",
        meta: { title: "没找到页面" },
        component: () => import("@/views/404.vue"),
      }
         
    ]
  })
  
  router.afterEach((to, from) => {
    if (to.meta.title && typeof to.meta.title === 'string') {
      document.title = to.meta.title;
    } 
  });

  
  // router.beforeEach((to, from, next) => {
  //   if (to.meta.requiresAuth && !userInfo.isLogin) {
  //     showDialog({
  //       title: '提示',
  //       message: '请先登录',
  //       theme: 'round-button',
  //     }).then(() => {
  //       next('/login'); // 跳转到登录页面
  //     });
  //   } else {
  //     next(); // 继续路由导航
  //   }
  // });
  
  export default router