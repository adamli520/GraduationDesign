<template>
    <van-cell title="自我介绍">
      <h4>Hello <span class="fw-bold">I'm AdamLi~</span></h4>
      <p class="text-muted mt-4 introduce-text text-justify">
        我叫李军，今年19岁，.。。。。。。。
      </p>
    </van-cell>
    <van-cell title="姓名" value="李军" />
    <van-cell title="邮箱" value="lj@lijun520.cn" />
    <van-cell title="地址" value="武汉软件工程职业学院" />
    <van-cell title="班级" value="软件2216" />
  <van-cell title="查看帅照"  is-link @click="imgPreview"></van-cell>
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      Github
    </van-divider>
  <van-swipe style="height: 200px;" vertical :autoplay="2000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in carouselUrl" :key="index">
        <img :src="item.url">
      </van-swipe-item>
  </van-swipe>
  <van-button style="margin-top: 1rem;" plain type="primary" url="https://github.com/adamli520" block>去我 GitHub</van-button>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      Slider 滑块
    </van-divider>
    <van-row justify="space-between" :gutter="[0, 20]">
      <van-col span="24" v-for="(item, index) in skills" :key="index">
        <van-cell :title="item.title" />
        <van-slider v-model="item.value" :max="100">
          <template #button>
            <div class="custom-button">{{ item.value }}</div>
          </template>
        </van-slider>
      </van-col>
    </van-row>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      Progress 进度条
    </van-divider>
    <van-space direction="vertical" fill :size="30">
      <van-progress :percentage="item.value" stroke-width="8" v-for="(item, index) in skills" :key="index" />
    </van-space>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      Circle 环形进度条
    </van-divider>
    
    <van-row >
    <van-col span="6" v-for="(item, index) in skills" :key="index" offset="4">
      <van-circle  v-model:current-rate="item.value" :rate="item.value"
        :speed="100" :text="item.title" />  
    </van-col>
  </van-row>
     
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      技术支持
    </van-divider>
    <van-button type="primary" url="https://app.lijun520.cn" block>app.lijun520.cn</van-button>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { showImagePreview } from 'vant';
  
  const carouselUrl = ref([
    {
      url: './picture/me.jpg'
    },
    {
      url: './picture/Mygithub.png'
    },
    {
      url: './picture/Q1.jpg'
    },
    {
      url: './picture/DSC_0053.jpg'
    }
  ])
  const imgPreview = () => {
    showImagePreview({
    images: [
      '/picture/DSC_0053.jpg',
    ],
    closeable: true,
  });
  }
  const skills = ref([
    { title: 'HTML', value: 80 },
    { title: 'TypeScript', value: 65 },
    { title: 'Node.js全栈', value: 85 },
    { title: 'Vue.js', value: 70 }
  ]);
  </script>
  
  <style scoped>
    .custom-button {
      width: 26px;
      color: #fff;
      font-size: 10px;
      line-height: 18px;
      text-align: center;
      background-color: var(--van-primary-color);
      border-radius: 100px;
    }
    img {
    width: 100%;
    height: 100%;
  }
  
  </style>
  