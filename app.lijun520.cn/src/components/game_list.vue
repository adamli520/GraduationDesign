<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" success-text="刷新成功" :disabled="disabled">
    <!-- <van-skeleton :loading="props.loading" v-for="(_, index) in 5" :key="index">
      <template #template>
        <div :style="{ display: 'flex', width: '100%', marginBottom: '16px' }">
          <van-skeleton-image />
          <div :style="{ flex: 1, marginLeft: '16px' }">
            <van-skeleton-paragraph row-width="60%" />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
          </div>
        </div>
      </template> -->
    <van-list :immediate-check=false>
      <van-card v-for="game in props.filteredGames" class="custom-card" :key="game.id" :tag="game.category"
        :price="game.sale_price" :title="game.name" :origin-price="game.original_price"
        @click-thumb="btn_detail(game.id)" :thumb="game.image_url">
        <template #tags>
          <van-tag plain type="primary">{{ game.publisher }}</van-tag>
          <van-tag plain type="primary">{{ game.developer }}</van-tag>
        </template>
        <template #footer>
          <van-button type="primary" size="small" @click="btn_addToCart(game.id)">购买</van-button>
        </template>
      </van-card>
    </van-list>
    <!-- </van-skeleton> -->
  </van-pull-refresh>

  <van-back-top right="10vw" bottom="12vh" />

  <van-popup v-model:show="showgameDetailModal" title="标题" round class="showgameDetailModal" teleport="#app"
    position="bottom">

    <p>游戏名称: {{ gameDetails.name }}</p>
    <van-divider :style="{ borderColor: '#1989fa' }" />
    <p>开发商: {{ gameDetails.developer }}</p>
    <p>发行商: {{ gameDetails.publisher }}</p>
    <van-divider :style="{ borderColor: '#1989fa' }" />
    <p>{{ gameDetails.description }}</p>
    <p>{{ gameDetails.reviews }}</p>
  </van-popup>

</template>

<script setup lang="ts">
import { ref, } from 'vue';
import { showSuccessToast, showFailToast, showConfirmDialog, showLoadingToast } from 'vant';
import { storeToRefs } from 'pinia';
import { addToCart } from '@/api/shopcart'
import { gamedetail } from '@/api/api_game'
import { useUserInfo } from '@/store/userinfor'
import { useCartStore } from '@/store/cartStore';
import router from '@/router';
const { userInfo } = storeToRefs(useUserInfo())
const { getCartListData } = useCartStore()


const props = defineProps({
  filteredGames: {
    type: Array as () => Game[],
    required: true,
    default: []
  },
  loading: {
    type: Boolean,
    default: true

  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const loading = ref(props.loading)

const emit = defineEmits(['onRefresh'])
// 数据刷新事件
const onRefresh = () => {
  

  emit('onRefresh')
  showLoadingToast({
    message: '刷新成功',
    duration: 1000,
    forbidClick: true,
    loadingType: 'spinner',
  });

  loading.value = false
};

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
const gameDetails = ref({
  id: 0,
  name: '',
  developer: '',
  publisher: '',
  description: '',
  reviews: ''
});
const showgameDetailModal = ref(false);
const btn_detail = async (id: number) => {
  const { success, data } = await gamedetail(id) as any
  if (success) {
    // 打开详情模态框
    showLoadingToast({ message: data.name + ": 查询详情成功", loadingType: 'spinner', })
    showgameDetailModal.value = true;
    gameDetails.value = data;

  }

}


const btn_addToCart = async (id: number) => {
  if (!userInfo.value.isLogin) {
    showConfirmDialog({
      title: '未登录',
      theme: 'round-button',
      message:
        '当前没有登录，是否前往登录？',
    })
      .then(() => {
        router.replace('/login')
      })
      .catch(() => {
        // on cancel
      });
    return
  }

  const res = await addToCart(id, 1) as any
  const { success, message } = res
  if (success) {
    showSuccessToast(message)
    getCartListData()
  } else {
    showFailToast(message)
  }
};
</script>

<style scoped>
.showgameDetailModal {
  padding: 16px 16px;
  /* position: absolute; */
  max-height: 50%;
}

.custom-card {
  --van-card-thumb-size: 100px;
}
</style>