// import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/login.vue'
import Main from '../views/layout/Main.vue'
import Home from '../components/container/home.vue'


const routes=[
    {
        path:'/',
        component:Main,
        name:'Main',
        redirect:'/home',
        children:[
            {
                path:'/home',
                component:Home
            },
            // {
            //     path:'/order',
            //     component:Order
            // },
            // {
            //     path:'/user/userList',
            //     component:UserList,
            // },
            // {
            //     path:'/user/addUser',
            //     component:AddUser,
            // },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login,
        
    },
]

const router = new VueRouter({
    routes
})

// Vue.use(router)

export default router