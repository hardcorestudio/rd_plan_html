import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "http://49.4.54.46:8080/", // api的base_url
  timeout: 50000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sentconfig.headers['Content-Type'] = 'application/json';
  config.headers['Content-Type'] = 'application/json'
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
    return response
  },
  error => {
    let code = error.response.status
    if (code === 401 || code === 403) {
      // 登出
      // store.dispatch('FedLogOut').then(() => {
      //   router.push({path: '/login'})
      // })
      // console.warn('登出')
      alert(code)
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
