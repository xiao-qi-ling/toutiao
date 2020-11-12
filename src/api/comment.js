import request from '@/utils/request'
// 获取文章评论
export const getcomment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
