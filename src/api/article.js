import request from '@/utils/request'

// 请求每个频道下的对应的信息
export const getarticle = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取文章详情

export const getarticleDetails = articleid => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleid}`

  })
}

// 点击收藏文章
export const addcollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deletecollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`

  })
}

// 点赞文章
export const addlikearticle = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞文章
export const deletelikearticle = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`

  })
}

// 点赞评论
export const addlikecomment = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消喜欢评论
export const deletelikecomment = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`

  })
}

// 发表评论
export const addcomment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
