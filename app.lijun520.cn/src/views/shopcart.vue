<template>

  <VanSpace direction="vertical" fill v-if="cartItems.length > 0">
    <van-swipe-cell v-for="(item, index) in cartItems" :key="index">
      <van-row>
        <van-col span="4" class="checkbox-center">
          <van-checkbox :name="item.id" v-model="item.selected" />
        </van-col>
        <van-col span="20">
          <van-card :num="item.quantity" :price="item.unit_price" :tag="item.name" :title="item.name"
            :thumb=getImgUrl(item.id)>

            <template #footer>
              <van-stepper v-model="item.quantity" theme="round" button-size="20" disable-input @change="updateQuantity(item)"/>
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button square icon="delete" type="danger" class="delete-button" @click="deleteItem(item.id)" />
      </template>
    </van-swipe-cell>
  </VanSpace>

  <van-empty v-else description="购物车为空"></van-empty>

  <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="selectAll">全选</van-checkbox>
  </van-submit-bar>

</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia';
import { showSuccessToast, showFailToast } from 'vant';
import{removeFromCart,updateCart,checkoutCart}from '@/api/shopcart'
import { useCartStore } from '@/store/cartStore'
const { getCartListData, clearCart } = useCartStore()
const { cartItems } = storeToRefs(useCartStore())
import { useRouter } from 'vue-router'
const router = useRouter();

interface CartItem {
  id: number;
  name: string;
  unit_price: number;
  quantity: number;
  subtotal: number;
  selected: boolean;
}

const updateQuantity =async (item:CartItem) => {
  const {success,message}= await updateCart(item.id,item.quantity) as any
  if(success){
    showSuccessToast({message:item.name+message+": "+item.quantity})
  }
  
};

const getImgUrl = (id: number) => {
  const storedGameData = sessionStorage.getItem('gameData');
  if (storedGameData) {
    const gameData = JSON.parse(storedGameData);
    const game = gameData.find((game: { id: number; }) => game.id === id);
    if (game) {
      return game.image_url;
    } else {
      return 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'; // 否则显示默认图片地址
    }
  }

}
const deleteItem = async (id: number) => {
  try {
    const selectedGameIds = [id];
    const response = await removeFromCart(selectedGameIds) as any;
    if (response.status) {
      showSuccessToast(response.message)
      getCartListData()
      // usercart.cartItems.splice(id, 1);
    }
  } catch (error) {
    console.error('删除购物车商品失败:', error);
    showFailToast(error as string);
  }
}

const selectAll = computed({
  get: () => {
    return cartItems.value.length > 0 && cartItems.value.every(item => item.selected);
  },
  set: (value) => {
    cartItems.value.forEach(item => item.selected = value);
  }
});

const selectedItems = computed(() => {
  return cartItems.value.filter(item => item.selected);
});

const totalPrice = computed(() => {
  return selectedItems.value.reduce((total, item) => total + item.unit_price * item.quantity*100, 0);
});

const onSubmit = async() => {
  const {success,message}=await checkoutCart(selectedItems.value.map(item => item.id)) as any
  if(success){
    showSuccessToast({message})
    getCartListData()
  }else{
    showFailToast({message})
  }

};

// 在组件加载时获取购物车数据
onMounted(() => {
  getCartListData()
})

</script>
<style scoped>
.van-submit-bar {
  bottom: 50px;
}

.checkbox-center{
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-button{
  height: 100%;
}

</style>