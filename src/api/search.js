/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// 搜索建议提示
export const getsuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果
export const getsearchresult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

// 获取用户搜索历史
export const getsearchhistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'

  })
}
