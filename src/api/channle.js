/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// 请求所偶有的频道数据
export const getAllchannles = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels',

    })
}

// 
export const addchannles = channels => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels
        }
    })
}



export const deletechannles = channelsId => {
    // console.log(channelsId);
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelsId}`,

    })
}