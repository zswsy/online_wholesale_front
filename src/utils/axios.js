import axios from 'axios'
import globaConfig from '@/utils/config.js'

const http = axios.create({
    //  通用请求的前缀
    baseURL: 'http://696h60k925.zicp.fun:26514',
    timeout: 6000, // 请求超时时间,
    headers: {
        'Content-Type':'application/x-www-form-urlencoded'
    }
    
})

//请求拦截器
http.interceptors.request.use(function (config) {
    //在发送请求之前做什么
    //如果请求以api开头的地址，需要在请求头中添加token
    // console.log(config)
    if(config.url.match(/\/api/)){
        const token=JSON.parse(localStorage.getItem(globaConfig.userToken))
            config.headers = {
                'Authorization' : token, //携带权限参数
                'Content-Type':'application/x-www-form-urlencoded'
               }
        }
    return config;
},function (err) {
    //对请求错误做些什么
    return Promise.reject(err)
});

//添加响应拦截器
http.interceptors.response.use(function (response) {
    //对响应数据做些什么
    return response;
},function (err) {
    //对响应错误做一些处理
    return Promise.reject(err);
});


export default http


