<template>
  <div class="addCompany" v-loading="loading">
    <div class="addCompany-title">
        <router-link to="/home" class="el-icon-arrow-left"></router-link>
        添加商家
    </div>
    <div class="container">
        <div class="phone-img">
            <img v-bind:src="addCompanyImg" alt="icon">
        </div>
        <div class="company-info">
            <div class="company-input">
                <input placeholder="编号" v-model="companyCode" type="text">
            </div>
            <div class="company-input">
                <input  placeholder="口令" v-model="customerCode" type="text">
            </div>
            <el-button class="add-btn" round type="primary" @click="addCompany">添加</el-button>
            <el-button class="return-btn" round @click="goBack">返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import {bindCustomer, getCompanyList} from './../service/getData'
export default {
    name: 'addCompany',
    data () {
        return {
            addCompanyImg: require('../../static/img/addCompany.png'),
            customerCode: '',
            companyCode: '',
            loading: false
        }
    },
    computed: {
        companyList () {
            return this.$store.state.companyList
        },
        userInfo () {
            return this.$store.state.userInfo
        }
    },
    methods: {
        async addCompany () {
            this.loading = true
            if (this.companyCode && this.customerCode) {
                let bindRes = await bindCustomer(this.userInfo.id, this.companyCode, this.customerCode)
                console.log(bindRes)
                if (bindRes.success) {
                    let companyListRes = await getCompanyList(this.userInfo.id)
                    if (companyListRes.success) {
                        this.$store.commit('setCompanyList', companyListRes.data)
                        this.$message.success('恭喜您，添加成功！')
                    } else {
                        this.$message.error('添加失败，请稍后重试。')
                    }
                } else {
                    this.$message.error(bindRes.msg)
                }
            } else {
                this.$message.error('编号或口令不能为空。')
            }
            this.loading = false
        },
        goBack () {
            this.$router.push('/home')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.addCompany {
    height: 100%;
    .addCompany-title {
        position: relative;
        text-align: center;
        border-bottom: 1px solid $borcd;
        color: $headfc;
        background-color: $white;
        @include font(16px, 50px);
        a {
            position: absolute;
            left: 20px;
            top: 19px;
        }
  }
  .container {
    height: 100%;
    .phone-img {
        margin: 40px 0;
        text-align: center;
        img {
            @include wh(160px, 133px);
        }
    }
    .company-info {
        display: flex;
        flex-direction: column;
        padding: 0px 40px;
        .company-input {
            @include sc(18px, #aaaaaa);
            background-color: $white;
            padding: 10px 15px;
            margin-bottom: 15px;
            border: 1px solid #e6e6e6;
            input {
                font-size: 18px;
            }
        }
    }
    .company-add {
        text-align: center;
        padding: 10px 0;
        margin-top: 10px;
        @include sc(18px, #ed706b);
        background-color: $white;
    }
    .el-button {
        margin-top: 10px;
        margin-left: 0px;
    }
    .add-btn {
        @include dbb();
    }
  }
}
</style>
