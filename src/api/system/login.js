import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取图片验证码
export function imageCodeGet() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
// 获取手机验证码
export function phoneCodeGet() {
  return request({
    url: '/',
    method: 'get',
    params
  })
}
export function phoneCodeForgetGet() {
  return request({
    url: '/',
    method: 'get',
    params
  })
}
// 获取邮箱验证码
export function emailCodeGet() {
  return request({
    url: '/',
    method: 'get',
    params
  })
}
export function emailCodeForgetGet() {
  return request({
    url: '/',
    method: 'get',
    params
  })
}
// 改变密码
export function passwordChange() {
  return request({
    url: '/',
    method: 'get',
    params
  })
}

export function userForgetVerify() {
  return request({
    url: '/',
    method: 'get',
    params
  })
}
