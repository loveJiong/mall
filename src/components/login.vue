<template>
    <div class="login">
        <div class="loing-bg">
        </div>
        <div class="login-form">
            <img src="../../static/img/login-icon.jpg" alt="图标">
            <el-form ref="loginForm" :model="loginForm">
                <el-form-item>
                    <el-input v-model="loginForm.name" placeholder="账户"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            loginForm: {
                name: '',
                password: ''
            }
        }
    },
    components: {
    },
    methods: {
        onSubmit () {
            this.$router.push('/home')
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
        background: url('../../static/img/login-bg.jpg') center 0px no-repeat;
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
