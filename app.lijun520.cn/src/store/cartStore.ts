import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCartList } from '../api/shopcart'

interface CartItem {
    id: number;
    name: string;
    unit_price: number;
    quantity: number;
    subtotal: number;
    selected: boolean;
  }

  export const useCartStore = defineStore("shopcartItems",()=>{
    const cartItems = ref<CartItem[]>([])

    const getCartListData = async () => {
          try {
          const res = await getCartList() as any;
          const formattedData = res.data.map((item: { id:number; name: string; unit_price: number; quantity: number }) => ({
            id:item.id,
            name: item.name,
            unit_price: item.unit_price,
            quantity: item.quantity,
            subtotal: item.unit_price * item.quantity,
            selected: false,
          }));
      
          cartItems.value = formattedData;
        } catch (error) {
          console.error('Error getting cart list:', error);
        }
      }

      const clearCart = () => {
        cartItems.value = [];
      }

      return {cartItems,clearCart,getCartListData}
  },{
    persist: true,
  })
  

 
