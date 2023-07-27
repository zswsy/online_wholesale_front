import http from '../utils/axios.js'
import config from '@/utils/config.js'

//登录接口
export const login = (param)=>{
    console.log(param)
    return http.post('/login',param, {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
    }

//----------------------------------主页接口start---------------------------------------------------

//获取通知公告的接口
export const getNotice = ()=>{
    return http.get('/api/notice')
}

//获取折线图数据的接口
export const getLine = ()=>{
    return http.post('/api/lineData')   
}
//获取柱状图数据的接口
export const getCategory = ()=>{
    return http.post('/api/categoryData')
}
//获取饼图数据的接口
export const getPie = ()=>{
    return http.post('/api/pieData')
}

//----------------------------------主页接口end---------------------------------------------------

//----------------------------------用户接口start---------------------------------------------------
//获取用户列表的接口
export const getUsers = ()=>{
    return http.post('/api/users/getAllUser')
}

//删除用户的接口
export const deleteUser = (params)=>{
    return http.post('/api/users/delete',params)
}

//修改用户接口
export const editUser = (params) => {
    return http.post('/api/users/edit/feedback',params) 
}

//添加用户的接口
export const addUser = (params) => {
    return http.post('/api/users/addUser',params)
}

//----------------------------------用户接口end---------------------------------------------------


//----------------------------------商品接口start---------------------------------------------------

//获取商品列表
export const getProduct = ()=>{
    return http.get('/api/products/getAllProducts')
}

//删除商品的接口
export const deleteProduct = ()=>{
    return http.post('/api/products/delete')
}

//编辑商品
export const editproduct = (params)=>{
    return http.post('/api/products/edit/feedback',params)
}

//添加商品
export const addProduct = (params)=>{
    return http.post('/api/products/add',params)
}


//----------------------------------商品接口end---------------------------------------------------