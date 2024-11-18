<template>
  <van-tabs :active="activeTab" type="card" @click-tab="onClickTab" animated>
    <van-tab v-for="(item,index) in tabList" :key="index" :title="item.name" :name="item.id">
      <van-divider />

      <van-pull-refresh v-model="listState.loading" success-text="刷新成功" loading-text="加载中..." @refresh="onRefresh">

          <van-list  finished-text="我是有底线的" :immediate-check=false>
            <van-card :title=article.title :tag=article.category_name v-for="(article,index) in listState.list"
              :key="index" @click="toDetail(article.id)">
              <template #thumb>
                <img :src="article.thumbnail"  v-lazy="article.thumbnail"></img>
              </template>
              <template #desc>
                {{ article.summary }}
              </template>
              <template #tags>
                <van-divider></van-divider>
                <van-icon name="clock-o">{{ article.updated_at }}</van-icon>

              </template>
              <template #bottom class="footer-container">

                <van-icon name="eye-o">{{article.views}} </van-icon>
                <van-icon name="good-job-o">{{ article.likes }}</van-icon>

              </template>
              <template #footer>
                <van-tag plain type="primary" size="large"><van-icon name="user">{{ article.author_name
                    }}</van-icon></van-tag>

              </template>
            </van-card>
          </van-list>
        
        </van-pull-refresh>
     
    </van-tab>
  </van-tabs>
  <van-back-top right="10vw" bottom="10vh" />
</template>
<script lang="ts" setup>

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
    required: true,
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
const emit = defineEmits(['onRefresh', 'onClickTab'])
const router = useRouter()

// 标签页点击切换事件
const onClickTab = ({name}:TabItem) => {
  emit('onClickTab', name)
}
// 数据刷新事件
const onRefresh = () => {
 
  emit('onRefresh')
  // props.listState.loading = false
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





</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>