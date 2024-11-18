<!--内容详情页-->
<template>
     
  <el-container class="container">
    <el-aside width="200px">
      <el-affix :offset="250">
      <el-collapse >
        <el-collapse-item title="目录">
          <MdCatalog
            @on-click="Catalog_click"
            :scrollElementOffsetTop="100"
            :editorId="state.id"
            :scrollElement="scrollElement"
            v-if="state.catalogList.length > 0"
          />
          <el-empty v-else description="本篇文章暂无目录" />
        </el-collapse-item>
      </el-collapse>
    </el-affix>
    </el-aside>
    <el-main>
      <el-skeleton
            :loading="loading"
            style="width: 100%"
            :rows="10" 
          >
      <el-card class="article-detail-card" shadow="hover">
        <template #header>
         
            <h1>{{ detail.title }}</h1>
          
        </template>
        <div class="article-info">
          <el-row justify="center">
              <el-col :span="3">
                <el-tag type="primary" round size="large"><el-icon><Grid /></el-icon>{{ detail.category_name }}</el-tag>
              </el-col>
              <el-col :span="7">
                <el-tag type="success"round size="large"><el-icon><Timer /></el-icon> {{ detail.updated_at }}</el-tag>
              </el-col>
              <el-col :span="3">
                <el-tag type="warning" round size="large"><el-icon><View /></el-icon> {{ detail.views }}</el-tag>
              </el-col>
              <el-col :span="3">
                <el-tag type="danger" round size="large"><el-icon><Star /></el-icon> {{ detail.likes }}</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag type="primary"round size="large"><el-icon><User /></el-icon> {{ detail.author_name }}</el-tag>
              </el-col>
            </el-row>
            <el-divider></el-divider>
        </div>
        <div class="article-body">
          <MdPreview
            :editorId="state.id"
            v-model="detail.content"
            previewTheme="default"
            @onGetCatalog="onGetCatalog"
          />
        </div>
      </el-card>
    </el-skeleton>
    </el-main>
  </el-container>

  <el-backtop :right="350" :bottom="150" ><el-icon :size="30" ><Top /></el-icon></el-backtop>
  </template>
  
  <script setup lang="ts">
  import { Get_articledetail } from "@/api/api_article";
  import {  onMounted, reactive, ref } from "vue";
  import {Grid,Timer,View,Star,User,Top } from '@element-plus/icons-vue'

  import {  onBeforeRouteUpdate, useRouter } from "vue-router";
  
  import { MdPreview, MdCatalog } from 'md-editor-v3';
  import 'md-editor-v3/lib/preview.css';
import { ElLoading } from "element-plus";
  const showfloatingpanel = ref(true);
  const height_floatingpanel = ref(500);
  const icon_Catalog = ref('bars');
  
  const click_floatingbubble = () => {
    height_floatingpanel.value = 500;
    icon_Catalog.value = showfloatingpanel.value ? 'bars' : 'cross';
    showfloatingpanel.value = !showfloatingpanel.value;
  }
  
  
  interface ArticleDetail {
    title?: string;
    updated_at?: string;
    views?: number;
    likes?: number;
    author_name?: string;
    category_name?: string;
    content?: string;
  }
  
  
  
  const state = reactive({
    id: 'my-editor',
    text: '',
    catalogList: []
  });
  const scrollElement = document.documentElement;
  const Catalog_click= () => {
    // icon_Catalog.value = showfloatingpanel.value ? 'bars' : 'cross';
    // showfloatingpanel.value = !showfloatingpanel.value;
  }
  
  const onGetCatalog = (list :any) => {
    state.catalogList = list;
    
  };
  const router = useRouter();
   // 文章ID
   const DetailID = ref()
    // 骨架屏默认显示
    const loading = ref(true);
  
  onMounted(async () => {
    window.scrollTo({ top: 0 })
    DetailID.value = router.currentRoute.value.params.id
    await getDetail(DetailID.value)
    
  })
  
  // onBeforeRouteUpdate(async (to) => {
  //   window.scrollTo({ top: 0 })
  //   DetailID.value = to.params.id
  //   await getDetail(DetailID.value)
  // });
  
    
  
  const detail = reactive<ArticleDetail>({});
  
  // 获取文章内容详情
  async function getDetail(DetailID :number) {
    const Elloading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    Elloading.close()
  }, 1000)
    const {data} = await Get_articledetail(DetailID) as any
    Object.assign(detail, data)
    loading.value = false
  }
  
  
  
  
  </script>
  
  <style scoped>
  .container{
    margin-top: 80px;
  }
  .article-detail-card {
    text-align: center;
  width: 800px;
  margin: 0 auto;
}
.article-info {
  margin-bottom: 20px;
}
  </style>