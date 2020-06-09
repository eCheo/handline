import request from '@/utils/request'
import getter from '@/store/getters'
export function login(data) {
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
      Authorization: getter.userInfo.tokenType + ' ' + getter.userInfo.accessToken,
      'Content-Type': 'application/json'
    },
    method: 'post'
  })
}
