import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
        companyList: []
    },
    mutations: {
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
        },
        setCompanyList (state, companyList) {
            state.companyList = companyList
        },
        pushCompany (state, company) {
            state.companyList.push(company)
        }
    }
})
