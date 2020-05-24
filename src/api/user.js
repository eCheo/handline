import request from '@/utils/request'
import getter from '@/store/getters'
export function login(data) {
  console.log('发送请求')
  return request({
    url: '/api/front/member/login.json',
    headers: {
      Authorization: 'Basic TW9iaWxlOkFuZHJvaWQtSU9T',
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/front/member/loginOut.json',
    headers: {
      Authorization: getter.userInfo.tokenType + ' ' + getter.userInfo.token,
      'Content-Type': 'application/json'
    },
    method: 'post'
  })
}
