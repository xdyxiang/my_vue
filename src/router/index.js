import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/index'
import store from '../store'
import Layout from '../views/layout/Layout'

Vue.use(Router)


const r =  new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            meta: { title: 'Home', icon: 'user' },
        },
        {
            path: '/login',
            name: 'login',
            hidden: true,
            component: Login
        },
        {
            path: '/dashboard',
            component: Layout,
            name: 'dashboard',
            redirect: '/dashboard/index',
            children: [{
                path: 'index',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index'),
                meta: { title: 'Dashboard', icon: 'example' }
            }]
        },
        {
            path: '/form',
            component: Layout,
            children: [
                {
                    path: 'index',
                    name: 'Form',
                    component: () => import('@/views/form/index'),
                    meta: { title: 'Form', icon: 'form' }
                }
            ]
        },
        {
            path: '/pet',
            component: Layout,
            children: [
                {
                    path: 'index',
                    name: 'Pet',
                    component: () => import('@/views/pet/index'),
                    meta: { title: 'Pet', icon: 'eye' }
                }
            ]
        }
    ]
})


// 路由跳转
r.beforeEach((to, from, next) => {
    // debugger
    if (to.meta.required) {
        // 检查localStorage
        if (localStorage.token) {
            store.commit('set_token', localStorage.token)
            next()
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next()
    }
})
//跳转结束后
r.afterEach((to, from, next) => {

})

export default r
