import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('@/views/login')
}, {
  path: '/',

  component: () =>
    import('@/views/layout'),
  children: [{
    path: '', // 子路由可以不写，但是只能一个默认
    name: 'home',
    component: () =>
      import('@/views/home')
  },
  {
    path: '/qa',
    name: 'qa',
    component: () =>
      import('@/views/qa')
  },
  {
    path: '/vidio',
    name: 'vidio',
    component: () =>
      import('@/views/vidio')
  },
  {
    path: '/my',
    name: 'my',
    component: () =>
      import('@/views/my')
  }
  ]
},
{
  path: '/search',
  name: 'search',
  component: () =>
    import('@/views/search')
},
{
  // 因为文章的id不一样所以一定的配置:articleId  这样才能访问
  path: '/article/:articleId',
  name: 'article',
  component: () =>
    import('@/views/article'),
  // 必须写props进行解耦  才能通过路由传递参数
  props: true

},
{
  // 因为文章的id不一样所以一定的配置:articleId  这样才能访问
  path: '/user/profile',
  name: 'user-profile',
  component: () =>
    import('@/views/user-profile')

}

]

const router = new VueRouter({
  routes
})

export default router
