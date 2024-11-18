<template>

<van-notice-bar left-icon="volume-o" :scrollable="false">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="2000"
    :touchable="false"
    :show-indicators="false"
  >
    <van-swipe-item>你的声音！</van-swipe-item>
    <van-swipe-item>我能听见！</van-swipe-item>
    <van-swipe-item>感谢反馈！！！</van-swipe-item>
  </van-swipe>
</van-notice-bar>

<van-divider />

<van-barrage v-model="list">
  <div class="video" style="width: 100%; height: 250px"></div>
</van-barrage>
<van-space style="margin-top: 10px">
  <van-button @click="add" type="primary" size="small"> 弹幕 </van-button>
</van-space>
</template>

<script setup lang="ts">
import type {  BarrageItem } from 'vant';
import { getUserFeedback } from '@/api/userinfor'
import { ref, onMounted } from 'vue';
const defaultList = [
  { id: 100, text: '轻量' },
  { id: 101, text: '可定制的' },
  { id: 102, text: '移动端' },
  { id: 103, text: 'Vue' },
  { id: 104, text: '组件库' },
  { id: 105, text: 'VantUI' },
  { id: 106, text: '666' },
];

// 用于存储用户反馈数据的响应式数据
const feedbackList = ref<BarrageItem[]>();

const initFeedbackList = async () => {
  try {
    const response = await getUserFeedback() as any;
    if (response.success) {
      const newList = response.data.map((item: { id: any; content: any; }) => ({
          id: item.id,
          text: item.content
        }));
        list.value = newList;
    }
  } catch (error) {
    console.error('获取用户反馈数据出错:', error);
  }
};

const list = ref<BarrageItem[]>([...feedbackList.value || [] ]);
const add = () => {
  list.value.push({ id: Math.random(), text: 'Barrage' });
};

onMounted(() => {
  initFeedbackList()
})

</script>

<style scoped>
  .notice-swipe {
    height: 40px;
    line-height: 40px;
    margin-left: 30px;
  }
</style>