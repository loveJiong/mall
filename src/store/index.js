import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null
console.log(JSON.parse(localStorage.companyList))
let companyList = localStorage.companyList ? JSON.parse(localStorage.companyList) : []

export default new Vuex.Store({
    state: {
        userInfo,
        companyList,
        activeCompany: null,
        categoryList: [],
        activeCategory: null
    },
    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
            localStorage.userInfo = JSON.stringify(state.userInfo)
        },
        setCompanyList (state, companyList) {
            state.companyList = companyList
            localStorage.companyList = JSON.stringify(state.companyList)
        },
        setActiveCompany (state, company) {
            if (state.activeCompany) {
                state.activeCompany.isActive = false
            }
            state.activeCompany = company
            state.activeCompany.isActive = true
        },
        pushCompany (state, company) {
            state.companyList.push(company)
            localStorage.userInfo = JSON.stringify(state.companyList)
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
