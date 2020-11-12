/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径

  transformResponse: [
    function (data) {
      try {
        return jsonBig.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config的作用就是要返回放行 必须return

  // 可以在这里添加统一的token
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config);
  return config
}, function (error) {
  // Do something with request error
  // 自己内部请求错误会走这里  请求还没有发出去
  return Promise.reject(error)
})

// 响应拦截器

export default request
