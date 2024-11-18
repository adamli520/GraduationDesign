<template>
  <van-notice-bar left-icon="volume-o" text="下拉刷新！！" scrollable/>
  <van-pull-refresh  v-model="loading" @refresh="onRefresh"  success-text="刷新成功" animation-duration="600">
  <div class="order">
    <div v-if="ordersData.length" class="order-box">
      <div v-for="(order, index) in ordersData" :key="index">
        <div class="order-list">
          <div class="top">
            <p>{{ order.game_name }}</p>
          </div>
          <div class="center">
            <div class="left">
              <img :src="getImgUrl(order.game_name)">
            </div>
            <div class="middle">
              <p>{{ order.game_name }}</p>
              <p>{{ order.order_date }}</p>
              <p>数量：{{ order.quantity }}</p>
            </div>
          </div>
          <div class="bottom">
            <p>单价：￥{{ order.unit_price }}</p>
            <p>总价：￥{{ order.total_amount }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-order">
      <p>暂无订单</p>
    </div>
  </div>

</van-pull-refresh>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import{getUserOrder}from '@/api/userinfor'
import { showSuccessToast } from 'vant';
const loading = ref(false);
const ordersData = ref([
  {
  order_id: '',
  order_date: '',
  order_status: '',
  game_name: '',
  unit_price: 0,
  total_amount: 0,
  quantity: 0
}
]);

const onRefresh = async() => {
  const { success, data } = await getUserOrder() as any
  if (success) {
    loading.value = false;
    showSuccessToast({ message:"成功获取订单信息" })
    ordersData.value = data
  }
}
onMounted(async() => {
  onRefresh()
})

const getImgUrl = (name: string) => {
  const storedGameData = sessionStorage.getItem('gameData');
  if (storedGameData) {
    const gameData = JSON.parse(storedGameData);
    const game = gameData.find((game: { name: string; }) => game.name === name);
    if (game) {
      return game.image_url;
    } else {
      return 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'; 
    }
  }
  
}
</script>


<style lang="scss" scoped>
.order{
    .order-box{
        margin-top: 10px;
    }
    .order-list{
        background-color: #fff;
        padding: 10px;
        border-radius: 10px;
        margin: 10px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        .top{
            background-color: #fff;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-bottom: 15px;
            border-bottom: 1px solid #cec6c6;
        }
        .center{
            height: 20vh;
            background-color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #cec6c6;
            .left{
                position: relative;
                flex: none;
                width: 120px;
                height: 120px;
                img{
                    width: 100%;
                    height: 80%;
                    border-radius: 10px;
                }
            }
            .middle{
                height: 15vh;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: flex-start;
            }
            .right{
                width: 75px;
                height: 15vh;
                display: flex;
                justify-content: center;
                align-items: center;
            
            }
        }
        .bottom{
            display: flex;  
            justify-content: space-between; // 关键属性，使得子元素分布在两端  
            align-items: center; // 保持子元素垂直居中  
        }
    }
   
}
 
</style>
