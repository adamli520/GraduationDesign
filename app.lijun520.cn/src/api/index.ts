// api/index.ts

import axios from 'axios'
import { showFailToast } from 'vant';
import { useUserInfo } from '@/store/userinfor'
import { useCartStore} from '@/store/cartStore'

import router from '@/router';

const instance = axios.create({
	// 后端url地址
  // 本地 http://localhost:3000
  // 上线 https://api.lijun520.cn
	// baseURL: import.meta.env.VITE_API_BASEURL,
  baseURL: 'http://localhost:3000',
	timeout: 6000, //设置超时
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json'
	}
});

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token
  // console.log(config)
    if (sessionStorage.getItem("token")) {
      // console.log(sessionStorage.getItem("token"))
      config.headers.Authorization = sessionStorage.getItem("token");
    }
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(response) {
  if(response.data.status||response.data.message){
    if(response.data.status==0){
      // if(response.data.message){
      //  showFailToast({
      //    message: response.data.message,
      //    type: 'success',
      //  })
      // }
    }else{
      // showFailToast.error(response.data.message)
    }
  }
	// 对响应数据做点什么
	return response.data
}, function(error) {
  if (error && error.response){
    const { clearUserInfo } = useUserInfo()
    const { clearCart } = useCartStore()

    switch (error.response.status){
      case 400:
        showFailToast('请求错误')
        break
      case 401:
        showFailToast('未授权，请登录')
        clearUserInfo()
        clearCart()
        router.push('/login')
        break
      case 403:
        showFailToast('拒绝访问')
        break
      case 404:
        showFailToast(`请求地址出错: ${error.response.config.url}`)
        break
      case 408:
        showFailToast('请求超时')
        break
      case 500:
        showFailToast('服务器内部错误')
        break
      case 501:
        showFailToast('服务未实现')
        break
      case 502:
        showFailToast('网关错误')
        break
      case 503:
        showFailToast('服务不可用')
        break
      case 504:
        showFailToast('网关超时')
        break
      case 505:
        showFailToast('HTTP版本不受支持')
        break
      default:
    }
  }
	// 对响应错误做点什么
	return Promise.reject(error);
});

export default instance
