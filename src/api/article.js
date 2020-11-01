import request from '@/utils/request'

// 请求每个频道下的对应的信息
export const getarticle = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}