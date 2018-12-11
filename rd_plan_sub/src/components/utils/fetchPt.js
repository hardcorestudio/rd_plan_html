import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: "http://192.168.1.101:9091", // api的base_url
  baseURL: "http://localhost:9091",
  timeout: 50000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sentconfig.headers['Content-Type'] = 'application/json';
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // 8080
  // config.headers['Authorization'] = 'Bearer' + localStorage.getItem('access_token')
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
