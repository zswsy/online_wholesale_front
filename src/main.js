import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/normalize.css'
import router from './router/router.js'
import VueRouter from 'vue-router';
import store from './store/store.js'
import './Mock/Mock.js'

// 引入全局配置
import config from '@/utils/config.js'



Vue.use(ElementUI)
Vue.use(VueRouter)

router.beforeEach((to,from,next)=>{
    const token=localStorage.getItem(config.userToken)
    if(!token && to.name !=='login'){
        //token不存在,跳转用户登录界面
        next({name:'login'})
    }else if(token && to.name =='login'){
        //token存在依然跳转登录页
        next({name:'home'})
    }else{
        //正常访问
        next()
    }
})

new Vue({
    router,
    store,
    render: h=>h(App),
    created(){
        this.$store.dispatch('getMenuData')
        this.$store.commit('dynamicAddRouter',this.$router)
    }
}).$mount('#app')

