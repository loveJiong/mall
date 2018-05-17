import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
let cart = localStorage.cart ? JSON.parse(localStorage.cart) : {}
let upLoadOrders = localStorage.upLoadOrders ? JSON.parse(localStorage.upLoadOrders) : {}

function setCompany (company) {
    company.price = 0
    company.isActive = false
}

function getGoodCart (good) {
    return {
        goodNO: good.no,
        id: good.id,
        name: good.name,
        price: good.price,
        url: good.url,
        zk: good.zk ? good.zk : 0,
        num: good.num,
        origin: 0,
        totalPrice: 0,
        count: good.count,
        bagCount: good.bagCount,
        boxCount: good.boxCount
    }
}

function pad2 (n) {
    return n < 10 ? '0' + n : n
}

function generateBh () {
    const date = new Date()
    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds())
}

export default new Vuex.Store({
    state: {
        userInfo,
        companyList: [],
        activeCompany: {},
        categoryList: [],
        activeCategory: {
            secondaryList: [] // 防止切换企业报错
        },
        cart,
        upLoadOrders,
        groupDetailBackPath: '',
        activeOrder: '',
        plusready: false
    },
    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
            localStorage.userInfo = JSON.stringify(state.userInfo)
        },
        setCompanyList (state, companyList) {
            companyList.forEach(company => setCompany(company))
            state.companyList = companyList
            if (companyList.length > 0) {
                state.activeCompany = state.companyList[0]
                state.activeCompany.isActive = true
            }
        },
        setActiveCompany (state, company) {
            if (state.activeCompany) {
                state.activeCompany.isActive = false
            }
            state.activeCompany = company
            state.activeCompany.isActive = true
            state.activeCategory = {
                secondaryList: [] // 防止切换企业报错
            }
        },
        setCategoryList (state, categoryList) {
            state.categoryList = []
            categoryList.forEach(category => {
                if (category.level === 0) {
                    category.secondaryList = []
                    state.categoryList.push(category)
                } else {
                    state.categoryList[state.categoryList.length - 1].secondaryList.push(category)
                }
            })
        },
        setActiveCategory (state, category) {
            if (state.activeCategory) {
                state.activeCategory.isActive = false
            }
            state.activeCategory = category
            state.activeCategory.isActive = true
        },
        logout (state) {
            state.userInfo = null
            state.companyList = []
            state.activeCompany = {}
            state.activeCategory = {}
            state.categoryList = []
            localStorage.userInfo = ''
        },
        addToCart (state, data) {
            let companyId = data.company.companyId
            let good = data.good
            let num = good.num
            if (!state.cart[companyId]) state.cart[companyId] = {}
            if (!state.cart[companyId][good.id]) state.cart[companyId][good.id] = getGoodCart(good)
            let stateGood = state.cart[companyId][good.id]
            stateGood.num = num
            stateGood.origin = stateGood.num * stateGood.price
            stateGood.totalPrice = (stateGood.origin * (100 - stateGood.zk) / 100).toFixed(2)
            localStorage.cart = JSON.stringify(state.cart)
        },
        removeToCart (state, data) {
            let companyId = data.company.companyId
            let good = data.good
            let num = good.num
            let stateGood = state.cart[companyId][good.id]
            stateGood.num = num
            stateGood.origin = stateGood.num * stateGood.price
            stateGood.totalPrice = (stateGood.origin * (100 - stateGood.zk) / 100).toFixed(2)
            // if (state.cart[companyId][good.id].num === 0) delete state.cart[companyId][good.id]
            localStorage.cart = JSON.stringify(state.cart)
        },
        deleteGood (state, data) {
            let companyId = data.company.companyId
            let good = data.good
            delete state.cart[companyId][good.id]
            localStorage.cart = JSON.stringify(state.cart)
        },
        clearCart (state, companyId) {
            delete state.cart[companyId]
            localStorage.cart = JSON.stringify(state.cart)
        },
        pushOrder (state, data) {
            let companyId = data.company.companyId
            let order = data.order
            order.bh = generateBh()
            order.bz = data.bz
            if (!state.upLoadOrders[companyId]) state.upLoadOrders[companyId] = []
            state.upLoadOrders[companyId].push(order)
            console.log(state.upLoadOrders)
            localStorage.upLoadOrders = JSON.stringify(state.upLoadOrders)
        },
        deleteOrder (state, data) {
            let companyId = data.company.companyId
            let order = data.order
            let index = state.upLoadOrders[companyId].indexOf(order)
            state.upLoadOrders[companyId].splice(index, 1)
            localStorage.upLoadOrders = JSON.stringify(state.upLoadOrders)
        },
        addToOrder (state, data) {
            let companyId = data.company.companyId
            let good = data.good
            let order = data.unOrder
            let num = good.num
            let index = state.upLoadOrders[companyId].indexOf(order)
            if (!state.upLoadOrders[companyId][index][good.id]) state.upLoadOrders[companyId][index][good.id] = getGoodCart(good)
            let stateGood = state.upLoadOrders[companyId][index][good.id]
            stateGood.num = num
            stateGood.origin = stateGood.num * stateGood.price
            stateGood.totalPrice = (stateGood.origin * (100 - stateGood.zk) / 100).toFixed(2)
            localStorage.upLoadOrders = JSON.stringify(state.upLoadOrders)
        },
        removeToOrder (state, data) {
            let companyId = data.company.companyId
            let good = data.good
            let order = data.unOrder
            let num = good.num
            let index = state.upLoadOrders[companyId].indexOf(order)
            let stateGood = state.upLoadOrders[companyId][index][good.id]
            stateGood.num = num
            stateGood.origin = stateGood.num * stateGood.price
            stateGood.totalPrice = (stateGood.origin * (100 - stateGood.zk) / 100).toFixed(2)
            // if (state.cart[companyId][good.id].num === 0) delete state.cart[companyId][good.id]
            localStorage.upLoadOrders = JSON.stringify(state.upLoadOrders)
        },
        deleteGoodToOrder (state, data) {
            let companyId = data.company.companyId
            let good = data.good
            let order = data.unOrder
            let index = state.upLoadOrders[companyId].indexOf(order)
            delete state.upLoadOrders[companyId][index][good.id]
            localStorage.upLoadOrders = JSON.stringify(state.upLoadOrders)
        },
        changeAddToOrder (state, order) {
            state.activeOrder = order
        },
        setGroupDetailBackPath (state, path) {
            state.groupDetailBackPath = path
        },
        plusready(state) {
            state.plusready = true
        }
    }
})
