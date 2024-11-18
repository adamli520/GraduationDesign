<template>

  <div class="container-fluid mt-5">

    <el-carousel :interval="2000" type="card" height="400px">
      <el-carousel-item v-for="(item, index) in carouselItems" :key="index">
        <img :src="item.image" alt="carousel-image" style="width: 100%; height: 100%;" />
      </el-carousel-item>
    </el-carousel>

  </div>

  <div class="container mt-4">
    <h2 class="text-center text-danger">提示！</h2>
    <el-alert title="点击游戏图片,鼠标滚轮可以缩放！" description="More text description" type="warning" center show-icon
      :closable="true">
      <template #close>
        <el-button type="text">
          <el-icon name="icon-ziyuan" style="font-size: 30px;"></el-icon>
        </el-button>
      </template>
    </el-alert>
  </div>

  <!-- 筛选组件 -->
  <div class="container mt-4">
    <div class="row justify-content-center mb-4">
      <div class="col-md-4">
        <el-select v-model="selectedTypes" multiple clearable collapse-tags placeholder="请选择游戏类型" :max-collapse-tags="4"
          style="width: 400px">
          <template #header>
            <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">
              全选
            </el-checkbox>
          </template>
          <el-option v-for="item in gameTypes" :key="item" :label="item" :value="item" />
        </el-select>
      </div>

      <div class="col-md-8 col-lg-6">
        <div class="row">
          <div class="col-md-5 col-lg-4 mb-2 mb-md-0">
            <el-input-number v-model="minPrice" controls-position="right" :min="0" :max="100" :step="1"
              placeholder="最低价"></el-input-number>
          </div>

          <div class="col-md-5 col-lg-4 mb-2 mb-md-0">
            <el-input-number v-model="maxPrice" controls-position="right" :min="0" :max="100" :step="1"
              placeholder="最高价"></el-input-number>
          </div>

          <div class="col-md-2 col-lg-4">
            <el-button type="primary" @click="filterGames">筛选</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 text-center">
        共筛选出 <span>{{ filteredCount }}</span> 项商品
      </div>
    </div>
  </div>

  <!-- 游戏数据 -->
  <div class="container-fluid">
    <div class="row" v-if="currentPageGames">
      <div v-for="game in currentPageGames" :key="game.id" class="col-md-3 mt-4">
        <div class="card bg-game" :data-game-id="game.id">
          <img class="card-img-top game-image" :alt="game.name" :src="game.image_url"/>
          <div class="card-body">
            <h5 class="card-title text-center game-name">{{ game.name }}</h5>
            <ul class="list-unstyled text-muted game-info">
              <li>开发商: <span class="text-primary">{{ game.developer }}</span></li>
              <li>发行商: <span class="text-primary">{{ game.publisher }}</span></li>
              <li>类别: <span class="text-info">{{ game.category }}</span></li>
            </ul>
            <div class="d-flex justify-content-between align-items-center">
              <del class="text-secondary h5">￥{{ game.original_price }}</del>
              <span class="text-danger h3 game-price">￥{{ parseFloat(game.sale_price).toFixed(2) }}</span>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" type="button" @click="btn_addToCart(game.id)">
            加入购物车
            </button>
            <button class="btn btn-outline-primary float-end" href="#" @click="btn_detail(game.id)">查询更多</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="showgameDetailModal"
    title="游戏详情"
    width="30%"
    center
  >
     <p>游戏名称: {{gameDetails.name}}</p>
     <p>开发商: {{ gameDetails.developer }}</p>
    <p>发行商: {{ gameDetails.publisher }}</p>
    <el-divider />
    <p>{{ gameDetails.description }}</p>
    <el-divider />
    <p>{{ gameDetails.reviews }}</p>
    <template #footer>
      <el-button type="primary" @click="showgameDetailModal = false">确定</el-button>
    </template>
  </el-dialog>

  <div class="container mt-3 d-flex justify-content-center">

    <el-pagination background layout="prev, pager, next,jumper,total" :page-count="page_computed"
      :current-page="currentPage" :page-size="pageSize" :total="totalComputed" @current-change="handleCurrentPageChange"
      @size-change="handlePageSizeChange"></el-pagination>

  </div>


  <!-- 超大屏幕 -->
	<div class="container bg-game mt-4">
		<div class="jumbotron text-center">
			<h4>徽章测试</h4>
			<h5 class="mb-2">支持平台：</h5>
			<h3>QQ:&nbsp;<span class="badge badge-pill bg-primary">2822576659</span></h3>
			<h3>STEAM:&nbsp;<span class="badge badge-pill bg-dark">1013787052</span></h3>
			<h3>EPIC:&nbsp;<span class="badge badge-pill bg-danger">ljgames09</span></h3>
			<h3>ORIGIN:&nbsp;<span class="badge badge-pill bg-success">ljgames09</span></h3>
			<h3>R星:&nbsp;<span class="badge badge-pill bg-warning">ljgames09</span></h3>
		</div>
	</div>
	<!-- 反馈建议 -->
	<div class="container bg-white p-3">
    <div class="row">
        <div class="col-md text-center">
            <h3>建议</h3>
            <p class="font-italic">谢谢你的建议</p>
        </div>
    </div>
    <div class="row py-3">
        <div class="col-md-12">
            <form class="px-5 needs-validation" novalidate>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="feedback-name" class="form-label">名字</label>
                        <input type="text" class="form-control bg-warning" id="feedback-name" placeholder="名字" required>
                        <div class="invalid-feedback">请输入名字</div>
                    </div>
                    <div class="col-md-6">
                        <label for="feedback-email" class="form-label">邮箱</label>
                        <input type="email" class="form-control bg-warning" id="feedback-email" placeholder="邮箱" required>
                        <div class="invalid-feedback">请输入有效的邮箱地址</div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="feedback-text" class="form-label">建议内容</label>
                    <textarea class="form-control bg-warning" id="feedback-text" placeholder="建议内容" required></textarea>
                    <div class="invalid-feedback">请输入建议内容</div>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary float-end" id="Btn-feedback-send">发送</button>
                </div>
            </form>
        </div>
    </div>
