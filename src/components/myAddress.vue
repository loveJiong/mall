<template>
    <div class="myAddress" v-loading="loading">
        <div class="myAddress-title">
            <router-link to="/mine" class="el-icon-arrow-left"></router-link>
            我的收货地址
            <el-button  @click="submit" round type="primary">保存</el-button>
        </div>
        <form class="form">
            <p class="form-item">
                <span>公司名称</span>
                <input type="text" v-model="form.companyName" placeholder="点击这里输入公司名称">
            </p>
            <p class="form-item">
                <span>联系人</span>
                <input type="text" v-model="form.linkMan" placeholder="点击这里输入联系人">
            </p>
            <p class="form-item">
                <span>税号</span>
                <input type="text" v-model="form.companySh" placeholder="点击这里输入税号">
            </p>
            <p class="form-item">
                <span>地址</span>
                <input type="text" v-model="form.companyAddress" placeholder="点击这里输入地址">
            </p>
            <p class="form-item">
                <span>城市</span>
                <input type="text" v-model="form.city" placeholder="点击这里输入城市">
            </p>
            <p class="form-item">
                <span>省份</span>
                <input type="text" v-model="form.province" placeholder="点击这里输入省份">
            </p>
            <p class="form-item">
                <span>国家</span>
                <input type="text" v-model="form.country" placeholder="点击这里输入国家">
            </p>
            <p class="form-item">
                <span>邮政编码</span>
                <input type="text" v-model="form.postalCode" placeholder="点击这里输入邮政编码">
            </p>
            <p class="form-item">
                <span>联系电话</span>
                <input type="text" v-model="form.linkTelephone" placeholder="点击这里输入联系电话">
            </p>
            <p class="form-item">
                <span>电子邮箱</span>
                <input type="text" v-model="form.linkEmail" placeholder="点击这里输入电子邮箱">
            </p>
        </form>
    </div>
</template>

<script>
import {getAddress, newAddress, updateAddress} from './../service/getData'
export default {
  name: 'myAddress',
  data () {
    return {
        isAdd: false,
        form: {
        },
        loading: false
    }
  },
  computed: {
    userInfo () {
        return this.$store.state.userInfo
    }
  },
  mounted () {
      this.init()
  },
  methods: {
        async init () {
            this.loading = true
            let addressRes = await getAddress(this.userInfo.id)
            if (addressRes.success && addressRes.data.length > 0) {
                this.form = addressRes.data[0]
            } else if (addressRes.success && addressRes.data.length === 0) {
                this.isAdd = true
            }
            this.loading = false
        },
        async submit () {
            this.loading = true
            if (this.isAdd) {
                let data = Object.assign({}, this.form, {customerId: this.userInfo.id})
                let newAddressRes = await newAddress(data)
                if (newAddressRes.success) {
                    this.$message.success('恭喜您，新增地址成功！')
                } else {
                    this.$message.error('新增地址失败，请稍后重试。')
                }
            } else {
                let data = Object.assign({}, this.form, {customerId: this.userInfo.id})
                let updateAddressRes = await updateAddress(data)
                if (updateAddressRes.success) {
                    this.$message.success('恭喜您，更新地址成功！')
                } else {
                    this.$message.error('更新地址失败，请稍后重试。')
                }
            }
            this.loading = false
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.myAddress-title {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 100;
    text-align: center;
    border-bottom: 1px solid $borcd;
    background-color: $white;
    color: #333333;
    @include font(16px, 50px);
    a, i {
        position: absolute;
        top: 19px;
        color: #333333;
    }
    .el-icon-arrow-left {
        left: 20px;
    }
    button {
        width: 70px;
        position: absolute;
        right: 20px;
        top: 14px;
        padding: 5px;
        @include sc(12px, $white);
        @include dbb();
    }
}
.form {
    padding-top: 51px;
    background-color: $white;
}
.form-item {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #c8c7cc;
    margin-left: 20px;
    span {
        width: 64px;
    }
    input {
        margin-left: 20px;
        font-size: 16px;
        width: calc(100% - 64px - 20px - 20px);
    }
}
</style>
