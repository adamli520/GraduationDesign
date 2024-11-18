<template>

  <el-container>
    <el-main>
      <el-row :gutter="130" justify="center">
        <el-col :span="10" v-for="(article, index) in listState.list" :key="index">
          <el-card class="article-card" shadow="hover" @click="toDetail(article.id)">
            <template #header>
              <el-tag type="primary" class="header-tag">{{ article.category_name }}</el-tag>
              <img :src="article.thumbnail" class="header-img"/>
              
            </template>
            <h5 style="text-align: center;">{{ article.title }}</h5>
            <el-divider></el-divider>
            <p style="text-align: center;">{{ article.summary }}</p>

            <template #footer>
              <el-space>
                <el-tag type="success" size="large"><el-icon>
                    <Timer />
                  </el-icon> {{ article.updated_at }}</el-tag>
                <el-tag type="warning" size="large"><el-icon>
                    <View />
                  </el-icon> {{ article.views }}</el-tag>
                <el-tag type="danger" size="large"><el-icon>
                    <Star />
                  </el-icon> {{ article.likes }}</el-tag>
                <el-tag type="primary" size="large"><el-icon>
                    <User />
                  </el-icon> {{ article.author_name }}</el-tag>
              
              </el-space>
  
              
            </template>

          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>



</template>
  
  <script lang="ts" setup>
  // import {Get_articlelist} from '@/api/api_article';
  import { ref, onMounted, reactive } from 'vue';
 import {Timer,View,Star,User } from '@element-plus/icons-vue'
 import {useRouter} from "vue-router";

interface TabItem {  
  name: string;  
  id:  number; 
}
const props = defineProps({
  // 加载中动画

  // 标签栏列表
  tabList: {
    type: Array as () => TabItem[],
    required: false,
    default: [] 
  },
  // 内容列表
  listState: {
    type: Object,
    required: true,
    default: {}
  },
  // 当前激活的标签ID
  activeTab: {
    type: Number,
    required: false,
    default: 0
  }
})
const emit = defineEmits(['onRefresh',])
const router = useRouter()
const internalValue = ref(props.activeTab)

// 标签页点击切换事件
// const onClickTab = ({name}:TabItem) => {
//   emit('onClickTab', name)
// }
// 数据刷新事件
const onRefresh = () => {
 
  emit('onRefresh')
 
};
// 加载下一页数据事件
// const onLoad = () => {
//   console.log("子组件触发加载下一页了")
//   emit('onLoad')
// };
// 点击查看文章详情
const toDetail = (id: any) => {
  router.push({path: `/article/${id}`})
}

      // 示例数据
      // const articles = reactive([
      //   {
      //     id: 1,
      //     title: '文章标题 1',
      //     thumbnail: 'https://example.com/image1.jpg',
      //     summary: '文章摘要 1',
      //     updated_at: '2024-11-09',
      //     views: 100,
      //     likes: 50,
      //     author_name: '作者 1'
      //   },
        
      // ]);
  

 
  </script>
  
  <style scoped>
  .header-tag {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.header-img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
    transition: all 0.3s ease; /* 添加过渡效果，当属性变化时平滑过渡 */
  }
  .header-img:hover {
    transform: scale(1.1); /* 鼠标悬停时放大图片 */
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.9); /* 添加阴影效果 */
}


  .article-card {
    width: 100%;
    height: 550px;
    margin-bottom: 20px;
    position: relative;
    transition: all 0.3s ease; 
  }
  .article-card:hover {
  transform: translateY(-5px); 
}





</style>