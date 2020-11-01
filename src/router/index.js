import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login')
    }, {
        path: '/',

        component: () =>
            import ('@/views/layout'),
        children: [{
                path: '', //子路由可以不写，但是只能一个默认
                name: 'home',
                component: () =>
                    import ('@/views/home'),
            },
            {
                path: '/qa',
                name: 'qa',
                component: () =>
                    import ('@/views/qa'),
            },
            {
                path: '/vidio',
                name: 'vidio',
                component: () =>
                    import ('@/views/vidio'),
            },
            {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('@/views/my'),
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router