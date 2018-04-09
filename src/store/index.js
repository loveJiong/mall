import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
let cart = localStorage.cart ? JSON.parse(localStorage.cart) : {}

function setCompany (company) {
    company.price = 0
    company.isActive = false
}

function getGoodCart (good, categoryGUID) {
    console.log(good)
    return {
        categoryGUID,
        goodNO: good.id,
        id: good.id,
        name: good.name,
        price: good.price,
        url: good.url,
        zk: good.zk ? good.zk : 0,
        num: good.num,
        origin: 0,
        totalPrice: 0,
        count: good.count
    }
}

export default new Vuex.Store({
    state: {
        userInfo,
        companyList: [],
        activeCompany: {},
        categoryList: [],
        activeCategory: {},
        cart,
        productRoute: 'productPictures'
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
            if (!state.cart[companyId][good.id]) state.cart[companyId][good.id] = getGoodCart(good, data.categoryGUID)
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
            if (state.cart[companyId][good.id].num === 0) delete state.cart[companyId][good.id]
            localStorage.cart = JSON.stringify(state.cart)
        },
        clearCart (state, companyId) {
            delete state.cart[companyId]
            localStorage.cart = JSON.stringify(state.cart)
        },
        setProductRoute (state, route) {
            state.productRoute = route
        }
    }
})
