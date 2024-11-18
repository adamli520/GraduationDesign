<template>
  <van-notice-bar left-icon="volume-o" text="热门游戏大甩卖！！" scrollable/>

  <van-swipe :autoplay="2000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in carouselUrl" :key="index">
      <img :src="item.url">
    </van-swipe-item>
  </van-swipe>

  <!-- <van-notice-bar
  left-icon="volume-o"
  text="点击图片可查看详情！！！"
  scrollable
  vertical
/> -->

<van-notice-bar left-icon="volume-o" :scrollable="false">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="2000"
    :touchable="false"
    :show-indicators="false"
  >
    <van-swipe-item>记得登录哦 (⊙o⊙)！</van-swipe-item>
    <van-swipe-item>点击图片可查看详情！！！</van-swipe-item>
  </van-swipe>
</van-notice-bar>
  
  <van-tabs v-model:active="active" type="card" animated @click-tab="onClickTab"  >
    <van-tab title="热门"   name="recommend" >
      <van-divider />
      <game_list :filtered-games="randomGames" @onRefresh="onRefresh('recommend')" :loading="loading">
        
      </game_list>
    </van-tab>
    <van-tab title="分类"   name="categorize" >
      <van-divider />
      <van-row>
    <van-col span="6">
      <van-sidebar v-model="sidebar_active">
        <van-sidebar-item v-for="(category, index) in categories" :key="index" :title="category"
          @click="filterGamesByCategory(category)" :badge="getBadge(category)" />
      </van-sidebar>
    </van-col>
    <van-col span="18">
      <game_list :filteredGames="filteredGames" @onRefresh="onRefresh('categorize')"  :disabled="disabled">
        
      </game_list>
    </van-col>
  </van-row>
  
    </van-tab>
  </van-tabs>

</template>
<script lang="ts" setup>
import game_list from "@/components/game_list.vue";
import { ref,onMounted,provide, onUpdated } from 'vue'
import { showLoadingToast, showSuccessToast } from 'vant';
import {gameinit} from '@/api/api_game'
const loading = ref<boolean>(true);
const sidebar_active = ref(0);

interface Game {
  id: number;
  name: string;
  image_url: string;
  developer: string;
  publisher: string;
  category: string;
  original_price: string;
  sale_price: string;
}
const disabled = ref(true);
const active = ref("recommend");
const onClickTab =  ({ name }: { name: string }) => {
    onRefresh(name);    
}

async function onRefresh(name: string) {
  const storedGameData = sessionStorage.getItem('gameData');
  if (storedGameData) {
    const parsedData = JSON.parse(storedGameData) as Game[];
    loading.value = false;
    if (name === "recommend") {
      randomGames.value = parsedData.sort(() => 0.5 - Math.random()).slice(0, 5); // 随机取出5条数据
      
    } else if(name==="categorize"){
      const uniqueCategories = Array.from(new Set(parsedData.map((game: Game) => game.category)));
      categories.value = uniqueCategories;
      AllGameData.value = parsedData;
      filterGamesByCategory(categories.value[0])
      
    }
    
   
 }  
 else {
    await LoadGameData();
  }
}
const randomGames = ref<Game[]>([]);


onMounted( async () => {
  await LoadGameData();
  onRefresh("recommend");
});


const AllGameData = ref<Game[]>([]);
const categories = ref<string[]>([]);
const filteredGames = ref<Game[]>([]);


const filterGamesByCategory = (category: string) => {
  sidebar_active.value = categories.value.indexOf(category);
  filteredGames.value = AllGameData.value.filter((game: Game) => game.category === category);
};
const getBadge = (category: string) => {
  return AllGameData.value.filter((game: Game) => game.category === category).length;
};

// 加载游戏数据
async function LoadGameData() {
	try {
    const response = await gameinit() as any
		if (response.status) {
			sessionStorage.setItem('gameData', JSON.stringify(response.data));
      loading.value = false; 
      showLoadingToast({
        message: '加载成功...',
        duration: 1000,
        forbidClick: true,
        loadingType: 'spinner',
      });
		} else {
			console.log('请求游戏数据失败');
      
		}
	} catch (error) {
		console.log('初始化游戏请求失败: ' + error);
	}
}




const carouselUrl = ref([
  {
    url: './img/Game-Carousel/ark.jpg'
  },
  {
    url: './img/Game-Carousel/gujian3-1.jpg'
  },
  {
    url: './img/Game-Carousel/xianjian7-1.jpg'
  },
  {
    url: './img/Game-Carousel/pubg-1.jpg'
  }
])


</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
.notice-swipe {
    height: 40px;
    line-height: 40px;
    margin-left: 80px;
  }
</style>