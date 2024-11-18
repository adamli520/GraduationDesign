import instance from '@/api/index';

export const Get_articlelist = (type:string) => {
   return instance({
      url: `/api/article/?type=${type}`,
      method: 'GET',
   })

}


export const Get_articledetail = (id: number) => {
   return instance({
      url: `/api/article/${id}`,
      method: 'GET',
   })

}