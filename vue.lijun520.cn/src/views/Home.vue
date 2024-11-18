<template>
  <div class="container mt-5">

    <el-row>
      <el-col :span="24">
        <el-alert title="欢迎使用手机端" icon="el-icon-volume-mute" type="info" effect="light" />
      </el-col>
      <el-col :span="24">
        <el-carousel :interval="2000" type="card" height="400px">
          <el-carousel-item v-for="(item, index) in carouselUrl" :key="index">
            <img :src="item.url" alt="carousel-image" style="width: 100%; height: 100%;" />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="24">
        <el-alert title="热门游戏资讯 随心看！" icon="el-icon-volume-mute" type="info" effect="light" />
      </el-col>
    </el-row>
  </div>

  <div class="container mt-5">
    <el-tabs type="border-card" class="demo-tabs" @tab-change="onClickTab" v-model="activeTab">
      <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.name" :name="item.id">
        <ArticleList :listState="listState"></ArticleList>
      </el-tab-pane>
    </el-tabs>
  </div>

  <el-backtop :right="350" :bottom="100" ><el-icon :size="30" ><Top /></el-icon></el-backtop>

</template>
  
  <script lang="ts" setup>
 import {Get_articlelist} from '@/api/api_article';
 import {  onMounted, ref,reactive } from 'vue';
 import ArticleList from "@/components/ArticleList.vue";
  import {Top } from '@element-plus/icons-vue'
  const activeTab= ref(0)
  // 标签页排序关键词
let types = ['latest',  'popular',]
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
  // 文章列表数据
  const listState = reactive({
  list: [],
  page: 1,
  count: 1,
  loading: true,
  finished: false,
  refreshing: false,
});
const onClickTab = (index:  number) => {
console.log(index)
activeTab.value = index
listState.list = []
let type = types[index]
listState.loading = true
articleData(type)

}

// const onRefresh = (index: number) => {
//   listState.loading = true
//     if(index === 0){
//       articleData('latest')
//     }
//     else if(index === 1){
//       articleData('popular')
//     }
// }
// 获取文章列表数据
async function articleData(type:string) {
 
 const article_data = await Get_articlelist(type).then((response: any) => {
   return response
 })
 
 console.log(article_data)
 listState.list = article_data.data

 listState.loading = false
}
 
onMounted(() => {
  
  articleData('latest')

})
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
/* .demo-tabs {
  width: 100%;
  margin: 0 auto;
} */
  </style>