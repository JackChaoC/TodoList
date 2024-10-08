/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'

const http = {
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url, params) {
        if (typeof url === 'object') {
            url.method = 'GET'
            console.log('url:',url);

            return request(url)
        }
        const config = {
            method: 'get',
            url: url
        }
        if (params) config.params = params
        return request(config)
    },
    post(url, params) {
        if (typeof url === Object) {
            return request(url)
        }
        const config = {
            method: 'post',
            url: url
        }
        if (params) config.data = params

        return request(config)
    }
}

//导出
export default http