</div>

  <!-- 回到顶部 -->
  <el-backtop :right="100" :bottom="100" />

</template>

<script setup lang="ts">
import { ref,watch,onMounted, computed } from 'vue';
// import { ElNotification } from 'element-plus';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

import{gameinit,gamedetail}from '@/api/api_game'
import{addToCart,getCartList}from '@/api/shopcart'
import type { CheckboxValueType } from 'element-plus'
import router from '@/router';
import { useUserInfo } from '@/store/userinfor'
import { useCartStore } from '@/store/cartStore';

const { userInfo } = useUserInfo()
const {getCartListData}= useCartStore()

interface Game {
  id: number;
  name: string;
  image_url: string;
  developer: string;
  publisher: string;
  category: string;
  original_price: string;
  sale_price: number;
}
// interface GameDetail extends Omit<Game, 'image_url' | 'category' | 'original_price' | 'sale_price'> {
//   description: string;
//   reviews: string;
// }
const showgameDetailModal = ref(false);
const gameDetails = ref({
  id: 0,
  name: '',
  developer: '',
  publisher: '',
  description: '',
  reviews: ''
});
const btn_detail = async (id: number) => {
  const {success,data} = await gamedetail(id) as any
  if (success) {
    // 打开详情模态框
    ElMessage({type: 'success',message: data.name+": 查询详情成功"})
    showgameDetailModal.value = true;
    gameDetails.value = data;

    // gameDetails.value = {
    //   id: data.id,
    //   name: data.name,
    //   developer: data.developer,
    //   publisher: data.publisher,
    //   description: data.description,
    //   reviews: data.reviews
    // };
  }

}
// 添加到购物车
const btn_addToCart = async (id: number) => {
  if(!userInfo.isLogin){
    ElMessageBox({
      title: '提示',
      message: '请先登录',
      type: 'warning',
      callback: () => {
        router.replace('/login')
      }
    })

    return
  }
  console.log("当前游戏id" + id)
  const res = await addToCart(id, 1) as any
  console.log(res.data)
  const {success,message} =res

  if (success) {
    ElNotification({
      title: '提示',
      message: message,
      offset: 100,
      type: 'success'
    })
  
    getCartListData()
  }else{
    ElMessage.error({
      message: message,
      type: 'error'
    })
  }
}
// 轮播图组件
const carouselItems = ref([
      { image: '/img/Game-Carousel/pubg-1.jpg' },
      { image: '/img/Game-Carousel/ark.jpg' },
      { image: '/img/Game-Carousel/gujian3-1.jpg' },
      { image: '/img/Game-Carousel/xianjian7-1.jpg' }
    ]);

