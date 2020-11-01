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
        url: `/app/v1_0/user`

    })
}


// 获取文章列表频道

export const getchannels = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels`

    })
}