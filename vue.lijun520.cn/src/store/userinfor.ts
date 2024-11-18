import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getUserInfo } from '@/api/userinfor'


interface UserData {
  id: number;
  account: string;
  token: string;
  nickname: string;
  sex: string;
  mobile: string;
  email: string;
  address: string;
  balance: number;
  birthday: string | null;
  created_at: string | null;
  updated_at: string | null;
  del: number;
}

interface UserResponse {
  isLogin: boolean;
  message: string;
  data: UserData;
}

export const useUserInfo = defineStore('userinfo', () => {
  const userInfo = reactive<UserResponse>({
    isLogin: false,
    message: '',
    data: {
      id: 0,
      account: '',
      token: '',
      nickname: '',
      sex: '0',
      mobile: '',
      email: '',
      address: '',
      balance: 0,
      birthday: null,
      created_at: null,
      updated_at: null,
      del: 0
    }
  })

  const fetchUserInfo = async () => {
    const response = await getUserInfo() as unknown as UserResponse
    userInfo.isLogin = response.isLogin
    userInfo.message = response.message
    userInfo.data = response.data
  }

  const clearUserInfo = () => {
    userInfo.isLogin = false
    userInfo.data = {
      id: 0,
      account: '',
      token: '',
      nickname: '',
      sex: '0',
      mobile: '',
      email: '',
      address: '',
      balance: 0,
      birthday: null,
      created_at: null,
      updated_at: null,
      del: 0
    }
  }

  return {
    userInfo,
    fetchUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})