// 评分组件
// const v1 = ref(2);

const selectedTypes = ref<CheckboxValueType[]>([])
const gameTypes = ref<string[]>([]);


const checkAll = ref(false)
const indeterminate = ref(false)

watch(selectedTypes, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === gameTypes.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})

const handleCheckAll = (val: CheckboxValueType) => {
  indeterminate.value = false
  if (val) {
    selectedTypes.value = gameTypes.value.map((_) => _)
  } else {
    selectedTypes.value = []
  }
}


// 游戏类型筛选
const minPrice = ref(0);
const maxPrice = ref(100);
const filteredCount = ref(46); 

const filterGames = () => {

  const filteredGames = gameData.value.filter((game: Game) => {
    const typeMatch = selectedTypes.value.length === 0 || selectedTypes.value.includes(game.category)
    const priceMatch = game.sale_price >= minPrice.value && game.sale_price <= maxPrice.value
    console.log(typeMatch,priceMatch)
    return typeMatch && priceMatch
  })
  currentPageGames.value = [...filteredGames]
  filteredCount.value = filteredGames.length

  if (filteredGames.length > 0) {
    ElMessage({
      showClose: true,
      message: '筛选成功',
      type: 'success',
      center: true,
    })
  }
};

const gameData = ref<Game[]>([]);
const currentPage = ref(1);
const pageSize = ref(8);
const currentPageGames = ref<Array<any>>([]);
const totalComputed = computed(() => gameData.value.length);
const page_computed= computed(() => Math.ceil((gameData.value?.length || 0) / pageSize.value));
const handlePageChange = (page: number) => {
  currentPage.value = page;
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  currentPageGames.value = gameData.value.slice(startIndex, endIndex);
  console.log('currentPageGames:', currentPageGames.value); // 输出截取的游戏数据到控制台
};

const handleCurrentPageChange = (page: number) => {
  currentPage.value = page;
  handlePageChange(page);
};

const handlePageSizeChange = (size: number) => {
  pageSize.value = size;
  handlePageChange(currentPage.value);
};

async function LoadGameData() {
	try {
    const response = await gameinit() as any
		console.log(response.data);
		if (response.status) {
			gameData.value = response.data;
			handlePageChange(currentPage.value);
			sessionStorage.setItem('gameData', JSON.stringify(response.data)); // 存储游戏数据到会话存储
      gameTypes.value=Array.from(new Set(gameData.value.map((game: Game) => game.category)));
		} else {
			console.log('请求游戏数据失败');
      
		}
	} catch (error) {
		console.log('初始化游戏请求失败: ' + error);
	}
}

onMounted(() => {
	const storedGameData = sessionStorage.getItem('gameData');
	if (storedGameData) {
		gameData.value = JSON.parse(storedGameData);
    gameTypes.value=Array.from(new Set(gameData.value.map((game: Game) => game.category)));
		handlePageChange(currentPage.value);
    // ElMessage({
    //     showClose: true,
    //     message: '初始化游戏数据！',
    //     type: 'success',
    //     center: true,
    //   }) 
    ElNotification({
      type: 'success',
      message: '初始化游戏数据！',
      offset: 50,
      duration: 2000,
      showClose: true,
    })
	} else {
		LoadGameData();
	}
});

</script>


<style scoped>

</style>