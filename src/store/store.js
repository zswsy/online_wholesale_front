import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Menu from './menu.js'
import Bread from './bread.js'
import User from './user.js'

const store = new Vuex.Store({
    namespace:true,
    modules:{
        Menu,
        Bread,
        User,
    }
})

export default store