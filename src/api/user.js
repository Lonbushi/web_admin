import request from '@/utils/request'

export function login(data) {
  // 使用 URLSearchParams 构建请求体
  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('password', data.password)

  // 发送请求
  return request({
    url: '/user/login',
    method: 'post',
    data: params, // 修改后的请求体
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' } // 设置请求头
  })
}

export function getInfo(token) {
  return request({
    url: '/user/me',
    method: 'get',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export function updateInfo(token, id, update){
  return request({
    url: `/user/me/${id}`,
    method:'put',
    headers:{'Authorization': `Bearer ${token}`},
    data: update
  })
}

export function getUserAll(token) {
  return request({
    url: '/user/all',
    method: 'get',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}
