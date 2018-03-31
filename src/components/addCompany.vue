<template>
  <div class="addCompany">
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
                编号
                <input v-model="companyCode" type="text">
            </div>
            <div class="company-input">
                口令
                <input v-model="customerCode" type="text">
            </div>
        </div>
        <div @click="addCompany" class="company-add">
            添加
        </div>
    </div>
  </div>
</template>

<script>
import {bindCustomer} from './../service/getData'
export default {
    name: 'addCompany',
    data () {
        return {
            addCompanyImg: require('../../static/img/addCompany.png'),
            customerCode: '',
            companyCode: ''
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
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background:#efeff4')
    },
    beforeDestroy () {
        document.querySelector('body').setAttribute('style', '')
    },
    methods: {
        async addCompany () {
            if (this.companyCode && this.customerCode) {
                let bindRes = await bindCustomer(this.userInfo.id, this.companyCode, this.customerCode)
                console.log(bindRes)
                if (bindRes.success) {
                    this.$message.success('恭喜您，添加成功！')
                } else {
                    this.$message.error(bindRes.msg)
                }
            } else {
                this.$message.error('编号或口令不能为空。')
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.addCompany {
    .addCompany-title {
        position: relative;
        text-align: center;
        border-bottom: 1px solid $borcd;
        color: $fc;
        background-color: $white;
        @include font(16px, 50px);
        a {
            position: absolute;
            left: 20px;
            top: 19px;
        }
  }
  .container {
    .phone-img {
        margin: 5px 0;
        text-align: center;
        img {
            @include wh(100px, 200px);
        }
    }
    .company-info {
        display: flex;
        flex-direction: column;
        .company-input {
            @include sc(18px, #aaaaaa);
            background-color: $white;
            margin-bottom: 2px;
            padding: 10px 15px;
            input {
                font-size: 18px;
                margin-left: 5px;
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
  }
}
</style>
