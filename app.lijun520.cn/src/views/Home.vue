<template>
  <van-notice-bar left-icon="volume-o" text="欢迎使用手机端" scrollable />
  <van-swipe :autoplay="2000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in carouselUrl" :key="index">
      <img :src="item.url">
    </van-swipe-item>
  </van-swipe>
  <van-notice-bar left-icon="volume-o" text="热门游戏资讯 随心看！" scrollable />

  <ArticleList :tabList="tabList" :listState="listState" @onClickTab="onClickTab" 
             @onRefresh="onRefresh(activeTab)" :activeTab="activeTab"></ArticleList>
  
</template>
<script lang="ts" setup>
import ArticleList from "@/components/ArticleList.vue";
import {onMounted, reactive, ref} from "vue";
import {showLoadingToast, showSuccessToast} from "vant";

import {Get_articlelist} from '@/api/api_article';



// 文章列表数据
const listState = reactive({
  list: [],
  page: 1,
  count: 1,
  loading: true,
  finished: false,
  refreshing: false,
});
const activeTab= ref(0)
// Tab 标签分类名
const tabList = [
  {
    id: 0,
    name: '最新发布',
  },
  {
    id: 1,
    name: '最受欢迎',
  },
]
// 标签页排序关键词
let types = ['latest',  'popular',]
// 标签页点击切换
const onClickTab = (index:  number) => {

  activeTab.value = index
  listState.list = []
  let type = types[index]
  listState.loading = true
  articleData(type)
  
    
  
}

// const onLoad = () => {
// }

const onRefresh = (index: number) => {
  listState.loading = true
    if(index === 0){
      articleData('latest')
    }
    else if(index === 1){
      articleData('popular')
    }
    
    showSuccessToast('刷新成功');
    
  
}

// 获取文章列表数据
async function articleData(type:string) {
 
  const article_data = await Get_articlelist(type).then((response: any) => {
    return response
  })
  showLoadingToast({
      message: '加载成功',
      duration: 1000,
      forbidClick: true,
      loadingType: 'spinner',
    });
  console.log(article_data)
  listState.list = article_data.data
 
  listState.loading = false
}

onMounted(() => {
  
  articleData('latest')

})


// const articles = ref<Array<any>>([
//   {
//     title: '文章标题1',
//     cover: './img/Game-Carousel/ark.jpg',
//     abstract: '这是文章1的摘要内容，简要描述文章的主题和要点文明 达的啊是觉得啦简历是垃圾了都酥了到了沙龙的啦数据的垃圾的。'
//   },
//   {
//     title: '文章标题2',
//     cover: './img/Game-Carousel/gujian3-1.jpg',
//     abstract: '这是文章2的摘要内容，提供了更多关于主题的信息。'
//   },
// ]);

const carouselUrl = ref([
  {
    url: 'https://oss.lijun520.cn/Article-Carousel/taptap_main.png'
  },
  {
    url: 'https://oss.lijun520.cn/Article-Carousel/taptap_(1).png'
  },
  {
    url: 'https://oss.lijun520.cn/Article-Carousel/taptap_(2).png'
  },
  {
    url: 'https://oss.lijun520.cn/Article-Carousel/taptap_(3).png'
  },
  {
    url: 'https://oss.lijun520.cn/Article-Carousel/taptap_(4).png'
  },
  {
    url: 'https://oss.lijun520.cn/Article-Carousel/taptap_(5).png'
  }
])


</script>
<style scoped>

img {
  width: 100%;
  height: 100%;
}
</style>