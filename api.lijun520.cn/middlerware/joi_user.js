const joi = require('joi');

// 账号的验证
const account = joi.string().alphanum().min(4).max(10).required().messages({
  'string.base': '账号必须是字符串',
  'string.alphanum': '账号只能包含字母和数字',
  'string.min': '账号长度不能少于{#limit}个字符',
  'string.max': '账号长度不能超过{#limit}个字符',
  'string.empty': '账号不能为空',
  'any.required': '账号是必填字段'
});

// 密码的验证
const password = joi.string().pattern(/^[a-z0-9]{1,50}$/).min(6).max(12).required().messages({
  'string.base': '密码必须是字符串',
  'string.pattern.base': '密码格式不正确',
  'string.min': '密码长度不能少于{#limit}个字符',
  'string.max': '密码长度不能超过{#limit}个字符',
  'string.empty': '密码不能为空',
  'any.required': '密码是必填字段'
});

// 二次密码验证
const confirmPassword = joi.string().valid(joi.ref('password')).required().messages({
  'string.base': '确认密码必须是字符串',
  'string.valid': '确认密码必须与密码相同',
  'string.empty': '确认密码不能为空',
  'any.required': '确认密码是必填字段'
});

// 邮箱验证
const emailaddress = joi.string().email().required().messages({
  'string.base': '邮箱地址必须是字符串',
  'string.email': '邮箱地址必须是有效的邮箱地址',
  'string.empty': '邮箱地址不能为空',
  'any.required': '邮箱地址是必填字段'
});

const verificationCode = joi.string().length(6).pattern(/^\d+$/).required().messages({
  'string.base': '验证码必须是字符串',
  'string.length': '验证码长度必须为{#limit}位',
  'string.pattern.base': '验证码必须为数字',
  'string.empty': '验证码不能为空',
  'any.required': '验证码是必填字段'
});

exports.login_limit = {
  body: {
    account,
    password
  }
};

exports.register_limit = {
  body: {
    account,
    password,
    confirmPassword,
    emailaddress,
    verificationCode
  }
};

exports.sendEmailCode_limit = {
  body: {
    account,
    emailaddress
  }
}

exports.resetPassword_limit = {
  body: {
    account,
    password,
    emailaddress,
    verificationCode
  }
 }

const nickname = joi.string().required().messages({
  'any.required': '昵称不能为空',
  'string.base': '昵称必须是字符串',
  'string.empty': '昵称不能为空'
});

const sex = joi.number().valid(0, 1).required().messages({
  'any.required': '性别不能为空',
  'any.only': '性别必须是0或1'
});

const mobile = joi.string().pattern(/^[0-9]{11}$/).required().messages({
  'any.required': '手机号不能为空',
  'string.pattern.base': '手机号格式不正确'
});

const email = joi.string().email().required().messages({
  'any.required': '邮箱不能为空',
  'string.email': '邮箱必须是有效的邮箱地址'
});

const address = joi.string().required().messages({
  'any.required': '地址不能为空',
  'string.base': '地址必须是字符串',
  'string.empty': '地址不能为空'
});

exports.updateinfo_limit = {
  body: {
    nickname,
    sex,
    mobile,
    email,
    address
  }
};