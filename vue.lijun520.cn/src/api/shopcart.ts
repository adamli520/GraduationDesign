import instance from '@/api/index';

// 添加商品到购物车
export const addToCart = (game_id: number, quantity: number) => {
  return instance({
    url: '/shopCart/addToCart',
    method: 'POST',
    data: {
      game_id,
      quantity
    }
  });
};

// 从购物车中删除商品
export const removeFromCart = (game_ids: number[]) => {
  return instance({
    url: '/shopCart/delete',
    method: 'POST',
    data: {
      game_ids
    }
  });
};

// 结算购物车
export const checkoutCart = (game_ids: number[]) => {
  return instance({
    url: '/shopCart/checkout',
    method: 'POST',
    data: {
      game_ids
    }
  });
};

// 获取购物车列表
export const getCartList = () => {
  return instance({
     url: '/shopCart/getCart',
     method: 'GET',
     
  })
};

// 更新购物车商品数量
export const updateCart = (game_id: number, quantity: number) => {
  return instance({
    url: '/shopCart/update',
    method: 'PUT',
    data: {
      game_id,
      quantity
    }
  });
};