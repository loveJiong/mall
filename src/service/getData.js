import axios from 'axios'

let baseUrl = ''
const headers = {
    'Content-Type': 'application/json'
}
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = ''
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
        let result = {
            data: res.data,
            success: true
        }
        return result
    } catch (error) {
        return {
            success: false
        }
    }
}

export const getComanyList = () => http('/api/mineCompanyList', 'GET', headers)
