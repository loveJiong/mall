<template>
    <div class="login" v-if="!haveCache" v-loading="loading">
        <!-- <div class="loing-bg">
        </div> -->
        <div class="login-form">
            <img src="../../static/img/login-icon.png" alt="图标">
            <el-form ref="loginForm" :model="loginForm">
                <el-form-item>
                    <el-input v-model="loginForm.customerName" placeholder="用户名"></el-input>
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
import {accountLogin, getCompanyList, getAndroidApp, getIosApp} from './../service/getData'
export default {
    name: 'login',
    data () {
        return {
            loginForm: {
                customerName: '',
                password: ''
            },
            errorText: '',
            haveCache: true,
            loading: false
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
        // if (this.$store.state.plusready) {
        //     this.checkUpdateAndroid()
        //     // this.checkUpdateIos()
        // } else {
        //     this.$store.commit('plusready')
        //     document.addEventListener('plusready', this.checkUpdateAndroid, false)
        //     // document.addEventListener('plusready', this.checkUpdateIos, false)
        // }
    },
    methods: {
        async login () {
            this.loading = true
            let loginRes = await accountLogin(this.loginForm)
            if (loginRes.success) {
                this.$store.commit('setUserInfo', loginRes.data)
                let customerId = loginRes.data.id
                this.getCompanyList(customerId)
            } else {
                this.$message.error(loginRes.msg)
            }
            this.loading = false
        },
        async getCompanyList (customerId) {
            this.loading = true
            let companyListRes = await getCompanyList(customerId)
            if (companyListRes.success) {
                this.$store.commit('setCompanyList', companyListRes.data)
                this.$router.push('/home')
            } else if (companyListRes.code === '0001') {
                this.$router.push('/home')
            } else {
                this.$message.error(companyListRes.msg)
            }
            this.loading = false
        },
		async checkUpdateAndroid () {
            // eslint-disable-next-line no-undef
            let ver = plus.runtime.version
            let updateRes = await getAndroidApp(ver)
            if (updateRes.success && updateRes.url) {
                this.$confirm('检测到新版本，是否升级？', '升级确认', {
                    confirmButtonText: '确认升级',
                    cancelButtonText: '下次再说',
                    type: 'warning'
                }).then(() => {
                    if (this.userInfo) {
                        this.getCompanyList(this.userInfo.id)
                    } else {
                        this.haveCache = false
                    }
                    // eslint-disable-next-line no-undef
                    let waiting = plus.nativeUI.showWaiting('开始下载')
                    // eslint-disable-next-line no-undef
                    let dtask = plus.downloader.createDownload(updateRes.url, {}, (d, status) => {
                        if (status === 200) {
                            alert('下载成功')
                            let path = d.filename
                            // eslint-disable-next-line no-undef
                            plus.runtime.install(path)
                        } else {
                            alert('下载失败')
                        }
                    })
                    dtask.start()
                    dtask.addEventListener('statechanged', (task, status) => {
                        switch (task.state) {
                            case 1:
                                waiting.setTitle('开始下载')
                                break
                            case 2:
                                waiting.setTitle('开始下载')
                                break
                            case 3:
                                let percent = task.downloadedSize / task.totalSize * 100
                                waiting.setTitle(`已下载${parseInt(percent)}%`)
                                break
                            case 4:
                                waiting.close()
                                break
                            default:
                                break
                        }
                    })
                }, () => {
                    console.log('cancel')
                    if (this.userInfo) {
                        this.getCompanyList(this.userInfo.id)
                    } else {
                        this.haveCache = false
                    }
                })
            } else {
                if (this.userInfo) {
                    this.getCompanyList(this.userInfo.id)
                } else {
                    this.haveCache = false
                }
            }
        },
        async checkUpdateIos () {
            // eslint-disable-next-line no-undef
            let ver = plus.runtime.version
            let updateRes = await getIosApp(ver)
            if (updateRes.success && updateRes.url) {
                this.$confirm('检测到新版本，是否升级？', '升级确认', {
                    confirmButtonText: '确认升级',
                    cancelButtonText: '下次再说',
                    type: 'warning'
                }).then(() => {
                    // eslint-disable-next-line no-undef
                    plus.runtime.openURL(encodeURI(updateRes.url))
                    if (this.userInfo) {
                        this.getCompanyList(this.userInfo.id)
                    } else {
                        this.haveCache = false
                    }
                }, () => {
                    console.log('cancel')
                    if (this.userInfo) {
                        this.getCompanyList(this.userInfo.id)
                    } else {
                        this.haveCache = false
                    }
                })
            } else {
                if (this.userInfo) {
                    this.getCompanyList(this.userInfo.id)
                } else {
                    this.haveCache = false
                }
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
    // .loing-bg {
    //     height: 100%;
    //     background: url('/static/img/login-bg.jpg') center 0px no-repeat;
    //     filter: blur(5px);
    // }
    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        position: absolute;
        top: 60px;
        z-index: 1;
        text-align: center;
        img {
            width: 150px;
            height: 150px;
            margin-bottom: 80px;
            background-color: #fff;
            border-radius: 30px;
        }
        .el-button {
            margin-top: 15px;
            width: 100%;
            padding: 12px 60px;
            @include dbb();
        }
    }
    .el-form-item {
        width: 200px;
    }
}
</style>
