import Vue from 'vue'


import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 改成中文加载方式
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
    // vue的过滤器  第一个参数是国米器的名称  第二个是过滤的处理函数  value是前面处理传进来的那个值 一定记得return 不然没有值
Vue.filter('Timeprocessing', value => {
    return dayjs().to(dayjs(value))
})