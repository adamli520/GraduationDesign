import instance from '@/api/index'


// 注册
export const register = (data:any) => {
	const {
		account,
		password,
		confirmPassword,
		emailaddress,
		verificationCode
	} = data
	return instance({
		url: '/api/user/register',
		method: 'POST',
		data: {
			account,
			password,
			confirmPassword,
			emailaddress,
			verificationCode
		}
	})
}
// 获取邮箱验证码
export const getemailcode=(data:any) => {
	const {
		account,
		emailaddress
	} = data
	return instance({
		url: '/api/user/getemailcode',
		method: 'POST',
		data: {
			account,
			emailaddress
		}
	})
}


// 登录
export const userlogin = (data:any) => {
	const {
		account,
		password
	} = data
	return instance({
		url: '/api/user/login',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}

// 用户提交反馈
export const feedback = (data:any) => {
	const {
		email,
		content,
	} = data
	return instance({
		url: '/api/user/feedback',
		method: 'POST',
		data: {
			email,
			content,
		}
	})
}

// 重置密码验证
export const resetPassword = (data:any) => {
	const {
		account,
		password,
		emailaddress,
		verificationCode
	} = data
	return instance({
		url: '/api/user/resetPassword',
		method: 'POST',
		data: {
			account,
			password,
			emailaddress,
			verificationCode
		}
	})
}


