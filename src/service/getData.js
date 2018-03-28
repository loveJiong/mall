import axios from 'axios'

let baseUrl = ''
const successCode = '00'
const headers = {
    'Content-Type': 'application/json'
}
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = 'http://jesusl.cn:8080/dadi'
        break
    case 'production':
        baseUrl = ''
        break
    default:
        baseUrl = ''
        break
}

async function http (url, method = 'GET', headers, data = {}) {
    method = method.toUpperCase()
    url = baseUrl + url
    let reqConfig = {
        method,
        url,
        headers
    }
    if (method === 'GET') {
        reqConfig.params = data
    } else {
        reqConfig.data = data
    }
    try {
        const res = await axios(reqConfig)
        let result
        if (res.status === successCode) {
            result = {
                data: res.data,
                success: true
            }
        } else {
            result = {
                code: res.messageCode,
                msg: res.message,
                success: false
            }
        }
        return result
    } catch (error) {
        return {
            code: '999',
            msg: '服务器繁忙！',
            success: false
        }
    }
}

export const getComanyList = (customerId) => http('/companyinfo/compnayList', 'GET', headers, {customerId})

export const accountLogin = (loginInfo) => http('/customer/login', 'GET', headers, loginInfo)
