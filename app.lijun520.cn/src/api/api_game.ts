import instance from '@/api/index';


export const gameinit = () => {
   return instance({
      url: '/api/game/init',
      method: 'GET',
   })
};

// 游戏查询详情
export const gamedetail = (id: number) => {
   return instance({
      url: `/api/game/detail?id=${id}`,
      method: 'GET',
   })
};
