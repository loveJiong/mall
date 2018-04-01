import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null

function setCompany (company) {
    company.cart = {}
    company.price = 0
    company.isActive = false
}

export default new Vuex.Store({
    state: {
        userInfo,
        companyList: [],
        activeCompany: {},
        categoryList: [],
        activeCategory: {}
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
        }
    }
})
