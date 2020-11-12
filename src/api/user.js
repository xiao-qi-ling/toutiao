/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 验证码
export const sendsms = moblie => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${moblie}`

  })
}

// 获取用户数据
export const getuserinfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'

  })
}

// 获取文章列表频道

export const getchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'

  })
}

// 关注用户的请求
export const addfollow = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }

  })
}

// 取消关注用户
export const deletefollow = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`

  })
}

// 获取用户个人资料
export const getuserprofile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'

  })
}

// 更新昵称
export const updatenikename = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data

  })
}

// 更新头像
export const updateuserphoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data

  })
}
