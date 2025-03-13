import axios from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 可以在这里添加token等信息
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.error(error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        const res = response.data;
        if (res.code !== 20000) {
            // 这里可以根据实际情况处理错误
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        // 对响应错误做点什么
        console.error('err' + error); // for debug
        return Promise.reject(error);
    }
);

export default service;