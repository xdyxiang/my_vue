import axios from 'axios'
import store from '../store'
import router from '../router'

axios.defaults.headers.common['Authorization'] = "";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://127.0.0.1:5000'


// 添加请求拦截器
axios.interceptors.request.use(
    function (request) {
        // 在发送请求之前做些什么
        console.log('请求拦截器!!')
        //request.data = JSON.stringify(config.data);
        request.headers['Content-Type'] = 'application/json;charset=UTF-8';
        request.headers['Access-Control-Allow-Origin-Type'] = '*';
        //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
        // if (cookie.get("token")) {
        //     // //用户每次操作，都将cookie设置成2小时
        //     // cookie.set("token",cookie.get("token") ,1/12)
        //添加Authorization
        if(localStorage.token)
        {
            request.headers['Authorization'] = localStorage.token;
        }
        return request;},
    function (error) {
    // 对请求错误做些什么
        console.log('发生了写错误！')
        return Promise.reject(error);}
);


// axios拦截器，401状态时跳转登录页并清除token
axios.interceptors.response.use((response) => {
    console.log('发送结束！响应拦截状态是：'+ response.status)
    return response;
}, (error) => {
    console.log("发送结束！响应拦截器发生错误！")
    if (error.message  ==="Network Error") {
        router.push('/login')
    }
    if (error.response) {
        switch (error.response.status) {
        case 401:
            store.commit('del_token')
            router.push('/login')
        }
    }
    return Promise.reject(error)
})

export default axios
