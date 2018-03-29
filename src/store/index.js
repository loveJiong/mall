import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
        companyList: [],
        activeCompany: null,
        categoryList: [],
        activeCategory: null
    },
    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
        },
        setCompanyList (state, companyList) {
            state.companyList = companyList
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
