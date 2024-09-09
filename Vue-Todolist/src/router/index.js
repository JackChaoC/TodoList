import { createRouter, createWebHashHistory } from "vue-router";
import Main from '../views/main/main.vue'
import Login from '../views/Login/Login.vue'

const routes = [
    {
        path: '/',
        redirect: {
            name:'home'
        }
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/main/Home/Home.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
