import axios from "axios";

const baseURL = "http://60.30.64.249:7080/rd_2nd";

// 使用由库提供的配置的默认值来创建实例
const instance = axios.create({
    baseURL,
    timeout : 10000, //超时时间
    headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
});

//http request 拦截器
axios.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      return Promise.reject(err);
    }
);

// 响应拦截器
axios.interceptors.response.use(    
    response => {  
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },
    // 服务器状态码不是200的情况    
    error => {     
        if (error.response.status) {            
            return Promise.reject(error.response);        
        }       
    }
);

export const Http = async (api,param)=>{
    let p = 'params=' + JSON.stringify(param)
    return new Promise((resolve,reject)=>{
        instance.post(api,p)
            .then(res=>{
                resolve(res.data)
            })
            .catch(err=>{
                reject(err)
            })
    })
}