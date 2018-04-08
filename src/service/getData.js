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
        baseUrl = 'http://old.dadisoft.cn/dadi'
        break
    default:
        baseUrl = 'http://jesusl.cn:8080/dadi'
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
        const resObj = res.data
        console.log(res)
        let result
        if (resObj.status === successCode) {
            result = {
                data: resObj.data,
                offset: resObj.offset,
                success: true
            }
        } else {
            result = {
                code: resObj.messageCode,
                msg: resObj.message,
                success: false
            }
        }
        return result
    } catch (error) {
        return {
            code: '999',
            msg: '服务器繁忙，请稍后重试。',
            success: false
        }
    }
}

export const getComanyList = (customerId) => http('/companyinfo/compnayList', 'GET', headers, {customerId})

export const accountLogin = (loginInfo) => http('/customer/login', 'GET', headers, loginInfo)

export const getCategoryList = (companyId) => http('/goods/category', 'GET', headers, {companyId})

export const getGoods = (companyId, categoryId, offset = 0) => http('/goods/list', 'GET', headers, {companyId, categoryId, offset})

export const bindCustomer = (customerId, companyCode, customerCode) => http('/companyinfo/bindCustomer', 'GET', headers, {customerId, companyCode, customerCode})

export const getAddress = (customerId) => http('/customer/address/list', 'GET', headers, {customerId})

export const newAddress = (data) => http('/customer/address/add', 'POST', headers, data)

export const updateAddress = (data) => http('/customer/address/update', 'POST', headers, data)

export const commitOrder = (data) => http('/order/commit', 'POST', headers, data)

export const getOrder = (customerId, companyId, status) => http('/order/all', 'GET', headers, {customerId, companyId, status})
