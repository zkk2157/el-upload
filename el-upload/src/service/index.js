//把我们的axios配置好
//1，拦截器
//2，代理
//3，baseUr1
//4，授权的头部字段

const DEV_URL = 'http://192.168.0.198:3000'
// const PRODUCTION_URL = 'http://www.baidu.com'

import axios from "axios"

const http = axios.create({
    baseURL:DEV_URL
    //基础的URL
})

//添加请求拦截器
//为所有的请求带上身份认证信息
http.interceptors.request.use(function(config){
    // 在发送请求之前做些什么
    // config.headers['token']='token';
    //一定要返回config
    // console.log(config)
    const token = sessionStorage.getItem('token')
    config.headers['token'] = token;
    return config;
},function(error){
    //对请求错误做些什么
    return Promise.reject(error);
})

// 示例的传参
// http.post(`/pet/${pathParams}`,
//     { body: '这里放body' },
//     { params: { username: '这里放查询参数' }, headers: { name: '这里放headers' } }
// );

export default http;