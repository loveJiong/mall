<template>
    <div class="login" v-if="!haveCache">
        <div class="loing-bg">
        </div>
        <div class="login-form">
            <img src="../../static/img/login-icon.png" alt="图标">
            <el-form ref="loginForm" :model="loginForm">
                <el-form-item>
                    <el-input v-model="loginForm.customerName" placeholder="账户"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                </el-form-item>
                <span class="error-text">{{errorText}}</span>
                <el-form-item>
                    <el-button round type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import {accountLogin, getCompanyList} from './../service/getData'
export default {
    name: 'login',
    data () {
        return {
            loginForm: {
                customerName: '',
                password: ''
            },
            errorText: '',
            haveCache: true
        }
    },
    computed: {
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    mounted () {
        if (this.userInfo) {
            this.getCompanyList(this.userInfo.id)
        } else {
            this.haveCache = false
        }
    },
    methods: {
        async login () {
            let loginRes = await accountLogin(this.loginForm)
            if (loginRes.success) {
                this.$store.commit('setUserInfo', loginRes.data)
                let customerId = loginRes.data.id
                this.getCompanyList(customerId)
            } else {
                this.$message.error(loginRes.msg)
            }
        },
        async getCompanyList (customerId) {
            let companyListRes = await getCompanyList(customerId)
            if (companyListRes.success) {
                this.$store.commit('setCompanyList', companyListRes.data)
                console.log(companyListRes.data)
                this.$router.push('/home')
            } else {
                this.$message.error(companyListRes.msg)
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.login {
    height: 100%;
    .loing-bg {
        height: 100%;
        background: url('/static/img/login-bg.jpg') center 0px no-repeat;
        filter: blur(5px);
    }
    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: absolute;
        top: 100px;
        z-index: 1;
        text-align: center;
        img {
            width: 150px;
            height: 150px;
            margin-bottom: 50px;
        }
        .el-button {
            padding: 12px 60px;
        }
    }
}
</style>
